import '/Users/ruslanweber/Desktop/project mesto/src/pages/index.css';
import { initialCards } from './cards';
import {openModal, closeModal, popupEdit} from './modal.js'
const cardList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupNewCard = document.querySelector(".popup_type_new-card");
const modalCardForm = document.querySelectorAll('.popup_type_new-card .popup__form');
const cardInputName = document.querySelector('.popup__input_type_card-name');
const cardInputLink = document.querySelector('.popup__input_type_url');

function createCard(cardData, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector ('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    if (deleteButton) {
        deleteButton.addEventListener('click', () => deleteCard(cardElement));
    }
    if (cardImage) {
        cardImage.addEventListener('click', () => openBigImagePopup(cardImage));
    }

    if (cardLikeButton) {
        cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));
    }

    return cardElement;
};

function deleteCard(card){
    card.remove();
};

function addCards() {
    for (let i = 0; i < initialCards.length; i++) {
        cardList.append(createCard(initialCards[i], deleteCard));
    }
};

  //просмотр изображения карточки
function openBigImagePopup(cardInfo) { 
    popupImage.src = cardInfo.currentSrc;
    popupImage.alt = cardInfo.alt;
    popupImageCaption.textContent = cardInfo.alt;
    openModal(popupTypeImage);
    console.log(popupImage);
}


  //лайк карточки
function likeCard (cardLikeButton) {
    cardLikeButton.classList.toggle('card__like-button_is-active');
}

//добавление карточки
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    // const cardName = cardInputName[0].value;
    const cardName = cardInputName.value;
    const cardLink = cardInputLink.value;
    initialCards.unshift({name: cardName, link: cardLink}); 
    cardList.prepend(createCard(initialCards[0], deleteCard));
    closeModal(popupNewCard);
    cardInputName.value = '';
    cardInputLink.value = '';
}
modalCardForm[0].addEventListener('submit', handleAddCardFormSubmit);
export { addCards }