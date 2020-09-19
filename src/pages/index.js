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
  userNameInputContainer,
  jobInputContainer,
  openEditProfilePopupButton,
  openAddPhotoPopupButton,
  editProfileFormContainer,
  editProfileAvatarFormContainer,
  addPhotoFormContainer,
  profileAvatarContainer,
  elementsListSelector,
  popupSubmitButtonSelector,
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

const popupDeleteCardForm = new PopupWithForm(
  '.popup_delete-photo',
  popupSubmitButtonSelector,
  (e) => {
    e.preventDefault();
    popupDeleteCardForm.setWaiting();
    api.deleteCard({
      id: popupDeleteCardForm.getInputByInputTitle('id').value
    })
      .then(
        () => {
          fetchCardItems();
        }
      )
      .catch(e => console.log(e))
      .finally(() => popupDeleteCardForm.close())
  }
);

const createCard = (item) => {
  const card = new Card(
    {
      data: item,
      selector: CARD_ELEMENT_TEMPLATE_NAME,
      handleCardClick: () => {
        imagePopup.open({src: item.link, name: item.name});
      },
      handleDeleteClick: () => {
        popupDeleteCardForm.getInputByInputTitle('id').value = item._id;
        popupDeleteCardForm.open();
      },
      handleLikeClick: () => {
        api.toggleLikeOnCard({
          cardId: item._id,
          needLike: !card.isAlreadyLikedByUser(userInfo.getUserId())
        })
          .then(
            (res) => {
              card.setData(res);
              card.renderElement(userInfo.getUserId())
            }
          )
          .catch(e => console.log(e))
      }
    }
  );
  return card;
};

function fetchCardItems() {
  api.getInitialCards().then(
    (res) => {
      const cardsList = new Section(
        {
          data: res,
          renderer: (item) => {
            const card = createCard(item);
            const cardElement = card.generateCard(userInfo.getUserId());
            cardsList.addItem(cardElement, false);
          }
        },
        elementsListSelector
      );
      cardsList.renderItems();
    }
  ).catch(e => console.log(e));
}

const userInfo = new UserInfo(
  {
    userNameSelector: '.profile__username-text',
    userDescriptionSelector: '.profile__description',
    userAvatarSelector: '.profile__avatar'
  }
);

const popupEditProfileForm = new PopupWithForm(
  '.popup_edit-profile',
  popupSubmitButtonSelector,
  (e) => {
    e.preventDefault();
    popupEditProfileForm.setWaiting();
    api.updateUserInfo(
      {
        name: userNameInputContainer.value,
        about: jobInputContainer.value
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

const popupEditProfileAvatarForm = new PopupWithForm(
  '.popup_edit-avatar',
  popupSubmitButtonSelector,
  (e) => {
    e.preventDefault();
    popupEditProfileAvatarForm.setWaiting();
    api.updateAvatar(
      {
        avatarLink: popupEditProfileAvatarForm.getInputByInputTitle('avatar-link').value
      }
    )
      .then(
        (res) => userInfo.setAvatar({
          avatarLink: res.avatar
        })
      )
      .catch(e => console.log(e))
      .finally(() => popupEditProfileAvatarForm.close())
  }
);

const popupAddPhotoForm = new PopupWithForm(
  '.popup_add-photo',
  popupSubmitButtonSelector,
  (e) => {
    e.preventDefault();
    popupAddPhotoForm.setWaiting();
    api.addNewCard(
      {
        name: popupAddPhotoForm.getInputByInputTitle('name').value,
        link: popupAddPhotoForm.getInputByInputTitle('link').value
      }
    )
      .then(
        () => {
          fetchCardItems();
        }
      )
      .catch(e => console.log())
      .finally(() => {
        popupAddPhotoForm.close();
      });
  }
);

const editProfileFormValidator = new FormValidator(validationParams, editProfileFormContainer);
const editProfileAvatarFormValidator = new FormValidator(validationParams, editProfileAvatarFormContainer);
const addPhotoFormValidator = new FormValidator(validationParams, addPhotoFormContainer);

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
  userNameInputContainer.value = userName;
  jobInputContainer.value = userDescription;
  popupEditProfileForm.open();
  editProfileFormValidator.resetValidation();
}

function openAddPhotoPopupForm() {
  popupAddPhotoForm.open();
  addPhotoFormValidator.resetValidation();
}

function openEditProfileAvatarPopupForm() {
  popupEditProfileAvatarForm.open();
  editProfileAvatarFormValidator.resetValidation();
}

fetchCardItems();

editProfileFormValidator.enableValidation();
addPhotoFormValidator.enableValidation();
editProfileAvatarFormValidator.enableValidation();

openEditProfilePopupButton.addEventListener('click', openEditProfilePopupForm);
profileAvatarContainer.addEventListener('click', openEditProfileAvatarPopupForm);
openAddPhotoPopupButton.addEventListener('click', openAddPhotoPopupForm);