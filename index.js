const openModalButton = document.querySelector('.profile__edit-button');

openModalButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal');

    modal.classList.add('modal__open');
});