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

const imagePopup = new PopupWithImage('.popup_open-photo');

const createCard = (item) => {
  return new Card(
    item,
    CARD_ELEMENT_TEMPLATE_NAME,
    () => {
      imagePopup.open({src: item.link, name: item.name});
    }
  );
};

const userInfo = new UserInfo({userNameSelector: '.profile__username-text', userDescriptionSelector: '.profile__description'});
const popupEditProfileForm = new PopupWithForm(
  '.popup_edit-profile',
  (e) => {
    e.preventDefault();
    userInfo.setUserInfo({
      userName: userNameInput.value,
      userDescription: jobInput.value
    });
    popupEditProfileForm.close();
  }
);

const popupAddPhotoForm = new PopupWithForm(
  '.popup_add-photo',
  (e) => {
    e.preventDefault();
    const item = {
      name: popupAddPhotoForm.getValueByInputTitle('name'),
      link: popupAddPhotoForm.getValueByInputTitle('link')
    };
    const card = createCard(item);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement, true);
    popupAddPhotoForm.close();
  }
);

const editProfileFormValidator = new FormValidator(validationParams, editProfileForm);
const addPhotoFormValidator = new FormValidator(validationParams, addPhotoForm);

const cardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement, false);
    }
  },
  elementsListSelector
);

function openEditProfilePopupForm() {
  const {userName, userDescription} = userInfo.getUserInfo();
  userNameInput.value = userName;
  jobInput.value = userDescription;
  popupEditProfileForm.open();

  editProfileFormValidator.resetValidation();
}

function openAddPhotoPopupForm() {
  popupAddPhotoForm.open();

  addPhotoFormValidator.resetValidation();
}

function fillCardsList() {
  cardsList.renderItems();
}

fillCardsList();
editProfileFormValidator.enableValidation();
addPhotoFormValidator.enableValidation();

openEditProfilePopupButton.addEventListener('click', openEditProfilePopupForm);
openAddPhotoPopupButton.addEventListener('click', openAddPhotoPopupForm);