export const validationParams = {
  formInputErrorClass: 'popup__form-input_error',
  formInputErrorActiveClass: 'popup__form-input-error_active',
  formButtonInactiveClass: 'popup__form-btn_inactive',
  formButtonClass: 'popup__form-btn',
  formInputClass: 'popup__form-input',
  formClass: 'popup__form'
};

export const popupSubmitButtonSelector = '.popup__form-btn';

export const imagePopupTextContainer = document.querySelector('.popup__image-text');
export const popupImageContainer = document.querySelector('.popup__image');

export const userNameInputContainer = document.querySelector('.popup__form-input_username-field');
export const jobInputContainer = document.querySelector('.popup__form-input_description-field');
export const profileAvatarContainer = document.querySelector('.profile__avatar');

export const openEditProfilePopupButton = document.querySelector('.profile__edit-button');
export const openAddPhotoPopupButton = document.querySelector('.profile__add-button');

export const editProfileFormContainer = document.querySelector('.popup__form_edit-profile');
export const editProfileAvatarFormContainer = document.querySelector('.popup__form_edit-avatar');
export const addPhotoFormContainer = document.querySelector('.popup__form_add-photo');

export const elementsListSelector = '.elements__list';
export const elementsElementSelector = '.elements__element';
export const elementLikeButtonSelector = '.elements__like-btn';
export const elementLikedButtonClass = 'elements__like-btn_liked';
export const elementRemoveButtonSelector = '.elements__remove-btn';
export const elementRemoveButtonActiveClass = 'elements__remove-btn_active';
export const elementImageSelector = '.elements__element-img';
export const elementTextSelector = '.elements__text';
export const elementLikesCountSelector = '.elements__like-count';

export const cardElementIdPrefix = 'CardID';

export const CARD_ELEMENT_TEMPLATE_NAME = '#card';

export const popupOpenClass = 'popup_open';
export const popupCloseButtonSelector = '.popup__close-button';

export const urlParts = {
  cards: '/cards',
  likes: '/likes',
  userInfo: '/users/me',
  avatar: '/avatar'
};