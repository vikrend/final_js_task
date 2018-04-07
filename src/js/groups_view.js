import Module from './module';

export default class GroupsView extends Module {
  constructor(mediatorElem) {
    super(mediatorElem);
    this.groupsContainer = document.querySelector('#slide-out ul');
  }

  init() {
    this.listenEvent('groups:render', this.renderGroups.bind(this));
    this.groupsContainer.addEventListener('click', ({ target }) => {
      if (target.tagName !== 'li') {
        target = target.closest('li');
      }
      this.trigger('groups:select', Number(target.dataset.group_id));
    });

    const groupsSidenav = document.querySelector('#slide-out');
    M.Sidenav.init(groupsSidenav, {});
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
