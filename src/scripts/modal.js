
// открытие модальных окон
function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', overlayClose);
    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('click', closeButton);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
    // document.removeEventListener('click', overlayClose);

}

function overlayClose(evt) {
    if(evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
    }   
}

function closeByEscape(evt){
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closeModal(openPopup);
        }
    }
}

function closeButton(evt) {
    const closeButton = evt.target.closest('.popup__close');
    if (closeButton) {
        const popup = closeButton.closest('.popup');
        closeModal(popup);
    }
}
export {openModal, closeModal, overlayClose, closeByEscape, closeButton}
