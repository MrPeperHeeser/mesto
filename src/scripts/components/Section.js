export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, onFirstPosition) {
    if (onFirstPosition) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }

  removeElementById(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.remove();
    }
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}

