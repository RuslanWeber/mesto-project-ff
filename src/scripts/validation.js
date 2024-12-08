export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  const minLength = 2;
  const maxLength = 40;

  toggleButtonState(inputList, submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, config, minLength, maxLength);
      toggleButtonState(inputList, submitButton);
    });
  });
}

function checkInputValidity(inputElement, config, minLength = 2, maxLength = 40) {
  const regex = /^[a-zA-Zа-яА-ЯёЁ -]+$/; // латиница, кириллица, дефис и пробелы
  const errorElement = inputElement.nextElementSibling;

  inputElement.setCustomValidity("");

  if (!inputElement.value) {
    inputElement.setCustomValidity("Вы пропустили это поле.");
  } else if (inputElement.type === "text" && (inputElement.value.length < minLength || inputElement.value.length > maxLength)) {
    inputElement.setCustomValidity(`Длина должна быть от ${minLength} до ${maxLength} символов.`);
  } else if (inputElement.type === "text" && !regex.test(inputElement.value)) {
    inputElement.setCustomValidity("Поле может содержать только латинские и кириллические буквы, знаки defиса и пробелы.");
  } else if (inputElement.type === "url" && !inputElement.validity.valid) {
    inputElement.setCustomValidity("Введите адрес сайта.");
  }

  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, config);
  } else {
    hideInputError(inputElement, errorElement, config);
  }
}

function showInputError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
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
    input.classList.remove('popup__input_type_error');
    
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    if (errorElement) {
      errorElement.textContent = '';
    }
  });

  submitButton.classList.add('popup__button_disabled');
  submitButton.setAttribute('disabled', 'true');
  toggleButtonState(inputs, submitButton);
}

