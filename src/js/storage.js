import Module from './module';

export default class Storage extends Module {
  constructor(mediatorElem) {
    super(mediatorElem);
    this.groups = [];
    this.users = [];
    this.activeGroupId = null;
  }

  init() {
    this.listenEvent('group:updated', this.updateGroup.bind(this));
    this.listenEvent('group:removed', this.removeGroup.bind(this));
    this.listenEvent('groups:select', (groupId) => {
      this.activeGroupId = groupId;
      this.trigger('groups:render', {
        groups: this.groups,
        users: this.users,
        activeGroupId: this.activeGroupId,
      });
      this.trigger('users:render', { users: this.users, groupId });
    });
    this.listenEvent('user:updated', this.updateUser.bind(this));
    this.listenEvent('user:removed', this.removeUser.bind(this));
    this.listenEvent('modal:open', () => {});
  }

  updateGroup({ id }) {
    const fetchUrl = `https://ums-honeybadger.herokuapp.com/group/${id}`;
    fetch(fetchUrl, { method: 'GET' })
      .then(response => response.json())
      .then((data) => {
        this.groups.push(data);
        this.groups.sort((g1, g2) => g1.name >= g2.name);
        this.trigger('groups:render', {
          groups: this.groups,
          users: this.users,
          activeGroupId: this.activeGroupId,
        });
      });
  }

  removeGroup({ id }) {
    this.groups.forEach((group, index) => {
      if (group.group_id === id) {
        this.groups.splice(index, 1);
      }
    });
    this.trigger('groups:render', {
      groups: this.groups,
      users: this.users,
      activeGroupId: this.activeGroupId,
    });
  }

  updateUser({ id }) {
    fetch(`https://ums-honeybadger.herokuapp.com/user/${id}`, { method: 'GET' })
      .then(response => response.json())
      .then((data) => {
        this.users.push(data);
        this.trigger('groups:render', {
          groups: this.groups,
          users: this.users,
          activeGroupId: this.activeGroupId,
        });
        this.trigger('users:render', { users: this.users, groupId: this.activeGroupId });
      });
  }

  removeUser({ id }) {
    this.users.forEach((user, index) => {
      if (user.user_id === id) {
        this.users.splice(index, 1);
      }
    });
    this.trigger('groups:render', {
      groups: this.groups,
      users: this.users,
      activeGroupId: this.activeGroupId,
    });
    this.trigger('users:render', { users: this.users, groupId: this.activeGroupId });
  }
}
