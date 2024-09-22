const cardList = document.querySelector('.places__list');
function createCard(cardData, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector ('.card__image').src = cardData.link;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (deleteButton) {
        deleteButton.addEventListener('click', deleteCard);
    }
    return cardElement;
};

function deleteCard(evt){
    evt.target.closest('.card').remove();
};

function addCards() {
    for (let i = 0; i < initialCards.length; i++) {
        cardList.append(createCard(initialCards[i], deleteCard));
    }
};


addCards();
