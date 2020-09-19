import Popup from './Popup.js';
import {
  imagePopupTextContainer,
  popupImageContainer
} from "../utils/constants.js";

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
  }

  open({src, name}) {
    popupImageContainer.src = src;
    popupImageContainer.alt = name;
    imagePopupTextContainer.textContent = name;
    super.open();
  }

  close() {
    popupImageContainer.src = '';
    popupImageContainer.alt = '';
    imagePopupTextContainer.textContent = '';
    super.close();
  }

}