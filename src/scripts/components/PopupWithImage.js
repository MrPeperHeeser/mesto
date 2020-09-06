import Popup from './Popup.js';
import {
  imagePopupText,
  popupImage
} from "../utils/constants.js";

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
  }

  open({src, name}) {
    popupImage.src = src;
    popupImage.alt = name;
    imagePopupText.textContent = name;
    super.open();
  }

  close() {
    popupImage.src = '';
    popupImage.alt = '';
    imagePopupText.textContent = '';
    super.close();
  }

}