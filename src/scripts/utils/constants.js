export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationParams = {
  formInputErrorClass: 'popup__form-input_error',
  formInputErrorActiveClass: 'popup__form-input-error_active',
  formButtonInactiveClass: 'popup__form-btn_inactive',
  formButtonClass: 'popup__form-btn',
  formInputClass: 'popup__form-input',
  formClass: 'popup__form'
};

export const imagePopupText = document.querySelector('.popup__image-text');
export const popupImage = document.querySelector('.popup__image');

export const userNameInput = document.querySelector('.popup__form-input_username-field');
export const jobInput = document.querySelector('.popup__form-input_description-field');

export const openEditProfilePopupButton = document.querySelector('.profile__edit-button');
export const openAddPhotoPopupButton = document.querySelector('.profile__add-button');

export const editProfileForm = document.querySelector('.popup__form_edit-profile');
export const addPhotoForm = document.querySelector('.popup__form_add-photo');

export const elementsList = document.querySelector('.elements__list');
export const elementsListSelector = '.elements__list';

export const CARD_ELEMENT_TEMPLATE_NAME = '#card';