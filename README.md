# User Management System

We are creating Single Page Application - a user management module. And we need to do only two features: adding and removing the user. But it is necessary to use the module and mediator patterns.

HTML template is available [here](https://github.com/defint/dmistyles)

## Web application specification.

After loading the page, you should establish a connection via WebSocket at ws: **//ums-honeybadger.herokuapp.com/ums**

Through this web socket you will receive notifications in the following formats:

* W1 {action: 'user: updated', id: '12345'} - the user with the passed id appeared on the system.
* W2 {action: 'group: updated', id: '12345'} - a group with the transmitted id appeared in the system.
* W3 {action: 'user: removed', id: '12345'} - the user with id has been deleted.
* W4 {action: 'group: removed', id: '12345'} - the group with the given id has been deleted.

Upon receipt of the corresponding message via websocket, it is necessary to request detailed information about the entity via HTTP and display it in the corresponding component.

#### To get detailed information about entities:
* R1 send a GET request to the server at https://ums-honeybadger.herokuapp.com/{entity_type►/{id}, where: {entity_type} can be either group or user, depending on the entity, detailed information about which you want to get, {id} is an entity identifier. Answer by user request: {user_id: 21324214, group_id: 21324214, name: 'Chang Dejesus', street:' 8874 Place ', zip_code:' 7463527 ', city:' Munjor ', phone:' +32 (818) 643- 6736 '}. Response when requesting a group: {group_id: 21324214, name: 'Merchants', is_admin: true}.
* R2 To modify a user, send a PUT request to the server at https://user-management-system.honeybadger.com.ua/user/{id}, in response you will receive the result of the following form: {user_id: 21324214, group_id: 21324214, name: 'Chang Dejesus', street: '8874 Place', zip_code: '7463527', city: 'Munjor', phone: '+32 (818) 643-6736'}. If the http response is other than 200 (OK), display the chip with an error.
* R3 To create a new user, send a POST request to the server at https://user-management-system.honeybadger.com.ua/user, in response you will receive the result of the following form: {user_id: 21324214, group_id: 21324214, name : 'Chang Dejesus', street: '8874 Place', zip_code: '7463527', city: 'Munjor', phone: '+32 (818) 643-6736', credits: 100}. If the http response is other than 201 (Created), display the chip with an error.
* Users of groups with administrator privileges whose group whose field is_admin: true are not allowed to update credits. In the modal window for creating / editing a user, this slider is disabled.
* Users of groups without administrator privileges for groups whose field is_admin: false can update the credits field. If the user has trust Kerdits 0, then it becomes non-editable (all fields of the editing form are disabled).
* To find out which user received the number of credits, it is necessary to request information about the user after creation, the server will generate the number of credits of the user when it is created.

There is no possibility to modify or create groups.


## How to run?
#### Using electron:
    npm run-script electron

#### Using browser:
    1. npm start
    2. open src/index.html
   
