import Popup from './Popup.js';
import {
  validationParams
} from '../utils/constants.js'

export default class PopupWithForm extends Popup {

  constructor(popupSelector, popupSubmitFormSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._inputs = this._getInputs();
    this._submitButtonContainer = document.querySelector(popupSubmitFormSelector);
    this._defaultSubmitButtonCapture = this._submitButtonContainer.textContent;
  }

  _getInputs() {
    return Array.from(this._container.querySelectorAll('.' + validationParams.formInputClass));
  }

  _getInputValues() {
    let inputsValues = [];
    this._inputs.forEach((input) => {
      inputsValues.push(
        {
          title: input.title,
          value: input.value
        }
      )
    });
    return inputsValues;
  }

  getValueByInputTitle(inputTitle) {
    const inputsValues = this._getInputValues();
    const input = inputsValues.filter((inputWithValue) => inputWithValue.title === inputTitle);
    return input && input.length > 0 ? input[0].value : '';
  }

  setEventListeners() {
    super.setEventListeners();
    this._container.addEventListener('submit', this._submitCallback);
  }

  setWaiting() {
    this._submitButtonContainer.textContent = 'Сохранение...';
  }

  close() {
    super.close();
    this._submitButtonContainer.value = this._defaultSubmitButtonCapture;
    this._inputs.forEach((input) => {
      input.value = '';
    });
    this._container.removeEventListener('submit', this._submitCallback)
  }

}