import Module from './module';

export default class Storage extends Module {
  constructor(mediatorElem) {
    super(mediatorElem);
    this.groups = [];
    this.users = [];
    this.activeGroupId = null;
  }

  init() {
    this.listenEvent('storage:group:update', this.updateGroup.bind(this));
    this.listenEvent('storage:group:remove', this.removeGroup.bind(this));
    this.listenEvent('storage:activeGroupSelect', (groupId) => {
      this.activeGroupId = groupId;
      this.triggerRenderGroups();
      const users = this.activeGroupMembers();
      Storage.sortUsersByName(users);
      this.trigger('usersView:render', users);
    });
    this.listenEvent('storage:user:update', this.updateUser.bind(this));
    this.listenEvent('storage:user:removed', this.removeUser.bind(this));
    this.listenEvent('storage:user:edit', this.handleEditUser.bind(this));
    this.listenEvent('storage:user:new', () => { this.trigger('newUserModal:data', this.groups); });
  }

  static sortUsersByName(users) {
    users.sort((u1, u2) => u1.name.localeCompare(u2.name));
  }

  activeGroupMembers() {
    return this.users.filter(user => user.group_id === this.activeGroupId);
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

  updateGroup(group) {
    const groupIndex = this.groups.findIndex(arrGroup => arrGroup.group_id === group.group_id);
    if (groupIndex === -1) {
      this.groups.push(group);
    } else {
      this.groups[groupIndex] = group;
    }
    this.groups.sort((g1, g2) => g1.name.localeCompare(g2.name));
    this.triggerRenderGroups();
  }

  removeGroup(id) {
    this.groups.forEach((group, index) => {
      if (group.group_id === id) {
        this.groups.splice(index, 1);
      }
    });
    if (this.activeGroupId === id) {
      this.activeGroupId = null;
      const users = this.activeGroupMembers();
      Storage.sortUsersByName(users);
      this.trigger('usersView:render', users);
    }
    this.triggerRenderGroups();
  }

  updateUser(user) {
    const userIndex = this.users.findIndex(arrUser => arrUser.user_id === user.user_id);
    if (userIndex === -1) {
      this.users.push(user);
    } else {
      this.users[userIndex] = user;
    }
    this.trigger('groupsView:renderMembersAmount', this.users);
    this.trigger('usersView:removeUser', user.user_id);
    if (user.group_id === this.activeGroupId) {
      const users = this.activeGroupMembers();
      Storage.sortUsersByName(users);
      this.trigger('usersView:pasteUser', { user, users });
    }
  }

  removeUser(id) {
    this.users.forEach((user, index) => {
      if (user.user_id === id) {
        this.users.splice(index, 1);
      }
    });
    this.trigger('usersView:removeUser', id);
    this.trigger('groupsView:renderMembersAmount', this.users);
  }
}
