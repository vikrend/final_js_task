import UserModal from './user_modal';

export default class NewUserModal extends UserModal {
  init() {
    this.newUserButton = document.querySelector('#addButton');

    this.newUserButton.addEventListener('click', () => { this.trigger('storage:user:new'); });
    this.listenEvent('newUserModal:data', this.setModalContent.bind(this));
  }

  setModalContent(groups) {
    this.fillModalHtml();
    this.selectModalFields();

    this.initModalInstanses(groups);

    this.closeButt.addEventListener('click', this.editEnd.bind(this));
    this.saveButt.addEventListener('click', () => {
      this.saveChanges();
      this.editEnd();
    });

    this.modalInstance.open();
  }
}
