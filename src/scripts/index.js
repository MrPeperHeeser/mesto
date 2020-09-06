import '../pages/index.css';

import Card from "./components/Card.js";
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import {FormValidator} from "./components/FormValidator.js";
import Section from './components/Section.js';
import {
  initialCards,
  validationParams,
  userNameInput,
  jobInput,
  openEditProfilePopupButton,
  openAddPhotoPopupButton,
  editProfileForm,
  addPhotoForm,
  elementsList,
  elementsListSelector,
  CARD_ELEMENT_TEMPLATE_NAME
} from "./utils/constants.js";
import UserInfo from "./components/UserInfo";

function openEditProfilePopupForm() {
    const userInfo = new UserInfo({userNameSelector: '.profile__username-text', userDescriptionSelector: '.profile__description'});
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
        const cardName = popup.getInputValueByClass('popup__form-input_name-field');
        const cardLink = popup.getInputValueByClass('popup__form-input_link-field');
        const card = new Card(
          cardName,
          cardLink,
          CARD_ELEMENT_TEMPLATE_NAME,
          () => {
            const imagePopup = new PopupWithImage('.popup_open-photo');
            imagePopup.open({src: cardLink, name: cardName});
          }
        );
        elementsList.prepend(card.generateCard());
        popup.close();
      }
    );
    popup.open();

    const formValidator = new FormValidator(validationParams, addPhotoForm);
    formValidator.resetValidation();
}



function fillCardsList() {

  initialCards.forEach((card) => {
    const cardItem = new Card(
      card.name,
      card.link,
      CARD_ELEMENT_TEMPLATE_NAME,
      () => {
        const popup = new PopupWithImage('.popup_open-photo');
        popup.open({src: card.link, name: card.name});
      }
    );
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

window.addEventListener('load', init);