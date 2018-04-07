/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/groups_view.js":
/*!*******************************!*\
  !*** ./src/js/groups_view.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GroupsView; });
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module */ "./src/js/module.js");


class GroupsView extends _module__WEBPACK_IMPORTED_MODULE_0__["default"] {
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


/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _socket_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socket_events */ "./src/js/socket_events.js");
/* harmony import */ var _groups_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./groups_view */ "./src/js/groups_view.js");
/* harmony import */ var _users_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users_view */ "./src/js/users_view.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage */ "./src/js/storage.js");
/* harmony import */ var _user_edit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user_edit */ "./src/js/user_edit.js");






const mediator = document;

_storage__WEBPACK_IMPORTED_MODULE_3__["default"].bindTo(mediator);
_groups_view__WEBPACK_IMPORTED_MODULE_1__["default"].bindTo(mediator);
_users_view__WEBPACK_IMPORTED_MODULE_2__["default"].bindTo(mediator);
_user_edit__WEBPACK_IMPORTED_MODULE_4__["default"].bindTo(mediator);
_socket_events__WEBPACK_IMPORTED_MODULE_0__["default"].bindTo(mediator);


/***/ }),

/***/ "./src/js/module.js":
/*!**************************!*\
  !*** ./src/js/module.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Module; });
class Module {
  constructor(mediatorElem) {
    this.mediator = mediatorElem;
  }

  listenEvent(eventType, callback) {
    const cbWrapper = event => callback(event.detail);
    this.mediator.addEventListener(eventType, cbWrapper);
  }

  trigger(eventType, data) {
    const event = new CustomEvent(eventType, { detail: data });
    this.mediator.dispatchEvent(event);
  }

  static bindTo(selector) {
    let element = selector;
    if (typeof element === 'string') {
      element = document.querySelector(selector);
    }

    if (!(element instanceof HTMLDocument || element instanceof HTMLElement)) {
      throw Error('Not a valid selector / htmlElement');
    }

    (new this(element)).init();
  }

  // eslint-disable-next-line class-methods-use-this
  init() {
    throw new Error('Must be defined');
  }
}


/***/ }),

/***/ "./src/js/socket_events.js":
/*!*********************************!*\
  !*** ./src/js/socket_events.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Socket; });
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module */ "./src/js/module.js");


class Socket extends _module__WEBPACK_IMPORTED_MODULE_0__["default"] {
  handleMessage(event) {
    const data = JSON.parse(event.data);
    const customEvent = new CustomEvent(data.action, { detail: data });
    if (!data.action) {
      return;
    }
    this.mediator.dispatchEvent(customEvent);
  }

  init() {
    const socket = new WebSocket('ws://ums-honeybadger.herokuapp.com/ums');
    socket.onmessage = this.handleMessage.bind(this);
  }
}


/***/ }),

/***/ "./src/js/storage.js":
/*!***************************!*\
  !*** ./src/js/storage.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Storage; });
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module */ "./src/js/module.js");


