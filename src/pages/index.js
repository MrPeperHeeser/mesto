import './index.css';

import Card from "../scripts/components/Card.js";
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import FormValidator from "../scripts/components/FormValidator.js";
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo';
import Api from '../scripts/components/Api.js';
import {
  validationParams,
  userNameInput,
  jobInput,
  openEditProfilePopupButton,
  openAddPhotoPopupButton,
  editProfileForm,
  addPhotoForm,
  elementsListSelector,
  popupSumbitButtonSelector,
  CARD_ELEMENT_TEMPLATE_NAME
} from "../scripts/utils/constants.js";

const api = new Api(
  {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
    headers: {
      authorization: '7b8cda84-c4a4-4b07-8b8b-e9e9b7230d9a',
      'Content-Type': 'application/json'
    }
  }
);

const imagePopup = new PopupWithImage('.popup_open-photo');

let cardsList;

const popupDeleteCardForm = new PopupWithForm(
  '.popup_delete-photo',
  popupSumbitButtonSelector,
  (e) => {
    e.preventDefault();
    popupDeleteCardForm.setWaiting();
    api.deleteCard({
      id: popupAddPhotoForm.getValueByInputTitle('id')
    })
  }
);

const createCard = (item) => {
  return new Card(
    {
      data: item,
      selector: CARD_ELEMENT_TEMPLATE_NAME,
      handleCardClick: () => {
        imagePopup.open({src: item.link, name: item.name});
      },
      handleDeleteClick: () => {

      }
    }
  );
};

const userInfo = new UserInfo(
  {
    userNameSelector: '.profile__username-text',
    userDescriptionSelector: '.profile__description',
    userAvatarSelector: '.profile__avatar'
  }
);
const popupEditProfileForm = new PopupWithForm(
  '.popup_edit-profile',
  popupSumbitButtonSelector,
  (e) => {
    e.preventDefault();
    popupEditProfileForm.setWaiting();
    api.updateUserInfo(
      {
        name: userNameInput.value,
        about: jobInput.value
      }
    )
      .then(
        (res) => {
          userInfo.setUserInfo({
            userName: res.name,
            userDescription: res.about
          });
        }
      )
      .catch(e => console.log(e))
      .finally(() => {
        popupEditProfileForm.close();
      });
  }
);

const popupAddPhotoForm = new PopupWithForm(
  '.popup_add-photo',
  popupSumbitButtonSelector,
  (e) => {
    e.preventDefault();
    popupAddPhotoForm.setWaiting();
    api.addNewCard(
      {
        name: popupAddPhotoForm.getValueByInputTitle('name'),
        link: popupAddPhotoForm.getValueByInputTitle('link')
      }
    )
      .then(
        (res) => {
          const card = createCard(res);
          const cardElement = card.generateCard();
          cardsList.addItem(cardElement, true);
        }
      )
      .catch(e => console.log())
      .finally(() => {
        popupAddPhotoForm.close();
      });
  }
);

const editProfileFormValidator = new FormValidator(validationParams, editProfileForm);
const addPhotoFormValidator = new FormValidator(validationParams, addPhotoForm);

api.getInitialCards().then(
  (res) => {
    cardsList = new Section(
      {
        data: res,
        renderer: (item) => {
          const card = createCard(item);
          const cardElement = card.generateCard();
          cardsList.addItem(cardElement, false);
        }
      },
      elementsListSelector
    );
    cardsList.renderItems();
  }
).catch(e => console.log(e));

api.getUserInfo().then(
  (res) => {
    userInfo.setUserInfo({
      userName: res.name,
      userDescription: res.about,
      avatarLink: res.avatar,
      id: res._id
    });
  }
).catch(e => console.log(e));

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

editProfileFormValidator.enableValidation();
addPhotoFormValidator.enableValidation();

openEditProfilePopupButton.addEventListener('click', openEditProfilePopupForm);
openAddPhotoPopupButton.addEventListener('click', openAddPhotoPopupForm);