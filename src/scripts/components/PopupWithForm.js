import Popup from './Popup.js';
import {
  validationParams
} from '../utils/constants.js'

export default class PopupWithForm extends Popup {

  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._inputs = this._getInputs();
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

  close() {
    super.close();
    this._inputs.forEach((input) => {
      input.value = '';
    });
    this._container.removeEventListener('submit', this._submitCallback)
  }

}