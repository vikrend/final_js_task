export default class Module {
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
