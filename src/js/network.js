import Module from './module';

export default class Network extends Module {
  init() {
    this.listenEvent('network:fetchUser', Network.fetchUser);
    setInterval(Network.informOfflineStatus, 5000);
    this.initWebsocket();
  }

  initWebsocket() {
    this.socket = new WebSocket('ws://ums-honeybadger.herokuapp.com/ums');
    this.socket.onopen = () => {
      M.toast({ html: 'Connected to server', classes: 'green' });
    };
    this.socket.onclose = (event) => {
      const toast = M.toast({ html: 'Connection closed. Check console', classes: 'red' });
      toast.timeRemaining = Infinity;
      console.log(event);
      if (event.code !== 1000) {
        this.initWebsocket();
      }
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.action) {
        case ('group:updated'):
          this.updateGroup(data.id);
          break;
        case ('group:removed'):
          this.trigger('storage:group:remove', data.id);
          break;
        case ('user:updated'):
          this.updateUser(data.id);
          break;
        case ('user:removed'):
          this.trigger('storage:user:remove', data.id);
          break;
        default:
      }
    };
    this.socket.onerror = (event) => {
      const toast = M.toast({ html: 'WebSocket error. Check console', classes: 'red' });
      toast.timeRemaining = Infinity;
      console.log(event);
    };
  }

  static informOfflineStatus() {
    if (!navigator.onLine) {
      if (!this.offlineToast) {
        this.offlineToast = M.toast({ html: 'Offline', classes: 'red' });
        this.offlineToast.timeRemaining = Infinity;
      }
    } else if (this.offlineToast) {
      this.offlineToast.dismiss();
      this.offlineToast = null;
    }
  }

  static fetchUser(user) {
    const body = JSON.stringify(user);
    let method;
    let url;
    let responseCode;
    if (user.user_id) {
      method = 'PUT';
      url = `https://ums-honeybadger.herokuapp.com/user/${user.user_id}`;
      responseCode = 200;
    } else {
      method = 'POST';
      url = 'https://ums-honeybadger.herokuapp.com/user';
      responseCode = 201;
    }
    fetch(url, { body, method })
      .then((response) => {
        if (response.status !== responseCode) {
          M.toast({ html: `Error: ${response.statusText} (${response.status})`, classes: 'red' });
        }
        if (response.status === responseCode) {
          M.toast({ html: 'Success', classes: 'green' });
        }
      })
      .catch((err) => {
        console.log('Network:fetchUser: Error', err);
      });
  }

  updateGroup(id) {
    const url = `https://ums-honeybadger.herokuapp.com/group/${id}`;
    fetch(url, { method: 'GET' })
      .then(response => response.json())
      .then((group) => {
        this.trigger('storage:group:update', group);
      })
      .catch((err) => {
        console.log('Network:updateGroup: Error', err);
      });
  }

  updateUser(id) {
    const url = `https://ums-honeybadger.herokuapp.com/user/${id}`;
    fetch(url, { method: 'GET' })
      .then(response => response.json())
      .then((user) => {
        this.trigger('storage:user:update', user);
      })
      .catch((err) => {
        console.log('Network:updateUser: Error', err);
      });
  }
}
