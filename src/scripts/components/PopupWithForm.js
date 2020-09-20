import Popup from './Popup.js';
import {
  validationParams
} from '../utils/constants.js'

export default class PopupWithForm extends Popup {

  constructor(popupSelector, popupSubmitFormSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._inputs = this._getInputs();
    this._submitButtonContainer = this._container.querySelector(popupSubmitFormSelector);
    this._defaultSubmitButtonCapture = this._submitButtonContainer.textContent;
  }

  _getInputs() {
    return Array.from(this._container.getElementsByTagName('input'));
  }

  getInputByInputTitle(inputTitle) {
    const inputs = this._inputs.filter((input) => input.title === inputTitle);
    return inputs && inputs.length === 1 ? inputs[0] : null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._container.addEventListener('submit', this._submitCallback);
  }

  setWaiting() {
    this._submitButtonContainer.textContent = 'Сохранение...';
  }

  setError() {
    this._submitButtonContainer.textContent = 'Ошибка!';
  }

  close() {
    super.close();
    this._submitButtonContainer.textContent = this._defaultSubmitButtonCapture;
    this._inputs.forEach((input) => {
      input.value = '';
    });
    this._container.removeEventListener('submit', this._submitCallback)
  }

}