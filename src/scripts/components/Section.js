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

  renderItems() {
    const childLis = Array.from(this._container.getElementsByTagName('li'));
    childLis.forEach(
      (li) => {
        this._container.removeChild(li)
      });
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}

