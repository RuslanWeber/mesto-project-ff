const cardList = document.querySelector('.places__list');
function createCard(cardData, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector ('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (deleteButton) {
        deleteButton.addEventListener('click', () => deleteCard(cardElement));
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


addCards();
