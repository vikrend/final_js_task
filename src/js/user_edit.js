import Module from './module';

export default class UserEditModal extends Module {
  constructor(mediatorElem) {
    super(mediatorElem);
    this.modalAddContainer = document.querySelector('#modalAdd');
    this.addButton = document.querySelector('#slide-out .modal-trigger');
  }

  init() {
    this.modalAddContainer.innerHTML = `<div class="modal-content">
          <h4>Add new member</h4>
          <div class="row">
              <form class="col s12">
                  <div class="row">
                      <div class="input-field col s6">
                          <input id="first_name" type="text" class="validate">
                          <label for="first_name">First Name</label>
                      </div>
                      <div class="input-field col s6">
                          <input id="last_name" type="text" class="validate">
                          <label for="last_name">Last Name</label>
                      </div>
                  </div>
                  <div class="row">
                      <div class="input-field col s12">
                          <input id="street" type="text" class="validate">
                          <label for="street">Street</label>
                      </div>
                  </div>
                  <div class="row">
                      <div class="input-field col s6">
                          <input id="zip_code" type="text" class="validate">
                          <label for="zip_code">Zip code</label>
                      </div>
                      <div class="input-field col s6">
                          <input id="city" type="text" class="validate">
                          <label for="city">City</label>
                      </div>
                  </div>
                  <div class="row">
                      <div class="input-field col s12">
                          <input id="phone" type="text" class="validate">
                          <label for="phone">Phone number</label>
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
          <a id="modal-close" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
          <a id="modal-create" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Create</a>
      </div>`;
    M.Modal.init(this.modalAddContainer, {});
    this.listenEvent('user:edit', this.setView.bind(this));
    this.addButton.addEventListener('click', this.setView.bind(this));
    this.userGroupSelect = document.querySelector('#modal-groups-select');
  }

  newUser() {

  }

  setView() {
    this.userGroupSelect.innerHTML = `<option value="" disabled selected>Choose group</option>
                              <option value="1">Administrator</option>
                              <option value="90">Merchant</option>
                              <option value="6">Operator</option>
                              <option value="4">Client</option>`;

    M.FormSelect.init(this.userGroupSelect, {});
  }
}
