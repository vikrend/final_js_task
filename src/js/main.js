import GroupsView from './view/groups_view';
import UsersView from './view/users_view';
import Storage from './storage';
import EditUserModal from './view/edit_user_modal';
import NewUserModal from './view/new_user_modal';
import Network from './network';

const mediator = document;

GroupsView.bindTo(mediator);
UsersView.bindTo(mediator);
EditUserModal.bindTo(mediator);
NewUserModal.bindTo(mediator);
Storage.bindTo(mediator);
Network.bindTo(mediator);
