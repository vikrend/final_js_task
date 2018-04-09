import Module from './module';

export default class UsersView extends Module {
  init() {
    this.usersMain = document.querySelector('#users-table');
    this.usersMain.innerHTML = `
      <table class="striped fixed">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Street</th>
                  <th>Zip code</th>
                  <th>City</th>
                  <th>Phone</th>
              </tr>
          </thead>

          <tbody></tbody>
      </table>`;
    this.usersContainer = this.usersMain.querySelector('table tbody');
    this.listenEvent('usersView:render', this.renderAllGroupMembers.bind(this));
    this.listenEvent('usersView:removeUser', this.removeUser.bind(this));
    this.listenEvent('usersView:pasteUser', this.pasteUser.bind(this));
    this.usersContainer.addEventListener('dblclick', this.handleEditUserEvent.bind(this));
  }

  handleEditUserEvent({ target }) {
    const userId = target.closest('tr').dataset.user_id;
    this.trigger('storage:user:edit', userId);
  }

  removeUser(userId) {
    const trList = this.usersContainer.childNodes;
    userId = userId.toString();
    trList.forEach((tr) => {
      if (tr.dataset.user_id === userId) {
        this.usersContainer.removeChild(tr);
      }
    });
  }

  static newUserTableRow(user) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
                  <td>${user.name}</td>
                  <td>${user.street}</td>
                  <td>${user.zip_code}</td>
                  <td>${user.city}</td>
                  <td>${user.phone}</td>`;
    tr.dataset.user_id = user.user_id;
    return tr;
  }

  pasteUser({ user, users }) {
    users.forEach((member, index) => {
      if (member.user_id === user.user_id) {
        const nextUser = users[index + 1];
        const tr = UsersView.newUserTableRow(user);
        if (!nextUser) {
          this.usersContainer.appendChild(tr);
        }
        if (nextUser) {
          this.usersContainer.childNodes.forEach((child) => {
            if (child.dataset.user_id === nextUser.user_id.toString()) {
              this.usersContainer.insertBefore(tr, child);
            }
          });
        }
      }
    });
  }

  renderAllGroupMembers(users) {
    this.usersContainer.innerHTML = '';
    users.forEach((user) => {
      const tr = UsersView.newUserTableRow(user);
      this.usersContainer.appendChild(tr);
    });
  }
}
