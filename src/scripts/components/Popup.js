import {
  popupOpenClass,
  popupOpenSelector,
  popupCloseButtonSelector,
  popupCloseButtonClass,
  popupContainerSelectors
} from '../utils/constants.js';

export default class Popup {

  constructor(popupSelector) {
    this._container = document.querySelector(popupSelector);
    this._closeButtonElement = this._container.querySelector(popupCloseButtonSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOnOutsideClick = this._handleOnOutsideClick.bind(this);
    this.close = this.close.bind(this);
  }

  _handleOnOutsideClick(e) {
    const el = e.target;
    if (el.classList.contains(popupCloseButtonClass)) {
      return;
    }

    const openedPopup = document.querySelector(popupOpenSelector);
    if (!openedPopup) {
      return;
    }
    let isInside = false;
    popupContainerSelectors.forEach((popupSelector) => {
      const container = openedPopup.querySelector(popupSelector);
      if (container && container.contains(el)) {
        isInside = true;
      }
    });
    if (!isInside) {
      this.close();
    }
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._container.addEventListener('click', this._handleOnOutsideClick);
    this._closeButtonElement.addEventListener('click', this.close);
  }

  open() {
    if (!this._container.classList.contains(popupOpenClass)) {
      this.setEventListeners();
      this._container.classList.add(popupOpenClass);
    }
  }

  close() {
    if (this._container.classList.contains(popupOpenClass)) {
      this._container.removeEventListener('click', this._handleOnOutsideClick);
      document.removeEventListener('keydown', this._handleEscClose);
      this._closeButtonElement.removeEventListener('click', this.close);

      this._container.classList.remove(popupOpenClass);
    }
  }

}