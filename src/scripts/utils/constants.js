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

export const elementsListSelector = '.elements__list';
export const elementsElementSelector = '.elements__element';
export const elementLikeButtonSelector = '.elements__like-btn';
export const elementLikedButtonClass = 'elements__like-btn_liked';
export const elementRemoveButtonSelecctor = '.elements__remove-btn';
export const elementImageSelector = '.elements__element-img';
export const elementTextSelector = '.elements__text';

export const CARD_ELEMENT_TEMPLATE_NAME = '#card';

export const popupOpenClass = 'popup_open';
export const popupOpenSelector = '.popup_open';
export const popupCloseButtonSelector = '.popup__close-button';
export const popupCloseButtonClass = 'popup__close-button';
export const popupContainerSelector = '.popup__container';
export const popupImageContainerSelector = '.popup__image-container';
