const profileEditButton = document.querySelector('.profile__edit');
const popupUserProfile = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup_type_name');
let statusInput = formElement.querySelector('.popup_type_status');

function editPopupOpen() {
    popupUserProfile.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
}

function editPopupClose() {
    popupUserProfile.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    let nameValue = nameInput.value;
    let statusValue = statusInput.value;
    profileName.textContent = nameValue;
    profileStatus.textContent = statusValue;
    editPopupClose();
}

profileEditButton.addEventListener('click', editPopupOpen);
popupCloseButton.addEventListener('click', editPopupClose);

formElement.addEventListener('submit', handleFormSubmit);