class Storage extends _module__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(mediatorElem) {
    super(mediatorElem);
    this.groups = [];
    this.users = [];
    this.activeGroupId = null;
  }

  init() {
    this.listenEvent('group:updated', this.updateGroup.bind(this));
    this.listenEvent('group:removed', this.removeGroup.bind(this));
    this.listenEvent('groups:select', (groupId) => {
      this.activeGroupId = groupId;
      this.trigger('groups:render', {
        groups: this.groups,
        users: this.users,
        activeGroupId: this.activeGroupId,
      });
      this.trigger('users:render', { users: this.users, groupId });
    });
    this.listenEvent('user:updated', this.updateUser.bind(this));
    this.listenEvent('user:removed', this.removeUser.bind(this));
    this.listenEvent('modal:open', () => {});
  }

  updateGroup({ id }) {
    const fetchUrl = `https://ums-honeybadger.herokuapp.com/group/${id}`;
    fetch(fetchUrl, { method: 'GET' })
      .then(response => response.json())
      .then((data) => {
        this.groups.push(data);
        this.groups.sort((g1, g2) => g1.name >= g2.name);
        this.trigger('groups:render', {
          groups: this.groups,
          users: this.users,
          activeGroupId: this.activeGroupId,
        });
      });
  }

  removeGroup({ id }) {
    this.groups.forEach((group, index) => {
      if (group.group_id === id) {
        this.groups.splice(index, 1);
      }
    });
    this.trigger('groups:render', {
      groups: this.groups,
      users: this.users,
      activeGroupId: this.activeGroupId,
    });
  }

  updateUser({ id }) {
    fetch(`https://ums-honeybadger.herokuapp.com/user/${id}`, { method: 'GET' })
      .then(response => response.json())
      .then((data) => {
        this.users.push(data);
        this.trigger('groups:render', {
          groups: this.groups,
          users: this.users,
          activeGroupId: this.activeGroupId,
        });
        this.trigger('users:render', { users: this.users, groupId: this.activeGroupId });
      });
  }

  removeUser({ id }) {
    this.users.forEach((user, index) => {
      if (user.user_id === id) {
        this.users.splice(index, 1);
      }
    });
    this.trigger('groups:render', {
      groups: this.groups,
      users: this.users,
      activeGroupId: this.activeGroupId,
    });
    this.trigger('users:render', { users: this.users, groupId: this.activeGroupId });
  }
}


/***/ }),

/***/ "./src/js/user_edit.js":
/*!*****************************!*\
  !*** ./src/js/user_edit.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserEditModal; });
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module */ "./src/js/module.js");


class UserEditModal extends _module__WEBPACK_IMPORTED_MODULE_0__["default"] {
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


/***/ }),

/***/ "./src/js/users_view.js":
/*!******************************!*\
  !*** ./src/js/users_view.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UsersView; });
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module */ "./src/js/module.js");


