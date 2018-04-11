import UserModal from './user_modal';

export default class EditUserModal extends UserModal {
  init() {
    this.listenEvent('editUserModal:data', this.setModalContent.bind(this));
  }

  setModalContent({ groups, user }) {
    this.user = user;

    const noCreditsLeft = !user.credits;
    const userGroup = groups.find(group => group.group_id === user.group_id);
    const isAdminGroup = userGroup.is_admin;

    this.fillModalHtml();
    this.selectModalFields();
    this.fillFields();
    this.setEditability(isAdminGroup, noCreditsLeft);

    this.initModalInstanses(groups);

    if (noCreditsLeft) {
      this.saveButt.style.display = 'none';
    }
    this.closeButt.addEventListener('click', this.editEnd.bind(this));
    this.saveButt.addEventListener('click', () => {
      if (!noCreditsLeft) {
        this.saveChanges(user.user_id);
      }
      this.editEnd();
    });

    this.modalInstance.open();
  }

  fillFields() {
    const fullNameArr = this.user.name.split(' ');

    this.firstNameInput.value = fullNameArr.shift();
    this.lastNameInput.value = fullNameArr.reduce((str, elem) => str + elem, '');
    this.streetInput.value = this.user.street;
    this.zipCodeInput.value = this.user.zip_code;
    this.cityInput.value = this.user.city;
    this.phoneInput.value = this.user.phone;
    this.creditsRangeInput.value = this.user.credits;
  }

  setEditability(isAdminGroup, noCreditsLeft) {
    if (!noCreditsLeft) {
      this.firstNameInput.classList.add('valid');
      this.lastNameInput.classList.add('valid');
      this.streetInput.classList.add('valid');
      this.zipCodeInput.classList.add('valid');
      this.cityInput.classList.add('valid');
      this.phoneInput.classList.add('valid');
    }
    this.firstNameInput.disabled = noCreditsLeft;
    this.lastNameInput.disabled = noCreditsLeft;
    this.streetInput.disabled = noCreditsLeft;
    this.zipCodeInput.disabled = noCreditsLeft;
    this.cityInput.disabled = noCreditsLeft;
    this.phoneInput.disabled = noCreditsLeft;
    this.groupSelect.disabled = noCreditsLeft;
    this.creditsRangeInput.disabled = isAdminGroup || noCreditsLeft;
  }
}
