import Module from './module';

export default class Socket extends Module {
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
