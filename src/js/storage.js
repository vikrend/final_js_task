import Module from './module';

export default class Storage extends Module {
  constructor(mediatorElem) {
    super(mediatorElem);
    this.groups = [];
    this.users = [];
    this.activeGroupId = 0;
  }

  init() {
    const socket = new WebSocket('ws://ums-honeybadger.herokuapp.com/ums');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.trigger(data.action, data);
    };
    this.listenEvent('fetch:user:update', this.fetchUserUpdate.bind(this));
    this.listenEvent('fetch:user:new', this.fetchUserNew.bind(this));
    this.listenEvent('group:updated', this.updateGroup.bind(this));
    this.listenEvent('group:removed', this.removeGroup.bind(this));
    this.listenEvent('groups:select', (groupId) => {
      this.activeGroupId = groupId;
      this.triggerRenderGroups();
      this.trigger('users:render', this.activeGroupMembers());
    });
    this.listenEvent('user:updated', this.updateUser.bind(this));
    this.listenEvent('user:removed', this.removeUser.bind(this));
    this.listenEvent('storage:user:edit', this.handleEditUser.bind(this));
    this.listenEvent('storage:user:new', () => { this.trigger('user:new', { groups: this.groups }); });
  }

  activeGroupMembers() {
    return this.users.filter(user => user.group_id === this.activeGroupId);
  }

  fetchUserUpdate(user) {
    const body = JSON.stringify(user);
    const method = 'PUT';
    fetch(`https://ums-honeybadger.herokuapp.com/user/${user.user_id}`, { body, method });
  }

  fetchUserNew(user) {
    const body = JSON.stringify(user);
    const method = 'POST';
    fetch(`https://ums-honeybadger.herokuapp.com/user`, { body, method });
  }

  updateGroup({ id }) {
    const fetchUrl = `https://ums-honeybadger.herokuapp.com/group/${id}`;
    fetch(fetchUrl, { method: 'GET' })
      .then(response => response.json())
      .then((group) => {
        const groupIndex = this.groups.findIndex(arrGroup => arrGroup.group_id === group.group_id);
        if (groupIndex === -1) {
          this.groups.push(group);
        } else {
          this.groups[groupIndex] = group;
        }
        this.groups.sort((g1, g2) => g1.name >= g2.name);
        this.triggerRenderGroups();
      });
  }

  handleEditUser(userId) {
    const user = this.users.find(usr => usr.user_id === Number(userId));
    this.trigger('user:edit', {
      groups: this.groups,
      user,
    });
  }

  triggerRenderGroups() {
    this.trigger('groups:render', {
      groups: this.groups,
      users: this.users,
      activeGroupId: this.activeGroupId,
    });
  }

  removeGroup({ id }) {
    this.groups.forEach((group, index) => {
      if (group.group_id === id) {
        this.groups.splice(index, 1);
      }
    });
    this.triggerRenderGroups();
    this.trigger('modal:renderGroupsSelect', { groups: this.groups });
  }

  updateUser({ id }) {
    fetch(`https://ums-honeybadger.herokuapp.com/user/${id}`, { method: 'GET' })
      .then(response => response.json())
      .then((user) => {
        const userIndex = this.users.findIndex(arrUser => arrUser.user_id === user.user_id);
        if (userIndex === -1) {
          this.users.push(user);
        } else {
          this.users[userIndex] = user;
        }
        this.users.sort((u1, u2) => u1.name >= u2.name);
        this.triggerRenderGroups();
        this.trigger('users:render', this.activeGroupMembers());
      });
  }

  removeUser({ id }) {
    this.users.forEach((user, index) => {
      if (user.user_id === id) {
        this.users.splice(index, 1);
      }
    });
    this.triggerRenderGroups();
    this.trigger('users:render', this.activeGroupMembers());
  }
}
