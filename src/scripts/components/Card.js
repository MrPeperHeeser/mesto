import {
  elementsElementSelector,
  elementLikeButtonSelector,
  elementLikedButtonClass,
  elementImageSelector,
  elementTextSelector,
  elementRemoveButtonSelector,
  elementLikesCountSelector,
  elementRemoveButtonActiveClass,
  cardElementIdPrefix
} from '../utils/constants.js';

export default class Card {

  constructor({data, selector, handleCardClick, handleDeleteClick, handleLikeClick}) {
    this._selector = selector;
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate = () => {
    return document
      .querySelector(this._selector)
      .content
      .querySelector(elementsElementSelector)
      .cloneNode(true);
  };

  _initChildElements = () => {
    this._imgElement = this._element.querySelector(elementImageSelector);
    this._titleElement = this._element.querySelector(elementTextSelector);
    this._likesCountElement = this._element.querySelector(elementLikesCountSelector);
    this._removeCardButtonElement = this._element.querySelector(elementRemoveButtonSelector);
    this._likeButtonElement = this._element.querySelector(elementLikeButtonSelector);
  };

  _setIsLiked = () => {
    this._element.querySelector(elementLikeButtonSelector).classList.add(elementLikedButtonClass);
  };

  _unsetIsLiked = () => {
    this._element.querySelector(elementLikeButtonSelector).classList.remove(elementLikedButtonClass);
  };

  _setEventListeners = () => {
    this._likeButtonElement.addEventListener('click', this._handleLikeClick);
    this._imgElement.addEventListener('click', this._handleCardClick);
    this._removeCardButtonElement.addEventListener('click', this._handleDeleteClick);
  };

  isAlreadyLikedByUser(userId) {
    const userLike = this._data.likes.filter((like) => like._id === userId);
    return !!userLike[0];
  }

  updateLikes(currentUserId) {
    if (this.isAlreadyLikedByUser(currentUserId)) {
      this._setIsLiked();
    } else {
      this._unsetIsLiked();
    }

    ({length: this._likesCountElement.textContent} = this._data.likes);
  }

  setData(data) {
    if (data) {
      this._data = data;
    }
  }

  renderElement(currentUserId) {
    if (currentUserId === this._data.owner._id) {
      this._removeCardButtonElement.classList.add(elementRemoveButtonActiveClass);
    }
    this.updateLikes(currentUserId);
    this._imgElement.src = this._data.link;
    this._imgElement.alt = this._data.name;
    this._titleElement.textContent = this._data.name;
    this._element.id = cardElementIdPrefix + this._data._id;
  }

  generateCard(currentUserId) {
    this._element = this._getTemplate();
    this._initChildElements();
    this._setEventListeners();
    this.renderElement(currentUserId);
    return this._element;
  }

}