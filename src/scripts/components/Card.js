import {
  elementsElementSelector,
  elementLikeButtonSelector,
  elementLikedButtonClass,
  elementImageSelector,
  elementTextSelector,
  elementRemoveButtonSelector,
  elementLikesCountSelector,
  elementRemoveButtonActiveClass
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

  _setIsLiked = () => {
    this._element.querySelector(elementLikeButtonSelector).classList.add(elementLikedButtonClass);
  };

  _unsetIsLiked = () => {
    this._element.querySelector(elementLikeButtonSelector).classList.remove(elementLikedButtonClass);
  };

  _setEventListeners = () => {
    const imgElement = this._element.querySelector(elementImageSelector);
    const likeButtonElement = this._element.querySelector(elementLikeButtonSelector);
    const removeCardButtonElement = this._element.querySelector(elementRemoveButtonSelector);

    likeButtonElement.addEventListener('click', this._handleLikeClick);
    imgElement.addEventListener('click', this._handleCardClick);
    removeCardButtonElement.addEventListener('click', this._handleDeleteClick);
  };

  isAlreadyLikedByUser(userId) {
    const userLike = this._data.likes.filter((like) => like._id === userId);
    return !!userLike[0];
  }

  setData(data) {
    if (data) {
      this._data = data;
    }
  }

  renderElement(currentUserId) {
    const imgElement = this._element.querySelector(elementImageSelector);
    const titleElement = this._element.querySelector(elementTextSelector);
    const likesCountElement = this._element.querySelector(elementLikesCountSelector);
    const removeCardButtonElement = this._element.querySelector(elementRemoveButtonSelector);

    if (currentUserId === this._data.owner._id) {
      removeCardButtonElement.classList.add(elementRemoveButtonActiveClass);
    }
    if (this.isAlreadyLikedByUser(currentUserId)) {
      this._setIsLiked();
    } else {
      this._unsetIsLiked();
    }

    ({length: likesCountElement.textContent} = this._data.likes);
    imgElement.src = this._data.link;
    imgElement.alt = this._data.name;
    titleElement.textContent = this._data.name;
  }

  generateCard(currentUserId) {
    this._element = this._getTemplate();
    this._setEventListeners();
    this.renderElement(currentUserId);
    return this._element;
  }

}