export default class Card {

  constructor(name, link, selector, handleCardClick) {
    this._selector = selector;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
  };

  _toggleLikeButton = (e) => {
    e.target.classList.toggle('elements__like-btn_liked');
  };

  _removeCardsListElement = (e) => {
    e.target.parentElement.remove();
  };

  _setEventListeners = () => {
    const img = this._element.querySelector('.elements__element-img');
    const likeButton = this._element.querySelector('.elements__like-btn');
    const removeCardButton = this._element.querySelector('.elements__remove-btn');

    likeButton.addEventListener('click', (e) => this._toggleLikeButton(e));
    img.addEventListener('click', this._handleCardClick);
    removeCardButton.addEventListener('click', (e) => this._removeCardsListElement(e));
  };

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