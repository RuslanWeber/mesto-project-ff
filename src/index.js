import { getInitialCards, getProfileInfo, updateProfileInfo, addCardToServer, avatarUpdate } from './scripts/api';
import { createCard } from './scripts/card';
import { openModal, closeModal } from './scripts/modal';
import { enableValidation, clearValidation } from './scripts/validation';

import './pages/index.css';

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const profileAvatarButton = document.querySelector('.profile__avatar-button');
const popupAvatarEdit = document.querySelector('.popup_type_avatar_edit');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');


const popupForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupCard = document.querySelector('.popup_type_new-card');
const formNewCard = popupCard.querySelector('.popup__form');
const titleInput = popupCard.querySelector('.popup__input_type_card-name');
const linkInput = popupCard.querySelector('.popup__input_type_url');
let  imagePopup = document.querySelector('.popup_type_image');
const imageElement = imagePopup.querySelector('.popup__image');
const titleElement = imagePopup.querySelector('.popup__caption');

// Настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


function openImagePopup(title, link) {
  
  
  imageElement.src = link;
  imageElement.alt = title;
  titleElement.textContent = title;
  
  openModal(imagePopup);
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadInitialData();
  enableValidation(validationConfig);
  clearValidation(popupForm, validationConfig);
  setUpEventListeners();
});


let userId;

function getUserId() {
  return localStorage.getItem('userId');
}

function setUserId(id) {
  localStorage.setItem('userId', id);
}

const initApp = async () => {
  
    const profileInfo = await getProfileInfo();
    userId = profileInfo._id;
    setUserId(userId); 
    // console.log(`Получен userId: ${userId}`);
    const cards = await getInitialCards();
    renderCards(cards, userId, openImagePopup);

  
};


initApp();
const fetchedUserId = getUserId();

if (!fetchedUserId) {
    initApp();
} else {
    userId = fetchedUserId;
    getInitialCards()
        .then(cards => {
            renderCards(cards, userId, openImagePopup);
        })
}
async function loadInitialData() {
  try {
    const [userInfo, cards] = await Promise.all([getProfileInfo(), getInitialCards()]);
    
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    document.querySelector('.profile__image').style.backgroundImage = `url('${userInfo.avatar}')`;

    renderCards(cards, userInfo._id, openImagePopup);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}
// слушатели кнопок
function setUpEventListeners() {
  editButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEdit);
  });

  addButton.addEventListener('click', () => {
    const formElement = popupCard.querySelector('.popup__form');
    clearValidation(formElement);
    openModal(popupCard);
  });

  formNewCard.addEventListener('submit', handleNewCardSubmit);
  popupForm.addEventListener('submit', handleProfileFormSubmit);
  popups.forEach(popup => setupPopupClose(popup));

  profileAvatarButton.addEventListener('click', () => {
    const formElement = popupAvatarEdit.querySelector('.popup__form');
    clearValidation(formElement);
    openModal(popupAvatarEdit);
    console.log('q')
  });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const avatarForm = document.querySelector('.popup__form[name="edit-avatar"]');
  avatarForm.addEventListener('submit', handleAvatarFormSubmit);
}

// Обработчик отправки формы обновления аватара
async function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  try {
    const newAvatarUrl = document.getElementById('profile-avatar').value; 
    await updateAvatar(newAvatarUrl); 
    closeModal(popupAvatarEdit); 
  } catch (error) {
    console.error("Ошибка :", error);
  } finally {
    submitButton.textContent = initialText;
  }
}

// Обработчик отправки формы профиля
async function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  try {
    const updatedUserInfo = await updateProfileInfo(nameInput.value, jobInput.value);
    profileTitle.textContent = updatedUserInfo.name;
    profileDescription.textContent = updatedUserInfo.about;
    closeModal(popupEdit);
  } catch (error) {
    console.error("Ошибка:", error);
  } finally {
    submitButton.textContent = initialText; // Возвращаем текст кнопки
  }
}


async function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  try {
    const newCard = await addCardToServer(titleInput.value, linkInput.value);
    const newCardElement = createCard(newCard, userId, openImagePopup);
    placesList.prepend(newCardElement);
    closeModal(popupCard);
    formNewCard.reset();
  } catch (error) {
    console.error("Ошибка:", error);
  } finally {
    submitButton.textContent = initialText; 
  }
}

const updateAvatar = async (newAvatarUrl) => {
  try {
    const result = await avatarUpdate(newAvatarUrl);
    console.log('Аватар успешно обновлён!', result);
    document.querySelector('.profile__image').style.backgroundImage = `url('${newAvatarUrl}')`;
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

// Рендеринг карточек
function renderCards(cards) {
  cards.forEach(card => {
    const cardElement = createCard(card,userId, openImagePopup);
    placesList.append(cardElement);
  });
}

// Закрытие попапа
function setupPopupClose(popup) {
  if (!popup) return;

  const closeButton = popup.querySelector(".popup__close");
  if (closeButton) {
    closeButton.addEventListener("click", () => closeModal(popup));
  }

  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
}

// Слушатель события для открытия попапа с изображением
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('openPopup', (event) => {
    const { link, name } = event.detail;
    openImagePopup(name, link);
  });
});

// Инициализация валидации
enableValidation(validationConfig);
clearValidation(popupForm, validationConfig);