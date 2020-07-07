const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');

const nameInput = document.querySelector('.popup__form-input_username-field');
const jobInput = document.querySelector('.popup__form-input_description-field');

const profileUsername = document.querySelector('.profile__username-text');
const profileDescription = document.querySelector('.profile__description');

const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');

function togglePopup() {
    popup.classList.toggle('popup_open');
}

function openPopup() {
    togglePopup();
    nameInput.value = profileUsername.textContent;
    jobInput.value = profileDescription.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileUsername.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    togglePopup();
}

openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);