export class FormValidator {

  constructor(params, formElement) {
    this._params = params;
    this._formElement = formElement;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._params.formInputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._params.formInputErrorActiveClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._params.formInputErrorClass);
    errorElement.classList.remove(this._params.formInputErrorActiveClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._params.formButtonInactiveClass);
    } else {
      buttonElement.classList.remove(this._params.formButtonInactiveClass);
    }
  };

  _getInputList = () => {
    return Array.from(this._formElement.querySelectorAll('.' + this._params.formInputClass));
  };

  _getSubmitFormButton = () => {
    return this._formElement.querySelector('.' + this._params.formButtonClass);
  };

  _setEventListeners = () => {
    const inputList = this._getInputList();
    const buttonElement = this._getSubmitFormButton();
    this._toggleButtonState(inputList, buttonElement, this._params);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, this._params);
        this._toggleButtonState(inputList, buttonElement, this._params);
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };

  resetValidation = () => {
    const inputList = this._getInputList();
    const buttonElement = this._getSubmitFormButton();
    this._toggleButtonState(inputList, buttonElement, this._params);
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

}