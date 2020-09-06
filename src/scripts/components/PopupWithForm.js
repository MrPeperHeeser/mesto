import Popup from './Popup.js';
import {
  validationParams
} from '../utils/constants.js'

export default class PopupWithForm extends Popup {

  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._inputs = this._getInputValues();
  }

  _getInputValues() {
    return Array.from(this._container.querySelectorAll('.' + validationParams.formInputClass));
  }

  getInputValueByClass(inputClassName) {
    const input = this._inputs.filter((input) => input.classList.contains(inputClassName));
    return input && input.length > 0 ? input[0].value : '';
  }

  setEventListeners() {
    super.setEventListeners();
    this._container.addEventListener('submit', this._submitCallback);
  }

  close() {
    super.close();
    this._inputs.forEach((input) => {
      input.value = '';
    });
    this._container.removeEventListener('submit', this._submitCallback)
  }

}