import Socket from './socket_events';
import GroupsView from './groups_view';
import UsersView from './users_view';
import Storage from './storage';
import UserEditModal from './user_edit';

const mediator = document;

Storage.bindTo(mediator);
GroupsView.bindTo(mediator);
UsersView.bindTo(mediator);
UserEditModal.bindTo(mediator);
Socket.bindTo(mediator);
