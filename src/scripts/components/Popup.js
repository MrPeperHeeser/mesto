export default class Popup {

  constructor(popupSelector) {
    this._container = document.querySelector(popupSelector);
    this._closeButtonElement = this._container.querySelector('.popup__close-button');
  }

  _handleOnOutsideClick(e) {
    const el = e.target;
    if (el.classList.contains('popup__close-button')) {
      return;
    }

    const openedPopup = document.querySelector('.popup_open');
    if (!openedPopup) {
      return;
    }
    const popupContainer = openedPopup.querySelector('.popup__container');
    const popupImageContainer = openedPopup.querySelector('.popup__image-container');
    let isInside;
    if (popupContainer) {
      isInside = popupContainer.contains(el);
    } else if (popupImageContainer) {
      isInside = popupImageContainer.contains(el);
    } else {
      isInside = false;
    }
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
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._container.addEventListener('click', this._handleOnOutsideClick.bind(this));
    this._closeButtonElement.addEventListener('click', this.close.bind(this));
  }

  open() {
    if (!this._container.classList.contains('popup_open')) {
      this.setEventListeners();
      this._container.classList.toggle('popup_open');
    }
  }

  close() {
    if (this._container.classList.contains('popup_open')) {
      this._container.removeEventListener('click', this._handleOnOutsideClick);
      document.removeEventListener('keydown', this._handleEscClose);
      this._container.classList.toggle('popup_open');
    }
  }

}