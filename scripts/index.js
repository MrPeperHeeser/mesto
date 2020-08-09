const openEditProfilePopupButton = document.querySelector('.profile__edit-button');
const openAddPhotoPopupButton = document.querySelector('.profile__add-button');
const editProfileClosePopupButton = document.querySelector('.popup__close-button_edit-profile');
const addPhotoClosePopupButton = document.querySelector('.popup__close-button_add-photo');
const openPhotoClosePopupButton = document.querySelector('.popup__close-button_open-photo');

const userNameInput = document.querySelector('.popup__form-input_username-field');
const jobInput = document.querySelector('.popup__form-input_description-field');

const nameInput = document.querySelector('.popup__form-input_name-field');
const linkInput = document.querySelector('.popup__form-input_link-field');

const imagePopupText = document.querySelector('.popup__image-text');

const profileUsername = document.querySelector('.profile__username-text');
const profileDescription = document.querySelector('.profile__description');

const editProfilePopup = document.querySelector('.popup_edit-profile');
const addPhotoPopup = document.querySelector('.popup_add-photo');
const openPhotoPopup = document.querySelector('.popup_open-photo');

const popupImage = document.querySelector('.popup__image');

const editProfileForm = document.querySelector('.popup__form_edit-profile');
const addPhotoForm = document.querySelector('.popup__form_add-photo');

const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card').content;

function createCardsListElement(cardName, cardLink) {
    const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
    const img = cardElement.querySelector('.elements__element-img');
    const title = cardElement.querySelector('.elements__text');
    const likeButton = cardElement.querySelector('.elements__like-btn');
    const removeCardButton = cardElement.querySelector('.elements__remove-btn');

    likeButton.addEventListener('click', (e) => toggleLikeButton(e));
    img.addEventListener('click', (e) => toggleOpenPhotoPopup(e));
    removeCardButton.addEventListener('click', (e) => removeCardsListElement(e));

    img.src = cardLink;
    img.alt = cardName;
    title.textContent = cardName;

    return cardElement;
}

function fillCardsList() {
    initialCards.forEach((card) => {
        const cardElement = createCardsListElement(card.name, card.link);
        elementsList.append(cardElement);
    });
}

function closePopupOnOutsideClick(e) {
  const popup = e.target;
  const popupContainer = popup.querySelector('.popup__container');
  const popupImageContainer = popup.querySelector('.popup__image-container');
  const isInside = popupContainer ? popupContainer.contains(e.target) : popupImageContainer.contains(e.target);
  if (!isInside) {
    popup.classList.remove('popup_open');
    popup.removeEventListener('click', closePopupOnOutsideClick);
  }
}

function closePopupOnEscClick(e) {
  const popup = document.querySelector('.popup_open');
  if (e.key === 'Escape') {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', closePopupOnEscClick);
  }
}

function togglePopup(el) {
    el.classList.toggle('popup_open');
    if (el.classList.contains('popup_open')) {
      el.addEventListener('click', closePopupOnOutsideClick);
      document.addEventListener('keydown', closePopupOnEscClick);
    }
}

function toggleOpenPhotoPopup(e) {
    const el = e.target;
    togglePopup(openPhotoPopup);
    popupImage.src = el.src;
    imagePopupText.textContent = el.alt;
}

function toggleLikeButton(e) {
    e.target.classList.toggle('elements__like-btn_liked');
}

function removeCardsListElement(e) {
    e.target.parentElement.remove();
}

function openEditProfilePopupForm() {
    togglePopup(editProfilePopup);
    if (editProfilePopup.classList.contains('popup_open')) {
        userNameInput.value = profileUsername.textContent;
        jobInput.value = profileDescription.textContent;
    }
}

function openAddPhotoPopupForm() {
    togglePopup(addPhotoPopup);

    nameInput.value = '';
    linkInput.value = '';
}

function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();

    profileUsername.textContent = userNameInput.value;
    profileDescription.textContent = jobInput.value;
    togglePopup(editProfilePopup);
}

function addPhotoFormSubmitHandler(evt) {
    evt.preventDefault();

    const cardElement = createCardsListElement(nameInput.value, linkInput.value);
    elementsList.prepend(cardElement);

    togglePopup(addPhotoPopup);
}

openEditProfilePopupButton.addEventListener('click', openEditProfilePopupForm);
openAddPhotoPopupButton.addEventListener('click', openAddPhotoPopupForm);
editProfileClosePopupButton.addEventListener('click', () => togglePopup(editProfilePopup));
addPhotoClosePopupButton.addEventListener('click', () => togglePopup(addPhotoPopup));
openPhotoClosePopupButton.addEventListener('click', () => togglePopup(openPhotoPopup));
editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
addPhotoForm.addEventListener('submit', addPhotoFormSubmitHandler);

window.addEventListener('load', fillCardsList);