import "../src/pages/index.css";
import {addCards} from './scripts/card.js'
import {openModal} from './scripts/modal.js'

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
