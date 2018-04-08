import Module from './module';

export default class UsersView extends Module {
  init() {
    this.usersMain = document.querySelector('#users-table');
    this.usersMain.innerHTML = `
      <table class="striped">
          <thead>
          <tr>
              <th>Name</th>
              <th>Street</th>
              <th>Zip code</th>
              <th>City</th>
              <th>Phone</th>
          </tr>
          </thead>

          <tbody>
          </tbody>
      </table>`;
    this.usersContainer = this.usersMain.querySelector('table tbody');
    this.listenEvent('users:render', this.renderUsers.bind(this));
    this.usersContainer.addEventListener('dblclick', this.handleEditUserEvent.bind(this));
  }

  handleEditUserEvent({ target }) {
    const userId = target.closest('tr').dataset.user_id;
    this.trigger('storage:user:edit', userId);
  }

  renderUsers(users) {
    this.usersContainer.innerHTML = '';
    users.forEach((user) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
                  <td>${user.name}</td>
                  <td>${user.street}</td>
                  <td>${user.zip_code}</td>
                  <td>${user.city}</td>
                  <td>${user.phone}</td>`;
      tr.dataset.user_id = user.user_id;
      this.usersContainer.appendChild(tr);
    });
  }
}
