const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');

const nameInput = document.querySelector('.popup__form-name');
const jobInput = document.querySelector('.popup__form-description');

const profileUsername = document.querySelector('.profile__username-text');
const profileDescription = document.querySelector('.profile__description');

function closeForm() {
    const popup = document.querySelector('.popup');

    popup.classList.replace('popup_open', 'popup_close');
}

openPopupButton.addEventListener('click', () => {
    const popup = document.querySelector('.popup');

    nameInput.value = profileUsername.textContent;
    jobInput.value = profileDescription.textContent;
    popup.classList.replace('popup_close', 'popup_open');
});

closePopupButton.addEventListener('click', () => {
    closeForm();
});


let formElement = document.querySelector('.popup__form');


function formSubmitHandler(evt) {
    evt.preventDefault();

    profileUsername.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeForm();
}


formElement.addEventListener('submit', formSubmitHandler);