class UsersView extends _module__WEBPACK_IMPORTED_MODULE_0__["default"] {
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dyb3Vwc192aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NvY2tldF9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXJfZWRpdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlcnNfdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ25FQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxREFBcUQsU0FBUztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxvQ0FBb0M7QUFDcEM7O0FBRUEsZ0JBQWdCLCtCQUErQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1Asb0NBQW9DLFdBQVcsNENBQTRDLFlBQVk7QUFDdkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEMsZUFBZTtBQUM3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsZUFBZTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLG9DQUFvQyw2QkFBNkI7QUFDakUsS0FBSztBQUNMO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7O0FBRUEsZUFBZSxLQUFLO0FBQ3BCLG9FQUFvRSxHQUFHO0FBQ3ZFLHFCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUEsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBLGNBQWMsS0FBSztBQUNuQix3REFBd0QsR0FBRyxJQUFJLGdCQUFnQjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxzQ0FBc0MsaURBQWlEO0FBQ3ZGLE9BQU87QUFDUDs7QUFFQSxjQUFjLEtBQUs7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsa0NBQWtDLGlEQUFpRDtBQUNuRjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUE4QztBQUM5QztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGVBQWUsaUJBQWlCO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVO0FBQ3RDLHdCQUF3QixZQUFZO0FBQ3BDLHdCQUF3QixjQUFjO0FBQ3RDLHdCQUF3QixVQUFVO0FBQ2xDLHdCQUF3QixXQUFXO0FBQ25DO0FBQ0EsS0FBSztBQUNMO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL21haW4uanNcIik7XG4iLCJpbXBvcnQgTW9kdWxlIGZyb20gJy4vbW9kdWxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBzVmlldyBleHRlbmRzIE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKG1lZGlhdG9yRWxlbSkge1xuICAgIHN1cGVyKG1lZGlhdG9yRWxlbSk7XG4gICAgdGhpcy5ncm91cHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2xpZGUtb3V0IHVsJyk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMubGlzdGVuRXZlbnQoJ2dyb3VwczpyZW5kZXInLCB0aGlzLnJlbmRlckdyb3Vwcy5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmdyb3Vwc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICh7IHRhcmdldCB9KSA9PiB7XG4gICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgIT09ICdsaScpIHtcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LmNsb3Nlc3QoJ2xpJyk7XG4gICAgICB9XG4gICAgICB0aGlzLnRyaWdnZXIoJ2dyb3VwczpzZWxlY3QnLCBOdW1iZXIodGFyZ2V0LmRhdGFzZXQuZ3JvdXBfaWQpKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGdyb3Vwc1NpZGVuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2xpZGUtb3V0Jyk7XG4gICAgTS5TaWRlbmF2LmluaXQoZ3JvdXBzU2lkZW5hdiwge30pO1xuICB9XG5cbiAgcmVuZGVyR3JvdXBzKHsgZ3JvdXBzLCB1c2VycywgYWN0aXZlR3JvdXBJZCB9KSB7XG4gICAgdGhpcy5ncm91cHNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgYXJyb3ctYm9keS1zdHlsZVxuICAgICAgY29uc3QgdXNlcnNBbW91bnQgPSB1c2Vycy5yZWR1Y2UoKGFtb3VudCwgdXNlcikgPT4ge1xuICAgICAgICByZXR1cm4gYW1vdW50ICsgTnVtYmVyKHVzZXIuZ3JvdXBfaWQgPT09IGdyb3VwLmdyb3VwX2lkKTtcbiAgICAgIH0sIDApO1xuICAgICAgbGkuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCIjXCI+JHtncm91cC5uYW1lfTxzcGFuIGNsYXNzPVwiYmFkZ2VcIiBkYXRhLWJhZGdlLWNhcHRpb249XCJcIj4ke3VzZXJzQW1vdW50fTwvc3Bhbj48L2E+YDtcbiAgICAgIGxpLmRhdGFzZXQuZ3JvdXBfaWQgPSBncm91cC5ncm91cF9pZDtcbiAgICAgIGlmIChncm91cC5ncm91cF9pZCA9PT0gYWN0aXZlR3JvdXBJZCkge1xuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZ3JvdXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IFNvY2tldCBmcm9tICcuL3NvY2tldF9ldmVudHMnO1xuaW1wb3J0IEdyb3Vwc1ZpZXcgZnJvbSAnLi9ncm91cHNfdmlldyc7XG5pbXBvcnQgVXNlcnNWaWV3IGZyb20gJy4vdXNlcnNfdmlldyc7XG5pbXBvcnQgU3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IFVzZXJFZGl0TW9kYWwgZnJvbSAnLi91c2VyX2VkaXQnO1xuXG5jb25zdCBtZWRpYXRvciA9IGRvY3VtZW50O1xuXG5TdG9yYWdlLmJpbmRUbyhtZWRpYXRvcik7XG5Hcm91cHNWaWV3LmJpbmRUbyhtZWRpYXRvcik7XG5Vc2Vyc1ZpZXcuYmluZFRvKG1lZGlhdG9yKTtcblVzZXJFZGl0TW9kYWwuYmluZFRvKG1lZGlhdG9yKTtcblNvY2tldC5iaW5kVG8obWVkaWF0b3IpO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kdWxlIHtcbiAgY29uc3RydWN0b3IobWVkaWF0b3JFbGVtKSB7XG4gICAgdGhpcy5tZWRpYXRvciA9IG1lZGlhdG9yRWxlbTtcbiAgfVxuXG4gIGxpc3RlbkV2ZW50KGV2ZW50VHlwZSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBjYldyYXBwZXIgPSBldmVudCA9PiBjYWxsYmFjayhldmVudC5kZXRhaWwpO1xuICAgIHRoaXMubWVkaWF0b3IuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGNiV3JhcHBlcik7XG4gIH1cblxuICB0cmlnZ2VyKGV2ZW50VHlwZSwgZGF0YSkge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50VHlwZSwgeyBkZXRhaWw6IGRhdGEgfSk7XG4gICAgdGhpcy5tZWRpYXRvci5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIHN0YXRpYyBiaW5kVG8oc2VsZWN0b3IpIHtcbiAgICBsZXQgZWxlbWVudCA9IHNlbGVjdG9yO1xuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICBpZiAoIShlbGVtZW50IGluc3RhbmNlb2YgSFRNTERvY3VtZW50IHx8IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgIHRocm93IEVycm9yKCdOb3QgYSB2YWxpZCBzZWxlY3RvciAvIGh0bWxFbGVtZW50Jyk7XG4gICAgfVxuXG4gICAgKG5ldyB0aGlzKGVsZW1lbnQpKS5pbml0KCk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuICBpbml0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBiZSBkZWZpbmVkJyk7XG4gIH1cbn1cbiIsImltcG9ydCBNb2R1bGUgZnJvbSAnLi9tb2R1bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2NrZXQgZXh0ZW5kcyBNb2R1bGUge1xuICBoYW5kbGVNZXNzYWdlKGV2ZW50KSB7XG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG4gICAgY29uc3QgY3VzdG9tRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoZGF0YS5hY3Rpb24sIHsgZGV0YWlsOiBkYXRhIH0pO1xuICAgIGlmICghZGF0YS5hY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5tZWRpYXRvci5kaXNwYXRjaEV2ZW50KGN1c3RvbUV2ZW50KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc3Qgc29ja2V0ID0gbmV3IFdlYlNvY2tldCgnd3M6Ly91bXMtaG9uZXliYWRnZXIuaGVyb2t1YXBwLmNvbS91bXMnKTtcbiAgICBzb2NrZXQub25tZXNzYWdlID0gdGhpcy5oYW5kbGVNZXNzYWdlLmJpbmQodGhpcyk7XG4gIH1cbn1cbiIsImltcG9ydCBNb2R1bGUgZnJvbSAnLi9tb2R1bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlIGV4dGVuZHMgTW9kdWxlIHtcbiAgY29uc3RydWN0b3IobWVkaWF0b3JFbGVtKSB7XG4gICAgc3VwZXIobWVkaWF0b3JFbGVtKTtcbiAgICB0aGlzLmdyb3VwcyA9IFtdO1xuICAgIHRoaXMudXNlcnMgPSBbXTtcbiAgICB0aGlzLmFjdGl2ZUdyb3VwSWQgPSBudWxsO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmxpc3RlbkV2ZW50KCdncm91cDp1cGRhdGVkJywgdGhpcy51cGRhdGVHcm91cC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmxpc3RlbkV2ZW50KCdncm91cDpyZW1vdmVkJywgdGhpcy5yZW1vdmVHcm91cC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmxpc3RlbkV2ZW50KCdncm91cHM6c2VsZWN0JywgKGdyb3VwSWQpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZlR3JvdXBJZCA9IGdyb3VwSWQ7XG4gICAgICB0aGlzLnRyaWdnZXIoJ2dyb3VwczpyZW5kZXInLCB7XG4gICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgIHVzZXJzOiB0aGlzLnVzZXJzLFxuICAgICAgICBhY3RpdmVHcm91cElkOiB0aGlzLmFjdGl2ZUdyb3VwSWQsXG4gICAgICB9KTtcbiAgICAgIHRoaXMudHJpZ2dlcigndXNlcnM6cmVuZGVyJywgeyB1c2VyczogdGhpcy51c2VycywgZ3JvdXBJZCB9KTtcbiAgICB9KTtcbiAgICB0aGlzLmxpc3RlbkV2ZW50KCd1c2VyOnVwZGF0ZWQnLCB0aGlzLnVwZGF0ZVVzZXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5saXN0ZW5FdmVudCgndXNlcjpyZW1vdmVkJywgdGhpcy5yZW1vdmVVc2VyLmJpbmQodGhpcykpO1xuICAgIHRoaXMubGlzdGVuRXZlbnQoJ21vZGFsOm9wZW4nLCAoKSA9PiB7fSk7XG4gIH1cblxuICB1cGRhdGVHcm91cCh7IGlkIH0pIHtcbiAgICBjb25zdCBmZXRjaFVybCA9IGBodHRwczovL3Vtcy1ob25leWJhZGdlci5oZXJva3VhcHAuY29tL2dyb3VwLyR7aWR9YDtcbiAgICBmZXRjaChmZXRjaFVybCwgeyBtZXRob2Q6ICdHRVQnIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLmdyb3Vwcy5wdXNoKGRhdGEpO1xuICAgICAgICB0aGlzLmdyb3Vwcy5zb3J0KChnMSwgZzIpID0+IGcxLm5hbWUgPj0gZzIubmFtZSk7XG4gICAgICAgIHRoaXMudHJpZ2dlcignZ3JvdXBzOnJlbmRlcicsIHtcbiAgICAgICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLFxuICAgICAgICAgIHVzZXJzOiB0aGlzLnVzZXJzLFxuICAgICAgICAgIGFjdGl2ZUdyb3VwSWQ6IHRoaXMuYWN0aXZlR3JvdXBJZCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUdyb3VwKHsgaWQgfSkge1xuICAgIHRoaXMuZ3JvdXBzLmZvckVhY2goKGdyb3VwLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGdyb3VwLmdyb3VwX2lkID09PSBpZCkge1xuICAgICAgICB0aGlzLmdyb3Vwcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMudHJpZ2dlcignZ3JvdXBzOnJlbmRlcicsIHtcbiAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICB1c2VyczogdGhpcy51c2VycyxcbiAgICAgIGFjdGl2ZUdyb3VwSWQ6IHRoaXMuYWN0aXZlR3JvdXBJZCxcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVVzZXIoeyBpZCB9KSB7XG4gICAgZmV0Y2goYGh0dHBzOi8vdW1zLWhvbmV5YmFkZ2VyLmhlcm9rdWFwcC5jb20vdXNlci8ke2lkfWAsIHsgbWV0aG9kOiAnR0VUJyB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy51c2Vycy5wdXNoKGRhdGEpO1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ2dyb3VwczpyZW5kZXInLCB7XG4gICAgICAgICAgZ3JvdXBzOiB0aGlzLmdyb3VwcyxcbiAgICAgICAgICB1c2VyczogdGhpcy51c2VycyxcbiAgICAgICAgICBhY3RpdmVHcm91cElkOiB0aGlzLmFjdGl2ZUdyb3VwSWQsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ3VzZXJzOnJlbmRlcicsIHsgdXNlcnM6IHRoaXMudXNlcnMsIGdyb3VwSWQ6IHRoaXMuYWN0aXZlR3JvdXBJZCB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlVXNlcih7IGlkIH0pIHtcbiAgICB0aGlzLnVzZXJzLmZvckVhY2goKHVzZXIsIGluZGV4KSA9PiB7XG4gICAgICBpZiAodXNlci51c2VyX2lkID09PSBpZCkge1xuICAgICAgICB0aGlzLnVzZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy50cmlnZ2VyKCdncm91cHM6cmVuZGVyJywge1xuICAgICAgZ3JvdXBzOiB0aGlzLmdyb3VwcyxcbiAgICAgIHVzZXJzOiB0aGlzLnVzZXJzLFxuICAgICAgYWN0aXZlR3JvdXBJZDogdGhpcy5hY3RpdmVHcm91cElkLFxuICAgIH0pO1xuICAgIHRoaXMudHJpZ2dlcigndXNlcnM6cmVuZGVyJywgeyB1c2VyczogdGhpcy51c2VycywgZ3JvdXBJZDogdGhpcy5hY3RpdmVHcm91cElkIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgTW9kdWxlIGZyb20gJy4vbW9kdWxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckVkaXRNb2RhbCBleHRlbmRzIE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKG1lZGlhdG9yRWxlbSkge1xuICAgIHN1cGVyKG1lZGlhdG9yRWxlbSk7XG4gICAgdGhpcy5tb2RhbEFkZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbEFkZCcpO1xuICAgIHRoaXMuYWRkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NsaWRlLW91dCAubW9kYWwtdHJpZ2dlcicpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLm1vZGFsQWRkQ29udGFpbmVyLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgIDxoND5BZGQgbmV3IG1lbWJlcjwvaDQ+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImNvbCBzMTJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM2XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImZpcnN0X25hbWVcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZpcnN0X25hbWVcIj5GaXJzdCBOYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM2XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImxhc3RfbmFtZVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibGFzdF9uYW1lXCI+TGFzdCBOYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInN0cmVldFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwic3RyZWV0XCI+U3RyZWV0PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiemlwX2NvZGVcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInppcF9jb2RlXCI+WmlwIGNvZGU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiY2l0eVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2l0eVwiPkNpdHk8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwicGhvbmVcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBob25lXCI+UGhvbmUgbnVtYmVyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJtb2RhbC1ncm91cHMtc2VsZWN0XCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Hcm91cDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicmFuZ2VfY3JlZGl0XCI+Q3JlZGl0PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInJhbmdlX2NyZWRpdFwiIHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIxMDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICA8YSBpZD1cIm1vZGFsLWNsb3NlXCIgaHJlZj1cIiMhXCIgY2xhc3M9XCJtb2RhbC1hY3Rpb24gbW9kYWwtY2xvc2Ugd2F2ZXMtZWZmZWN0IHdhdmVzLWdyZWVuIGJ0bi1mbGF0XCI+Q2xvc2U8L2E+XG4gICAgICAgICAgPGEgaWQ9XCJtb2RhbC1jcmVhdGVcIiBocmVmPVwiIyFcIiBjbGFzcz1cIm1vZGFsLWFjdGlvbiBtb2RhbC1jbG9zZSB3YXZlcy1lZmZlY3Qgd2F2ZXMtZ3JlZW4gYnRuLWZsYXRcIj5DcmVhdGU8L2E+XG4gICAgICA8L2Rpdj5gO1xuICAgIE0uTW9kYWwuaW5pdCh0aGlzLm1vZGFsQWRkQ29udGFpbmVyLCB7fSk7XG4gICAgdGhpcy5saXN0ZW5FdmVudCgndXNlcjplZGl0JywgdGhpcy5zZXRWaWV3LmJpbmQodGhpcykpO1xuICAgIHRoaXMuYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zZXRWaWV3LmJpbmQodGhpcykpO1xuICAgIHRoaXMudXNlckdyb3VwU2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsLWdyb3Vwcy1zZWxlY3QnKTtcbiAgfVxuXG4gIG5ld1VzZXIoKSB7XG5cbiAgfVxuXG4gIHNldFZpZXcoKSB7XG4gICAgdGhpcy51c2VyR3JvdXBTZWxlY3QuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZCBzZWxlY3RlZD5DaG9vc2UgZ3JvdXA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxXCI+QWRtaW5pc3RyYXRvcjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjkwXCI+TWVyY2hhbnQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI2XCI+T3BlcmF0b3I8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI0XCI+Q2xpZW50PC9vcHRpb24+YDtcblxuICAgIE0uRm9ybVNlbGVjdC5pbml0KHRoaXMudXNlckdyb3VwU2VsZWN0LCB7fSk7XG4gIH1cbn1cbiIsImltcG9ydCBNb2R1bGUgZnJvbSAnLi9tb2R1bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2Vyc1ZpZXcgZXh0ZW5kcyBNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihtZWRpYXRvckVsZW0pIHtcbiAgICBzdXBlcihtZWRpYXRvckVsZW0pO1xuICAgIHRoaXMudXNlcnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlcnMtdGFibGUgdGFibGUgdGJvZHknKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5saXN0ZW5FdmVudCgndXNlcnM6cmVuZGVyJywgdGhpcy5yZW5kZXJVc2Vycy5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHJlbmRlclVzZXJzKHsgdXNlcnMsIGdyb3VwSWQgfSkge1xuICAgIHVzZXJzID0gdXNlcnMuZmlsdGVyKHVzZXIgPT4gdXNlci5ncm91cF9pZCA9PT0gZ3JvdXBJZCk7XG5cbiAgICB0aGlzLnVzZXJzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgIHVzZXJzLmZvckVhY2goKHVzZXIpID0+IHtcbiAgICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgIHRyLmlubmVySFRNTCA9IGA8dGQ+JHt1c2VyLm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZD4ke3VzZXIuc3RyZWV0fTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQ+JHt1c2VyLnppcF9jb2RlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQ+JHt1c2VyLmNpdHl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZD4ke3VzZXIucGhvbmV9PC90ZD5gO1xuICAgICAgdGhpcy51c2Vyc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0cik7XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=