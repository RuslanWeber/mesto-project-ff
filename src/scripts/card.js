

function deleteCard(card){
    card.remove();
};

  //лайк карточки
function likeCard (cardLikeButton) {
    cardLikeButton.classList.toggle('card__like-button_is-active');
}


function createCard(cardData, deleteCard, likeCard, openBigImagePopup) {
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


export {createCard, deleteCard, likeCard}