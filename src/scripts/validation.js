export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);


  toggleButtonState(inputList, submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, config);
      toggleButtonState(inputList, submitButton);
    });
  });
}

function checkInputValidity(inputElement, config) {

  if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity = inputElement.dataset.requiredError;
  } else if (inputElement.validity.tooShort  || inputElement.validity.tooLong) {
    inputElement.setCustomValidity = inputElement.dataset.lengthError;
  } else if (inputElement.type === "text" && inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity = inputElement.dataset.patternError;
  } else if (inputElement.type === "url" && !inputElement.validity.valueMissing) {
    inputElement.setCustomValidity = inputElement.dataset.errorMessage;
  }

  if (!inputElement.validity.valid) {
    showInputError(inputElement, config);
  } else {
    hideInputError(inputElement, config);
  }
}

function showInputError(inputElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = inputElement.setCustomValidity;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(inputElement) {
  inputElement.classList.remove('popup__input_type_error');
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove('popup__error_visible');
}

function toggleButtonState(inputs, button) {
  const isValid = !hasInvalidInput(inputs); 
  button.classList.toggle('inactive-button', !isValid);
  button.disabled = !isValid;
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

export function clearValidation(formElement) {
  const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
  const submitButton = formElement.querySelector('.popup__button');

  inputs.forEach((input) => {
    hideInputError(input);
  });

  submitButton.classList.add('popup__button_disabled');
  submitButton.setAttribute('disabled', 'true');
  toggleButtonState(inputs, submitButton);
}

