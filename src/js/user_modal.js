import Module from './module';

export default class UserModal extends Module {
  constructor(mediatorElem) {
    super(mediatorElem);
    this.user = {};
    this.modalEditContainer = document.querySelector('#modalEdit');
    this.firstNameInput = null;
    this.lastNameInput = null;
    this.streetInput = null;
    this.zipCodeInput = null;
    this.cityInput = null;
    this.phoneInput = null;
    this.groupSelect = null;
    this.creditsRangeInput = null;
  }

  fillModalHtml() {
    const title = this.user.user_id ? 'Edit member' : 'Create new member';
    const saveButtText = this.user.user_id ? 'Save' : 'Create';
    this.modalEditContainer.innerHTML = `
      <div class="modal-content">
          <h4>${title}</h4>
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
          <a id="modal-save" class="light-green lighten-2 waves-effect waves-green btn-flat">${saveButtText}</a>
      </div>`;
  }

  selectModalFields() {
    this.firstNameInput = this.modalEditContainer.querySelector('#first_name');
    this.lastNameInput = this.modalEditContainer.querySelector('#last_name');
    this.streetInput = this.modalEditContainer.querySelector('#street');
    this.zipCodeInput = this.modalEditContainer.querySelector('#zip_code');
    this.cityInput = this.modalEditContainer.querySelector('#city');
    this.phoneInput = this.modalEditContainer.querySelector('#phone');
    this.groupSelect = this.modalEditContainer.querySelector('#modal-groups-select');
    this.creditsRangeInput = this.modalEditContainer.querySelector('#range_credit');

    this.closeButt = this.modalEditContainer.querySelector('#modal-close');
    this.saveButt = this.modalEditContainer.querySelector('#modal-save');
  }

  initModalInstanses(groups) {
    if (this.modalInstance) {
      this.modalInstance.destroy();
    }
    this.modalInstance = M.Modal.init(this.modalEditContainer);
    this.rangeInstance = M.Range.init(this.creditsRangeInput);
    this.initSelectGroupList(groups);
  }

  initSelectGroupList(groups) {
    this.groupSelect.innerHTML = '<option value="" disabled>Choose group</option>';
    this.groupSelect.querySelector('option').selected = !this.user.group_id;
    groups.forEach((group) => {
      const op = document.createElement('option');
      op.value = group.group_id;
      op.innerText = group.name;
      op.selected = group.group_id === this.user.group_id;
      this.groupSelect.appendChild(op);
    });
    this.selectInstance = M.FormSelect.init(this.groupSelect);
  }

  saveChanges(userId = 0) {
    this.user = {};
    this.user.user_id = userId;
    this.user.name = `${this.firstNameInput.value} ${this.lastNameInput.value}`;
    this.user.street = this.streetInput.value;
    this.user.zip_code = Number(this.zipCodeInput.value);
    this.user.city = this.cityInput.value;
    this.user.phone = this.phoneInput.value;
    this.user.group_id = Number(this.groupSelect.value);
    this.user.credits = Number(this.creditsRangeInput.value);
    this.trigger('network:fetchUser', this.user);
  }

  editEnd() {
    this.modalInstance.close();
    this.rangeInstance.destroy();
    this.selectInstance.destroy();
    this.modalEditContainer.innerHTML = '';
    document.querySelector('body').style.overflowY = 'scroll';
  }
}
