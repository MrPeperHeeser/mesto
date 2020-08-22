import {Card, openPhotoPopup} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {initialCards, validationParams} from "./cconstants.js";
import {togglePopup} from "./utils.js";

const openEditProfilePopupButton = document.querySelector('.profile__edit-button');
const openAddPhotoPopupButton = document.querySelector('.profile__add-button');
const editProfileClosePopupButton = document.querySelector('.popup__close-button_edit-profile');
const addPhotoClosePopupButton = document.querySelector('.popup__close-button_add-photo');
const openPhotoClosePopupButton = document.querySelector('.popup__close-button_open-photo');

const userNameInput = document.querySelector('.popup__form-input_username-field');
const jobInput = document.querySelector('.popup__form-input_description-field');

const nameInput = document.querySelector('.popup__form-input_name-field');
const linkInput = document.querySelector('.popup__form-input_link-field');

const profileUsername = document.querySelector('.profile__username-text');
const profileDescription = document.querySelector('.profile__description');

const editProfilePopup = document.querySelector('.popup_edit-profile');
const addPhotoPopup = document.querySelector('.popup_add-photo');

const editProfileForm = document.querySelector('.popup__form_edit-profile');
const addPhotoForm = document.querySelector('.popup__form_add-photo');

const elementsList = document.querySelector('.elements__list');

const _CARD_ELEMENT_TEMPLATE_NAME = '#card';

function openEditProfilePopupForm() {
    togglePopup(editProfilePopup);
    if (editProfilePopup.classList.contains('popup_open')) {
        userNameInput.value = profileUsername.textContent;
        jobInput.value = profileDescription.textContent;
    }

    const formValidator = new FormValidator(validationParams, editProfileForm);
    formValidator.resetValidation();
}

function openAddPhotoPopupForm() {
    togglePopup(addPhotoPopup);
    nameInput.value = '';
    linkInput.value = '';

    const formValidator = new FormValidator(validationParams, addPhotoForm);
    formValidator.resetValidation();
}

function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();

    profileUsername.textContent = userNameInput.value;
    profileDescription.textContent = jobInput.value;
    togglePopup(editProfilePopup);
}

function addPhotoFormSubmitHandler(evt) {
    evt.preventDefault();

    const card = new Card(nameInput.value, linkInput.value, _CARD_ELEMENT_TEMPLATE_NAME);
    elementsList.prepend(card.generateCard());

    togglePopup(addPhotoPopup);
}

function fillCardsList() {
  initialCards.forEach((card) => {
    const cardItem = new Card(card.name, card.link, _CARD_ELEMENT_TEMPLATE_NAME);
    elementsList.append(cardItem.generateCard());
  });
}

function enableValidations() {
  const formList = Array.from(document.querySelectorAll('.' + validationParams.formClass));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(validationParams, formElement);
    formValidator.enableValidation();
  });
}

function init() {
  fillCardsList();
  enableValidations();
}

openEditProfilePopupButton.addEventListener('click', openEditProfilePopupForm);
openAddPhotoPopupButton.addEventListener('click', openAddPhotoPopupForm);
editProfileClosePopupButton.addEventListener('click', () => togglePopup(editProfilePopup));
addPhotoClosePopupButton.addEventListener('click', () => togglePopup(addPhotoPopup));
openPhotoClosePopupButton.addEventListener('click', () => togglePopup(openPhotoPopup));
editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
addPhotoForm.addEventListener('submit', addPhotoFormSubmitHandler);

window.addEventListener('load', init);