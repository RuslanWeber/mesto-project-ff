import "../src/pages/index.css";
import { initialCards } from './scripts/cards.js';
import {createCard, deleteCard, likeCard} from './scripts/card.js'
import {openModal, closeModal} from './scripts/modal.js'

const cardList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupProfile = document.querySelector('.popup_type_edit .popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const popupNewCard = document.querySelector(".popup_type_new-card");
const modalCardForm = document.querySelector('.popup_type_new-card .popup__form');
const cardInputName = document.querySelector('.popup__input_type_card-name');
const cardInputLink = document.querySelector('.popup__input_type_url');
const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');


editButton.addEventListener('click', function () {
    openModal(popupEdit);
    nameInput.value= document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
    openModal(popupEdit);
});

addButton.addEventListener('click', function () {
    openModal(popupAdd);
});

//редактор профиля

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const nameOutput = document.querySelector('.profile__title'); 
    const jobOutput = document.querySelector('.profile__description'); 
    nameOutput.textContent = nameInput.value; 
    jobOutput.textContent = jobInput.value;
closeModal(popupEdit);
}
popupProfile.addEventListener('submit', handleProfileFormSubmit); 

//добавление карточки
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const cardName = cardInputName.value;
    const cardLink = cardInputLink.value;
    cardList.prepend(createCard({name: cardName, link: cardLink}, deleteCard, likeCard, openBigImagePopup));
    closeModal(popupNewCard);
    modalCardForm.reset();
    
}
modalCardForm.addEventListener('submit', handleAddCardFormSubmit);

 //просмотр изображения карточки
function openBigImagePopup(cardInfo) { 
    popupImage.src = cardInfo.currentSrc;
    popupImage.alt = cardInfo.alt;
    popupImageCaption.textContent = cardInfo.alt;
    openModal(popupTypeImage);
}

function addCards() {
    for (let i = 0; i < initialCards.length; i++) {
        cardList.append(createCard(initialCards[i], deleteCard, likeCard, openBigImagePopup));
    }
};

addCards();

export { addCards, openBigImagePopup }