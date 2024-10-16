
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const popupEdit = document.querySelector('.popup_type_edit');
// открытие модальных окон
function openModal(page) {
    page.classList.add('popup_is-opened');

    const closeButton = page.querySelector('.popup__close')

    closeButton.addEventListener('click', function () {
        closeModal(page);
    })

    page.addEventListener('click', function (evt) {
        if(evt.target === evt.currentTarget) {
            closeModal(page);
        }
        
    })

    function closeByEscape(evt){
        if (evt.key === 'Escape') {
            closeModal(page);
        }
        document.removeEventListener('keydown', closeByEscape);
    }
    document.addEventListener('keydown', closeByEscape);

}

function closeModal(page) {
    page.classList.remove('popup_is-opened');
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
    nameInput.placeholder = nameOutput.textContent;
    jobInput.placeholder = jobOutput.textContent;
}
formElement.addEventListener('submit', handleFormSubmit); 

export {openModal, closeModal}
