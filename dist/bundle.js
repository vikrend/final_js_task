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

    const userGroupSelect = document.querySelector('#modal-groups-select');
    M.FormSelect.init(userGroupSelect, {});
  }

  renderGroups({ groups, users, activeGroupId }) {
    this.groupsContainer.innerHTML = '';
    groups.forEach((group) => {
      const li = document.createElement('li');
      const usersAmount = users.filter(user => user.group_id === group.group_id).length;
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
    this.listenEvent('user:updated', this.updateUser.bind(this));
    this.listenEvent('user:removed', this.removeUser.bind(this));
    this.listenEvent('groups:select', (groupId) => {
      this.activeGroupId = groupId;
      this.trigger('groups:render', {
        groups: this.groups,
        users: this.users,
        activeGroupId: this.activeGroupId,
      });
      this.trigger('users:render', { users: this.users, groupId });
    });
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
    this.listenEvent('user:edit', this.setView.bind(this));
    // this.addButton.addEventListener('click', this.setView.bind(this));

    const addModal = document.querySelector('#modalAdd');
    M.Modal.init(addModal, {});
  }

  setView() {
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
                              <option value="" disabled selected>Choose group</option>
                              <option value="1">Administrator</option>
                              <option value="2">Merchant</option>
                              <option value="3">Operator</option>
                              <option value="4">Client</option>
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dyb3Vwc192aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NvY2tldF9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXJfZWRpdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlcnNfdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ25FQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxREFBcUQsU0FBUztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxvQ0FBb0M7O0FBRXBDO0FBQ0EseUNBQXlDO0FBQ3pDOztBQUVBLGdCQUFnQiwrQkFBK0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsV0FBVyw0Q0FBNEMsWUFBWTtBQUN2RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhDQUE4QyxlQUFlO0FBQzdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDaENBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxlQUFlO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLG9DQUFvQyw2QkFBNkI7QUFDakUsS0FBSztBQUNMOztBQUVBLGVBQWUsS0FBSztBQUNwQixvRUFBb0UsR0FBRztBQUN2RSxxQkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBLGVBQWUsS0FBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQSxjQUFjLEtBQUs7QUFDbkIsd0RBQXdELEdBQUcsSUFBSSxnQkFBZ0I7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsc0NBQXNDLGlEQUFpRDtBQUN2RixPQUFPO0FBQ1A7O0FBRUEsY0FBYyxLQUFLO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGtDQUFrQyxpREFBaUQ7QUFDbkY7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQ0FBMkM7QUFDM0M7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLGlCQUFpQjtBQUNoQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTtBQUN0Qyx3QkFBd0IsWUFBWTtBQUNwQyx3QkFBd0IsY0FBYztBQUN0Qyx3QkFBd0IsVUFBVTtBQUNsQyx3QkFBd0IsV0FBVztBQUNuQztBQUNBLEtBQUs7QUFDTDtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9tYWluLmpzXCIpO1xuIiwiaW1wb3J0IE1vZHVsZSBmcm9tICcuL21vZHVsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3Vwc1ZpZXcgZXh0ZW5kcyBNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihtZWRpYXRvckVsZW0pIHtcbiAgICBzdXBlcihtZWRpYXRvckVsZW0pO1xuICAgIHRoaXMuZ3JvdXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NsaWRlLW91dCB1bCcpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmxpc3RlbkV2ZW50KCdncm91cHM6cmVuZGVyJywgdGhpcy5yZW5kZXJHcm91cHMuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ncm91cHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoeyB0YXJnZXQgfSkgPT4ge1xuICAgICAgaWYgKHRhcmdldC50YWdOYW1lICE9PSAnbGknKSB7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5jbG9zZXN0KCdsaScpO1xuICAgICAgfVxuICAgICAgdGhpcy50cmlnZ2VyKCdncm91cHM6c2VsZWN0JywgTnVtYmVyKHRhcmdldC5kYXRhc2V0Lmdyb3VwX2lkKSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBncm91cHNTaWRlbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NsaWRlLW91dCcpO1xuICAgIE0uU2lkZW5hdi5pbml0KGdyb3Vwc1NpZGVuYXYsIHt9KTtcblxuICAgIGNvbnN0IHVzZXJHcm91cFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbC1ncm91cHMtc2VsZWN0Jyk7XG4gICAgTS5Gb3JtU2VsZWN0LmluaXQodXNlckdyb3VwU2VsZWN0LCB7fSk7XG4gIH1cblxuICByZW5kZXJHcm91cHMoeyBncm91cHMsIHVzZXJzLCBhY3RpdmVHcm91cElkIH0pIHtcbiAgICB0aGlzLmdyb3Vwc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICBncm91cHMuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGNvbnN0IHVzZXJzQW1vdW50ID0gdXNlcnMuZmlsdGVyKHVzZXIgPT4gdXNlci5ncm91cF9pZCA9PT0gZ3JvdXAuZ3JvdXBfaWQpLmxlbmd0aDtcbiAgICAgIGxpLmlubmVySFRNTCA9IGA8YSBocmVmPVwiI1wiPiR7Z3JvdXAubmFtZX08c3BhbiBjbGFzcz1cImJhZGdlXCIgZGF0YS1iYWRnZS1jYXB0aW9uPVwiXCI+JHt1c2Vyc0Ftb3VudH08L3NwYW4+PC9hPmA7XG4gICAgICBsaS5kYXRhc2V0Lmdyb3VwX2lkID0gZ3JvdXAuZ3JvdXBfaWQ7XG4gICAgICBpZiAoZ3JvdXAuZ3JvdXBfaWQgPT09IGFjdGl2ZUdyb3VwSWQpIHtcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmdyb3Vwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBTb2NrZXQgZnJvbSAnLi9zb2NrZXRfZXZlbnRzJztcbmltcG9ydCBHcm91cHNWaWV3IGZyb20gJy4vZ3JvdXBzX3ZpZXcnO1xuaW1wb3J0IFVzZXJzVmlldyBmcm9tICcuL3VzZXJzX3ZpZXcnO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCBVc2VyRWRpdE1vZGFsIGZyb20gJy4vdXNlcl9lZGl0JztcblxuY29uc3QgbWVkaWF0b3IgPSBkb2N1bWVudDtcblxuU3RvcmFnZS5iaW5kVG8obWVkaWF0b3IpO1xuR3JvdXBzVmlldy5iaW5kVG8obWVkaWF0b3IpO1xuVXNlcnNWaWV3LmJpbmRUbyhtZWRpYXRvcik7XG5Vc2VyRWRpdE1vZGFsLmJpbmRUbyhtZWRpYXRvcik7XG5Tb2NrZXQuYmluZFRvKG1lZGlhdG9yKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKG1lZGlhdG9yRWxlbSkge1xuICAgIHRoaXMubWVkaWF0b3IgPSBtZWRpYXRvckVsZW07XG4gIH1cblxuICBsaXN0ZW5FdmVudChldmVudFR5cGUsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgY2JXcmFwcGVyID0gZXZlbnQgPT4gY2FsbGJhY2soZXZlbnQuZGV0YWlsKTtcbiAgICB0aGlzLm1lZGlhdG9yLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBjYldyYXBwZXIpO1xuICB9XG5cbiAgdHJpZ2dlcihldmVudFR5cGUsIGRhdGEpIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChldmVudFR5cGUsIHsgZGV0YWlsOiBkYXRhIH0pO1xuICAgIHRoaXMubWVkaWF0b3IuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cblxuICBzdGF0aWMgYmluZFRvKHNlbGVjdG9yKSB7XG4gICAgbGV0IGVsZW1lbnQgPSBzZWxlY3RvcjtcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgfVxuXG4gICAgaWYgKCEoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEb2N1bWVudCB8fCBlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICB0aHJvdyBFcnJvcignTm90IGEgdmFsaWQgc2VsZWN0b3IgLyBodG1sRWxlbWVudCcpO1xuICAgIH1cblxuICAgIChuZXcgdGhpcyhlbGVtZW50KSkuaW5pdCgpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgaW5pdCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgYmUgZGVmaW5lZCcpO1xuICB9XG59XG4iLCJpbXBvcnQgTW9kdWxlIGZyb20gJy4vbW9kdWxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29ja2V0IGV4dGVuZHMgTW9kdWxlIHtcbiAgaGFuZGxlTWVzc2FnZShldmVudCkge1xuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgIGNvbnN0IGN1c3RvbUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGRhdGEuYWN0aW9uLCB7IGRldGFpbDogZGF0YSB9KTtcbiAgICBpZiAoIWRhdGEuYWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubWVkaWF0b3IuZGlzcGF0Y2hFdmVudChjdXN0b21FdmVudCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnN0IHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoJ3dzOi8vdW1zLWhvbmV5YmFkZ2VyLmhlcm9rdWFwcC5jb20vdW1zJyk7XG4gICAgc29ja2V0Lm9ubWVzc2FnZSA9IHRoaXMuaGFuZGxlTWVzc2FnZS5iaW5kKHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQgTW9kdWxlIGZyb20gJy4vbW9kdWxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZSBleHRlbmRzIE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKG1lZGlhdG9yRWxlbSkge1xuICAgIHN1cGVyKG1lZGlhdG9yRWxlbSk7XG4gICAgdGhpcy5ncm91cHMgPSBbXTtcbiAgICB0aGlzLnVzZXJzID0gW107XG4gICAgdGhpcy5hY3RpdmVHcm91cElkID0gbnVsbDtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5saXN0ZW5FdmVudCgnZ3JvdXA6dXBkYXRlZCcsIHRoaXMudXBkYXRlR3JvdXAuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5saXN0ZW5FdmVudCgnZ3JvdXA6cmVtb3ZlZCcsIHRoaXMucmVtb3ZlR3JvdXAuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5saXN0ZW5FdmVudCgndXNlcjp1cGRhdGVkJywgdGhpcy51cGRhdGVVc2VyLmJpbmQodGhpcykpO1xuICAgIHRoaXMubGlzdGVuRXZlbnQoJ3VzZXI6cmVtb3ZlZCcsIHRoaXMucmVtb3ZlVXNlci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmxpc3RlbkV2ZW50KCdncm91cHM6c2VsZWN0JywgKGdyb3VwSWQpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZlR3JvdXBJZCA9IGdyb3VwSWQ7XG4gICAgICB0aGlzLnRyaWdnZXIoJ2dyb3VwczpyZW5kZXInLCB7XG4gICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgIHVzZXJzOiB0aGlzLnVzZXJzLFxuICAgICAgICBhY3RpdmVHcm91cElkOiB0aGlzLmFjdGl2ZUdyb3VwSWQsXG4gICAgICB9KTtcbiAgICAgIHRoaXMudHJpZ2dlcigndXNlcnM6cmVuZGVyJywgeyB1c2VyczogdGhpcy51c2VycywgZ3JvdXBJZCB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUdyb3VwKHsgaWQgfSkge1xuICAgIGNvbnN0IGZldGNoVXJsID0gYGh0dHBzOi8vdW1zLWhvbmV5YmFkZ2VyLmhlcm9rdWFwcC5jb20vZ3JvdXAvJHtpZH1gO1xuICAgIGZldGNoKGZldGNoVXJsLCB7IG1ldGhvZDogJ0dFVCcgfSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuZ3JvdXBzLnB1c2goZGF0YSk7XG4gICAgICAgIHRoaXMuZ3JvdXBzLnNvcnQoKGcxLCBnMikgPT4gZzEubmFtZSA+PSBnMi5uYW1lKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdncm91cHM6cmVuZGVyJywge1xuICAgICAgICAgIGdyb3VwczogdGhpcy5ncm91cHMsXG4gICAgICAgICAgdXNlcnM6IHRoaXMudXNlcnMsXG4gICAgICAgICAgYWN0aXZlR3JvdXBJZDogdGhpcy5hY3RpdmVHcm91cElkLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlR3JvdXAoeyBpZCB9KSB7XG4gICAgdGhpcy5ncm91cHMuZm9yRWFjaCgoZ3JvdXAsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoZ3JvdXAuZ3JvdXBfaWQgPT09IGlkKSB7XG4gICAgICAgIHRoaXMuZ3JvdXBzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy50cmlnZ2VyKCdncm91cHM6cmVuZGVyJywge1xuICAgICAgZ3JvdXBzOiB0aGlzLmdyb3VwcyxcbiAgICAgIHVzZXJzOiB0aGlzLnVzZXJzLFxuICAgICAgYWN0aXZlR3JvdXBJZDogdGhpcy5hY3RpdmVHcm91cElkLFxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlVXNlcih7IGlkIH0pIHtcbiAgICBmZXRjaChgaHR0cHM6Ly91bXMtaG9uZXliYWRnZXIuaGVyb2t1YXBwLmNvbS91c2VyLyR7aWR9YCwgeyBtZXRob2Q6ICdHRVQnIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnVzZXJzLnB1c2goZGF0YSk7XG4gICAgICAgIHRoaXMudHJpZ2dlcignZ3JvdXBzOnJlbmRlcicsIHtcbiAgICAgICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLFxuICAgICAgICAgIHVzZXJzOiB0aGlzLnVzZXJzLFxuICAgICAgICAgIGFjdGl2ZUdyb3VwSWQ6IHRoaXMuYWN0aXZlR3JvdXBJZCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudHJpZ2dlcigndXNlcnM6cmVuZGVyJywgeyB1c2VyczogdGhpcy51c2VycywgZ3JvdXBJZDogdGhpcy5hY3RpdmVHcm91cElkIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICByZW1vdmVVc2VyKHsgaWQgfSkge1xuICAgIHRoaXMudXNlcnMuZm9yRWFjaCgodXNlciwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh1c2VyLnVzZXJfaWQgPT09IGlkKSB7XG4gICAgICAgIHRoaXMudXNlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnRyaWdnZXIoJ2dyb3VwczpyZW5kZXInLCB7XG4gICAgICBncm91cHM6IHRoaXMuZ3JvdXBzLFxuICAgICAgdXNlcnM6IHRoaXMudXNlcnMsXG4gICAgICBhY3RpdmVHcm91cElkOiB0aGlzLmFjdGl2ZUdyb3VwSWQsXG4gICAgfSk7XG4gICAgdGhpcy50cmlnZ2VyKCd1c2VyczpyZW5kZXInLCB7IHVzZXJzOiB0aGlzLnVzZXJzLCBncm91cElkOiB0aGlzLmFjdGl2ZUdyb3VwSWQgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBNb2R1bGUgZnJvbSAnLi9tb2R1bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyRWRpdE1vZGFsIGV4dGVuZHMgTW9kdWxlIHtcbiAgY29uc3RydWN0b3IobWVkaWF0b3JFbGVtKSB7XG4gICAgc3VwZXIobWVkaWF0b3JFbGVtKTtcbiAgICB0aGlzLm1vZGFsQWRkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsQWRkJyk7XG4gICAgdGhpcy5hZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2xpZGUtb3V0IC5tb2RhbC10cmlnZ2VyJyk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMubGlzdGVuRXZlbnQoJ3VzZXI6ZWRpdCcsIHRoaXMuc2V0Vmlldy5iaW5kKHRoaXMpKTtcbiAgICAvLyB0aGlzLmFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2V0Vmlldy5iaW5kKHRoaXMpKTtcblxuICAgIGNvbnN0IGFkZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsQWRkJyk7XG4gICAgTS5Nb2RhbC5pbml0KGFkZE1vZGFsLCB7fSk7XG4gIH1cblxuICBzZXRWaWV3KCkge1xuICAgIHRoaXMubW9kYWxBZGRDb250YWluZXIuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgPGg0PkFkZCBuZXcgbWVtYmVyPC9oND5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgIDxmb3JtIGNsYXNzPVwiY29sIHMxMlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZmlyc3RfbmFtZVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZmlyc3RfbmFtZVwiPkZpcnN0IE5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwibGFzdF9uYW1lXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJsYXN0X25hbWVcIj5MYXN0IE5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwic3RyZWV0XCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJzdHJlZXRcIj5TdHJlZXQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJ6aXBfY29kZVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiemlwX2NvZGVcIj5aaXAgY29kZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaXR5XCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaXR5XCI+Q2l0eTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJwaG9uZVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGhvbmVcIj5QaG9uZSBudW1iZXI8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBpZD1cIm1vZGFsLWdyb3Vwcy1zZWxlY3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZCBzZWxlY3RlZD5DaG9vc2UgZ3JvdXA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxXCI+QWRtaW5pc3RyYXRvcjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjJcIj5NZXJjaGFudDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjNcIj5PcGVyYXRvcjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjRcIj5DbGllbnQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Hcm91cDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicmFuZ2VfY3JlZGl0XCI+Q3JlZGl0PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInJhbmdlX2NyZWRpdFwiIHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIxMDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICA8YSBpZD1cIm1vZGFsLWNsb3NlXCIgaHJlZj1cIiMhXCIgY2xhc3M9XCJtb2RhbC1hY3Rpb24gbW9kYWwtY2xvc2Ugd2F2ZXMtZWZmZWN0IHdhdmVzLWdyZWVuIGJ0bi1mbGF0XCI+Q2xvc2U8L2E+XG4gICAgICAgICAgPGEgaWQ9XCJtb2RhbC1jcmVhdGVcIiBocmVmPVwiIyFcIiBjbGFzcz1cIm1vZGFsLWFjdGlvbiBtb2RhbC1jbG9zZSB3YXZlcy1lZmZlY3Qgd2F2ZXMtZ3JlZW4gYnRuLWZsYXRcIj5DcmVhdGU8L2E+XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgTS5Nb2RhbC5pbml0KHRoaXMubW9kYWxBZGRDb250YWluZXIsIHt9KTtcbiAgfVxufVxuIiwiaW1wb3J0IE1vZHVsZSBmcm9tICcuL21vZHVsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJzVmlldyBleHRlbmRzIE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKG1lZGlhdG9yRWxlbSkge1xuICAgIHN1cGVyKG1lZGlhdG9yRWxlbSk7XG4gICAgdGhpcy51c2Vyc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2Vycy10YWJsZSB0YWJsZSB0Ym9keScpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmxpc3RlbkV2ZW50KCd1c2VyczpyZW5kZXInLCB0aGlzLnJlbmRlclVzZXJzLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcmVuZGVyVXNlcnMoeyB1c2VycywgZ3JvdXBJZCB9KSB7XG4gICAgdXNlcnMgPSB1c2Vycy5maWx0ZXIodXNlciA9PiB1c2VyLmdyb3VwX2lkID09PSBncm91cElkKTtcblxuICAgIHRoaXMudXNlcnNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgdXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgdHIuaW5uZXJIVE1MID0gYDx0ZD4ke3VzZXIubmFtZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkPiR7dXNlci5zdHJlZXR9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZD4ke3VzZXIuemlwX2NvZGV9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZD4ke3VzZXIuY2l0eX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkPiR7dXNlci5waG9uZX08L3RkPmA7XG4gICAgICB0aGlzLnVzZXJzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRyKTtcbiAgICB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==