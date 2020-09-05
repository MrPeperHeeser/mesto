function _closePopupOnOutsideClick(e) {
  const el = e.target;
  if (el.classList.contains('popup__close-button')) {
    return;
  }
  const popupContainer = el.querySelector('.popup__container');
  const popupImageContainer = el.querySelector('.popup__image-container');
  let isInside;
  if (popupContainer) {
    isInside = popupContainer.contains(el);
  } else if (popupImageContainer) {
    isInside = popupImageContainer.contains(el);
  } else {
    isInside = false;
  }
  if (!isInside) {
    el.classList.remove('popup_open');
    el.removeEventListener('click', _closePopupOnOutsideClick);
    document.removeEventListener('keydown', _closePopupOnEscClick);
  }
}

function _closePopupOnEscClick(e) {
  const popup = document.querySelector('.popup_open');
  if (e.key === 'Escape') {
    popup.classList.remove('popup_open');
    popup.removeEventListener('click', _closePopupOnOutsideClick);
    document.removeEventListener('keydown', _closePopupOnEscClick);
  }
}

export function togglePopup(el) {
  el.classList.toggle('popup_open');
  if (el.classList.contains('popup_open')) {
    el.addEventListener('click', _closePopupOnOutsideClick);
    document.addEventListener('keydown', _closePopupOnEscClick);
  }
}