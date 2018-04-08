import Module from './module';

export default class GroupsView extends Module {
  init() {
    document.querySelector('#header').innerHTML = `
          <nav>
          <div class="nav-wrapper">
              <a href="#" data-target="slide-out" class="brand-logo sidenav-trigger">
                  <i class="material-icons">menu</i>
              </a>
              <span class="page-title">Merchants</span>
          </div>
      </nav>`;

    this.groupsSidenav = document.querySelector('#slide-out');
    this.groupsSidenav.innerHTML = `
      <ul id="groups-list">
      </ul>
      <div class="navigation-add">
          <a id="addButton" class="btn-floating btn-large waves-effect waves-light" href="#!">
              <i class="material-icons">add</i>
          </a>
      </div>`;

    M.Sidenav.init(this.groupsSidenav, {});

    this.groupsContainer = document.querySelector('#groups-list');
    this.groupsContainer.addEventListener('click', ({ target }) => {
      const groupId = Number(target.closest('li').dataset.group_id);
      this.trigger('groups:select', groupId);
    });

    this.listenEvent('groups:render', this.renderGroups.bind(this));
  }

  renderGroups({ groups, users, activeGroupId }) {
    this.groupsContainer.innerHTML = '';
    groups.forEach((group) => {
      const li = document.createElement('li');
      // eslint-disable-next-line arrow-body-style
      const usersAmount = users.reduce((amount, user) => {
        return amount + Number(user.group_id === group.group_id);
      }, 0);
      li.innerHTML = `<a href="#">${group.name}<span class="badge" data-badge-caption="">${usersAmount}</span></a>`;
      li.dataset.group_id = group.group_id;
      if (group.group_id === activeGroupId) {
        li.classList.add('active');
      }
      this.groupsContainer.appendChild(li);
    });
  }
}
