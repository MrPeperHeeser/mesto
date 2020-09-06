import './index.css';

import Card from "../scripts/components/Card.js";
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import FormValidator from "../scripts/components/FormValidator.js";
import Section from '../scripts/components/Section.js';
import UserInfo from "../scripts/components/UserInfo";
import {
  initialCards,
  validationParams,
  userNameInput,
  jobInput,
  openEditProfilePopupButton,
  openAddPhotoPopupButton,
  editProfileForm,
  addPhotoForm,
  elementsListSelector,
  CARD_ELEMENT_TEMPLATE_NAME
} from "../scripts/utils/constants.js";

const cardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        CARD_ELEMENT_TEMPLATE_NAME,
        () => {
          const popup = new PopupWithImage('.popup_open-photo');
          popup.open({src: item.link, name: item.name});
        }
      );
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement, false);
    }
  },
  elementsListSelector
);

const userInfo = new UserInfo({userNameSelector: '.profile__username-text', userDescriptionSelector: '.profile__description'});

function openEditProfilePopupForm() {
  const popup = new PopupWithForm(
    '.popup_edit-profile',
    (e) => {
      e.preventDefault();
      userInfo.setUserInfo({
        userName: userNameInput.value,
        userDescription: jobInput.value
      });
      popup.close();
    }
  );
  const {userName, userDescription} = userInfo.getUserInfo();
  userNameInput.value = userName;
  jobInput.value = userDescription;
  popup.open();

  const formValidator = new FormValidator(validationParams, editProfileForm);
  formValidator.resetValidation();
}

function openAddPhotoPopupForm() {
  const popup = new PopupWithForm(
    '.popup_add-photo',
    (e) => {
      e.preventDefault();
      const name = popup.getInputValueByClass('popup__form-input_name-field');
      const link = popup.getInputValueByClass('popup__form-input_link-field');
      const card = new Card(
        {
          name: name,
          link: link
        },
        CARD_ELEMENT_TEMPLATE_NAME,
        () => {
          const popup = new PopupWithImage('.popup_open-photo');
          popup.open({src: link, name: name});
        }
      );
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement, true);
      popup.close();
    }
  );
  popup.open();

  const formValidator = new FormValidator(validationParams, addPhotoForm);
  formValidator.resetValidation();
}

function fillCardsList() {
  cardsList.renderItems();
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

window.addEventListener('load', init);