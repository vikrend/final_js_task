import Module from './module';

export default class UsersView extends Module {
  constructor(mediatorElem) {
    super(mediatorElem);
    this.usersContainer = document.querySelector('#users-table table tbody');
  }

  init() {
    this.listenEvent('users:render', this.renderUsers.bind(this));
  }

  renderUsers({ users, groupId }) {
    users = users.filter(user => user.group_id === groupId);

    this.usersContainer.innerHTML = '';
    users.forEach((user) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${user.name}</td>
                  <td>${user.street}</td>
                  <td>${user.zip_code}</td>
                  <td>${user.city}</td>
                  <td>${user.phone}</td>`;
      this.usersContainer.appendChild(tr);
    });
  }
}
