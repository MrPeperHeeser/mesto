const params = {
  formInputErrorClass: 'popup__form-input_error',
  formInputErrorActiveClass: 'popup__form-input-error_active',
  formButtonInactiveClass: 'popup__form-btn_inactive',
  formButtonClass: 'popup__form-btn',
  formInputClass: 'popup__form-input',
  formClass: 'popup__form'
};

const showInputError = (formElement, inputElement, errorMessage, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(params.formInputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.formInputErrorActiveClass);
};

const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(params.formInputErrorClass);
  errorElement.classList.remove(params.formInputErrorActiveClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, params) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, params) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(params.formButtonInactiveClass);
  } else {
    buttonElement.classList.remove(params.formButtonInactiveClass);
  }
};

const setEventListeners = (formElement, params) => {
  const inputList = Array.from(formElement.querySelectorAll('.' + params.formInputClass));
  const buttonElement = formElement.querySelector('.' + params.formButtonClass);
  toggleButtonState(inputList, buttonElement, params);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, params);
      toggleButtonState(inputList, buttonElement, params);
    });
  });
};

const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll('.' + params.formClass));
  formList.forEach((formElement) => {
    setEventListeners(formElement, params);
  });
};

enableValidation(params);