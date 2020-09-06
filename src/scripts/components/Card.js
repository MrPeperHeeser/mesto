import {
  elementsElementSelector,
  elementLikeButtonSelector,
  elementLikedButtonClass,
  elementImageSelector,
  elementTextSelector,
  elementRemoveButtonSelecctor
} from '../utils/constants.js';

export default class Card {

  constructor(data, selector, handleCardClick) {
    this._selector = selector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
    return document
      .querySelector(this._selector)
      .content
      .querySelector(elementsElementSelector)
      .cloneNode(true);
  };

  _toggleLikeButton = (e) => {
    e.target.classList.toggle(elementLikedButtonClass);
  };

  _removeCardsListElement = (e) => {
    e.target.parentElement.remove();
  };

  _setEventListeners = () => {
    const img = this._element.querySelector(elementImageSelector);
    const likeButton = this._element.querySelector(elementLikeButtonSelector);
    const removeCardButton = this._element.querySelector(elementRemoveButtonSelecctor);

    likeButton.addEventListener('click', (e) => this._toggleLikeButton(e));
    img.addEventListener('click', this._handleCardClick);
    removeCardButton.addEventListener('click', (e) => this._removeCardsListElement(e));
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const img = this._element.querySelector(elementImageSelector);
    const title = this._element.querySelector(elementTextSelector);

    img.src = this._link;
    img.alt = this._name;
    title.textContent = this._name;

    return this._element;
  }

}