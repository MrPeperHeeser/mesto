import {togglePopup} from './utils.js';

export const openPhotoPopup = document.querySelector('.popup_open-photo');

const imagePopupText = document.querySelector('.popup__image-text');
const popupImage = document.querySelector('.popup__image');

export class Card {

  constructor(name, link, selector) {
    this._selector = selector;
    this._name = name;
    this._link = link;
  }

  _getTemplate = () => {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
  }

  _toggleLikeButton = (e) => {
    e.target.classList.toggle('elements__like-btn_liked');
  };

  _removeCardsListElement = (e) => {
    e.target.parentElement.remove();
  };

  _toggleOpenPhotoPopup = (e) => {
    const el = e.target;
    togglePopup(openPhotoPopup);
    popupImage.src = el.src;
    imagePopupText.textContent = el.alt;
  }

  _setEventListeners = () => {
    const img = this._element.querySelector('.elements__element-img');
    const likeButton = this._element.querySelector('.elements__like-btn');
    const removeCardButton = this._element.querySelector('.elements__remove-btn');

    likeButton.addEventListener('click', (e) => this._toggleLikeButton(e));
    img.addEventListener('click', (e) => this._toggleOpenPhotoPopup(e));
    removeCardButton.addEventListener('click', (e) => this._removeCardsListElement(e));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const img = this._element.querySelector('.elements__element-img');
    const title = this._element.querySelector('.elements__text');

    img.src = this._link;
    img.alt = this._name;
    title.textContent = this._name;

    return this._element;
  }

}