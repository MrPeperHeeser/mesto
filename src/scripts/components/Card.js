import {
  elementsElementSelector,
  elementLikeButtonSelector,
  elementLikedButtonClass,
  elementImageSelector,
  elementTextSelector,
  elementRemoveButtonSelecctor
} from '../utils/constants.js';

export default class Card {

  constructor({data, selector, handleCardClick, handleDeleteClick}) {
    this._selector = selector;
    this._name = data.name;
    this._link = data.link;
    this._likesCount = data.likes ? data.likes.length : 0;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._toggleLikeButton = this._toggleLikeButton.bind(this);
  }

  _getTemplate = () => {
    return document
      .querySelector(this._selector)
      .content
      .querySelector(elementsElementSelector)
      .cloneNode(true);
  };

  _toggleLikeButton = () => {
    this._element.querySelector(elementLikeButtonSelector).classList.toggle(elementLikedButtonClass);
  };

  _setIsLiked = () => {
    this._element.querySelector(elementLikeButtonSelector).classList.add(elementLikedButtonClass);
  };

  _setEventListeners = () => {
    const img = this._element.querySelector(elementImageSelector);
    const likeButton = this._element.querySelector(elementLikeButtonSelector);
    const removeCardButton = this._element.querySelector(elementRemoveButtonSelecctor);

    likeButton.addEventListener('click', this._toggleLikeButton);
    img.addEventListener('click', this._handleCardClick);
    removeCardButton.addEventListener('click', this._handleDeleteClick);
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const img = this._element.querySelector(elementImageSelector);
    const title = this._element.querySelector(elementTextSelector);
    const likesCountElement = this._element.querySelector('.elements__like-count');

    if (this._likesCount > 0) {
      this._setIsLiked();
    }

    likesCountElement.textContent = this._likesCount;
    img.src = this._link;
    img.alt = this._name;
    title.textContent = this._name;

    return this._element;
  }

}