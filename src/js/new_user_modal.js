import Module from './module';

export default class NewUserModal extends Module {
  init() {
    this.modalEditContainer = document.querySelector('#modalEdit');
    this.newUserButton = document.querySelector('#addButton');

    this.listenEvent('newUserModal:data', this.setModalContent.bind(this));
    this.newUserButton.addEventListener('click', () => { this.trigger('storage:user:new'); });
  }

  setModalContent({ groups }) {
    this.modalEditContainer.innerHTML = `
      <div class="modal-content">
          <h4>Create new member</h4>
          <div class="row">
              <form class="col s12">
                  <div class="row">
                      <div class="input-field col s6">
                          <input id="first_name" type="text" class="validate">
                          <label for="first_name" class="active">First Name</label>
                      </div>
                      <div class="input-field col s6">
                          <input id="last_name" type="text" class="validate">
                          <label for="last_name" class="active">Last Name</label>
                      </div>
                  </div>
                  <div class="row">
                      <div class="input-field col s12">
                          <input id="street" type="text" class="validate">
                          <label for="street" class="active">Street</label>
                      </div>
                  </div>
                  <div class="row">
                      <div class="input-field col s6">
                          <input id="zip_code" type="text" class="validate">
                          <label for="zip_code" class="active">Zip code</label>
                      </div>
                      <div class="input-field col s6">
                          <input id="city" type="text" class="validate">
                          <label for="city" class="active">City</label>
                      </div>
                  </div>
                  <div class="row">
                      <div class="input-field col s12">
                          <input id="phone" type="text" class="validate">
                          <label for="phone" class="active">Phone number</label>
                      </div>
                  </div>
                  <div class="row">
                      <div class="input-field col s12">
                          <select id="modal-groups-select">

                          </select>
                          <label>Group</label>
                      </div>
                  </div>
                  <div class="row">
                      <div class="input-field col s12">
                          <label for="range_credit">Credit</label>
                      </div>
                  </div>
                  <div class="row">
                      <div class="input-field col s12">
                          <input id="range_credit" type="range" min="0" max="1000" />
                      </div>
                  </div>
              </form>
          </div>
      </div>
      <div class="modal-footer">
          <a id="modal-close" class="deep-orange lighten-2 waves-effect waves-red btn-flat">Close</a>
          <a id="modal-save" class="light-green lighten-2 waves-effect waves-green btn-flat">Create</a>
      </div>`;

    this.firstNameInput = this.modalEditContainer.querySelector('#first_name');
    this.lastNameInput = this.modalEditContainer.querySelector('#last_name');
    this.streetInput = this.modalEditContainer.querySelector('#street');
    this.zipCodeInput = this.modalEditContainer.querySelector('#zip_code');
    this.cityInput = this.modalEditContainer.querySelector('#city');
    this.phoneInput = this.modalEditContainer.querySelector('#phone');
    this.groupSelect = this.modalEditContainer.querySelector('#modal-groups-select');
    this.creditsRangeInput = this.modalEditContainer.querySelector('#range_credit');

    if (this.modalInstance) {
      this.modalInstance.destroy();
    }
    this.modalInstance = M.Modal.init(this.modalEditContainer);
    this.rangeInstance = M.Range.init(this.creditsRangeInput);
    this.initSelectGroupList({ groups });

    this.closeButt = this.modalEditContainer.querySelector('#modal-close');
    this.saveButt = this.modalEditContainer.querySelector('#modal-save');
    this.closeButt.addEventListener('click', this.editEnd.bind(this));
    this.saveButt.addEventListener('click', () => {
      this.saveChanges();
      this.editEnd();
    });

    this.modalInstance.open();
  }

  initSelectGroupList({ groups }) {
    this.groupSelect.innerHTML = '<option value="" disabled selected>Choose group</option>';
    groups.forEach((group) => {
      const op = document.createElement('option');
      op.value = group.group_id;
      op.innerText = group.name;
      this.groupSelect.appendChild(op);
    });
    this.selectInstance = M.FormSelect.init(this.groupSelect);
  }

  saveChanges() {
    const user = {};

    user.user_id = 0;
    user.name = `${this.firstNameInput.value} ${this.lastNameInput.value}`;
    user.street = this.streetInput.value;
    user.zip_code = Number(this.zipCodeInput.value);
    user.city = this.cityInput.value;
    user.phone = this.phoneInput.value;
    user.group_id = Number(this.modalEditContainer.querySelector('#modal-groups-select').value);
    user.credits = Number(this.creditsRangeInput.value);
    this.trigger('storage:fetchUser:new', user);
  }

  editEnd() {
    this.modalInstance.close();
    this.rangeInstance.destroy();
    this.selectInstance.destroy();
    this.modalEditContainer.innerHTML = '';
    document.querySelector('body').style.overflowY = 'scroll';
  }
}
