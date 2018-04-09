import Module from './module';

export default class Storage extends Module {
  constructor(mediatorElem) {
    super(mediatorElem);
    this.groups = [];
    this.users = [];
    this.activeGroupId = null;
  }

  init() {
    const socket = new WebSocket('ws://ums-honeybadger.herokuapp.com/ums');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.trigger(data.action, data);
    };
    socket.onerror = (event) => {
      console.log(event);
    };
    this.listenEvent('storage:fetchUser:update', Storage.fetchUserUpdate);
    this.listenEvent('storage:fetchUser:new', Storage.fetchUserNew);
    this.listenEvent('group:updated', this.updateGroup.bind(this));
    this.listenEvent('group:removed', this.removeGroup.bind(this));
    this.listenEvent('storage:activeGroupSelect', (groupId) => {
      this.activeGroupId = groupId;
      this.triggerRenderGroups();
      this.trigger('usersView:render', this.activeGroupMembers());
    });
    this.listenEvent('user:updated', this.updateUser.bind(this));
    this.listenEvent('user:removed', this.removeUser.bind(this));
    this.listenEvent('storage:user:edit', this.handleEditUser.bind(this));
    this.listenEvent('storage:user:new', () => { this.trigger('newUserModal:data', { groups: this.groups }); });
  }

  activeGroupMembers() {
    return this.users.filter(user => user.group_id === this.activeGroupId);
  }

  static fetchUserUpdate(user) {
    const body = JSON.stringify(user);
    const method = 'PUT';
    fetch(`https://ums-honeybadger.herokuapp.com/user/${user.user_id}`, { body, method })
      .then((response) => {
        if (response.status !== 200) {
          M.toast({ html: `Error: ${response.statusText} (${response.status})`, classes: 'red' });
        }
        if (response.status === 200) {
          M.toast({ html: 'Success', classes: 'green' });
        }
      });
  }

  static fetchUserNew(user) {
    const body = JSON.stringify(user);
    const method = 'POST';
    fetch('https://ums-honeybadger.herokuapp.com/user', { body, method })
      .then((response) => {
        if (response.status !== 201) {
          M.toast({ html: `Error: ${response.statusText} (${response.status})`, classes: 'red' });
        }
        if (response.status === 201) {
          M.toast({ html: 'Success', classes: 'green' });
        }
      });
  }

  handleEditUser(userId) {
    const user = this.users.find(usr => usr.user_id === Number(userId));
    this.trigger('editUserModal:data', {
      groups: this.groups,
      user,
    });
  }

  triggerRenderGroups() {
    this.trigger('groupsView:render', {
      groups: this.groups,
      users: this.users,
      activeGroupId: this.activeGroupId,
    });
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
        this.groups.sort((g1, g2) => g1.name.localeCompare(g2.name));
        this.triggerRenderGroups();
      });
  }

  removeGroup({ id }) {
    this.groups.forEach((group, index) => {
      if (group.group_id === id) {
        this.groups.splice(index, 1);
      }
    });
    if (this.activeGroupId === id) {
      this.activeGroupId = null;
      this.trigger('usersView:render', this.activeGroupMembers());
    }
    this.triggerRenderGroups();
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
        this.users.sort((u1, u2) => u1.name.localeCompare(u2.name));
        this.trigger('groupsView:renderMembersAmount', this.users);
        this.trigger('usersView:removeUser', user.user_id);
        if (user.group_id === this.activeGroupId) {
          this.trigger('usersView:pasteUser', { user, users: this.activeGroupMembers() });
        }
      });
  }

  removeUser({ id }) {
    this.users.forEach((user, index) => {
      if (user.user_id === id) {
        this.users.splice(index, 1);
      }
    });
    this.trigger('usersView:removeUser', id);
    this.trigger('groupsView:renderMembersAmount', this.users);
  }
}
