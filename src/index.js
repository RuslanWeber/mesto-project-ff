import "../src/pages/index.css";
import {addCards, createCard, deleteCard, likeCard} from './scripts/card.js'
import {openModal, closeModal, overlayClose, closeByEscape, closeButton} from './scripts/modal.js'

const cardList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const formElement = document.querySelector('.popup_type_edit .popup__form');
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

addCards();

editButton.addEventListener('click', function () {
    openModal(popupEdit);
});

addButton.addEventListener('click', function () {
    openModal(popupAdd);
});

//закрытие popup
function popupOverlayClose() {
    const popup = document.querySelector('.popup_is-opened');
    if (popup) {
        popup.addEventListener('click', overlayClose);
    }
}

function popupEscClose() {
    document.addEventListener('keydown', closeByEscape);
}

function popupCloseButton() {
    document.addEventListener('click', closeButton);
    
}
//редактор профиля

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    nameInput.placeholder = document.querySelector('.profile__title').textContent;
    jobInput.placeholder = document.querySelector('.profile__description').textContent;
    nameInput.textContent = document.querySelector('.popup__input_type_name').textContent;
    jobInput.textContent = document.querySelector('.popup__input_type_description').textContent;

    const nameOutput = document.querySelector('.profile__title');
    const jobOutput = document.querySelector('.profile__description');

    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;

    closeModal(popupEdit);
    nameInput.textContent = '';
    jobInput.textContent = '';
}
formElement.addEventListener('submit', handleFormSubmit); 

//добавление карточки
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const cardName = cardInputName.value;
    const cardLink = cardInputLink.value;
    cardList.prepend(createCard({name: cardName, link: cardLink}, deleteCard, likeCard, openBigImagePopup));
    closeModal(popupNewCard);
    console.log(document.getElementsByName('place-name'))
    console.log(cardInputName.value)
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

export { popupOverlayClose,  popupEscClose, popupCloseButton, openBigImagePopup }