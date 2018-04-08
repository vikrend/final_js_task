import GroupsView from './groups_view';
import UsersView from './users_view';
import Storage from './storage';
import EditUserModal from './edit_user_modal';
import NewUserModal from './new_user_modal';

const mediator = document;

GroupsView.bindTo(mediator);
UsersView.bindTo(mediator);
EditUserModal.bindTo(mediator);
NewUserModal.bindTo(mediator);
Storage.bindTo(mediator);
