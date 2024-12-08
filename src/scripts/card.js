import { addLike, removeLike,  deleteCardFromServer } from './api.js';

function handleLike(cardId, likeButton, likeCounter) {
  const likeActive = likeButton.classList.contains("card__like-button_is-active");
  
  const likeToggle = likeActive ? removeLike(cardId) : addLike(cardId);
  
  likeToggle
    .then(data => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = data.likes.length; 
    })
}

function deleteCard(cardId, cardElement) {
  deleteCardFromServer(cardId) 
    cardElement.remove(); 
}

function handleDeleteButtonClick(cardId, cardElement) {
  deleteCard(cardId, cardElement); 
}

function createCard(cardData, userId, openImagePopup) {
  const cardTemplate = document.getElementById("card-template").content.cloneNode(true).querySelector(".card");
  
  const cardImage = cardTemplate.querySelector ('.card__image');
  const likeButton = cardTemplate.querySelector('.card__like-button');
  let likeCounter = cardTemplate.querySelector(".card__like-counter");


  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTemplate.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = cardTemplate.querySelector('.card__delete-button');
  likeCounter.textContent = cardData.likes.length;
  
  //лайки 
  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    handleLike(cardData._id, likeButton, likeCounter);
  });
  //удаление карточки
  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => {
      handleDeleteButtonClick(cardData._id, cardTemplate);
    });
  }
  //открыть картинку
  cardImage.addEventListener('click', () => {
    openImagePopup(cardData.name, cardData.link);
  });

  return cardTemplate;
}

export { createCard };