import initialCards from "./init.js";
import {popupImg} from "./init.js";
import Card from "./Card.js";
import {openPopup, closePopup, initClosePopupsOnOverlay} from "./utils.js";
import FormValidator from "./FormValidator.js";

//const for Cards-template
const cardsElements = document.querySelector('.elements');

//const for Image popup
const popupImgClose = popupImg.querySelector('.popup__close');

// const for Add cards popup
const cardsCreateButton = document.querySelector('.profile__add-button');
const popupCreateCard = document.querySelector('.popup_type_place');
const popupCreateCloseButton = popupCreateCard.querySelector('.popup__close');
const formNewCard = popupCreateCard.querySelector('.popup__form');
const placeInput = formNewCard.querySelector('.popup__input_type_place');
const sourceInput = formNewCard.querySelector('.popup__input_type_url');

//const for Edit profile popup
const profileEditButton = document.querySelector('.profile__edit');
const popupUserProfile = document.querySelector('.popup_type_profile');
const popupCloseButton = popupUserProfile.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const formEditProfile = popupUserProfile.querySelector('.popup__form');
const inputNameFormProfile = formEditProfile.querySelector('.popup__input_type_name');
const inputStatusFormProfile = formEditProfile.querySelector('.popup__input_type_status');

initClosePopupsOnOverlay();

//Cards-template

const createCard = item => {
    const card = new Card(item, '.elements__card-template');
    return card.createCard();
}

initialCards.forEach((item) => {
    const cardElement = createCard(item);
    cardsElements.prepend(cardElement);
});


popupImgClose.addEventListener('click', () => {
    closePopup(popupImg);
});


//Add cards popup

cardsCreateButton.addEventListener('click', () => {
    openPopup(popupCreateCard);
});

popupCreateCloseButton.addEventListener('click', () => {
    closePopup(popupCreateCard);
});

const handleCardFormSubmit = (event) => {
    event.preventDefault(); 

    const cardPlaceData = {
        name: placeInput.value,
        link: sourceInput.value
    };

    const cardElement = createCard(cardPlaceData);
    cardsElements.prepend(cardElement);

    closePopup(popupCreateCard);
    formNewCard.reset();
    validatorNewCard.setButtonValidity();
};

formNewCard.addEventListener('submit', handleCardFormSubmit);


//Edit profile popup

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = inputNameFormProfile.value;
    profileStatus.textContent = inputStatusFormProfile.value;
    closePopup(popupUserProfile);
    formEditProfile.reset();
    validatorProfile.setButtonValidity();
}

profileEditButton.addEventListener('click', () => {
    openPopup(popupUserProfile);
    inputNameFormProfile.value = profileName.textContent;
    inputStatusFormProfile.value = profileStatus.textContent;
});

popupCloseButton.addEventListener('click', () => {
    closePopup(popupUserProfile);
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input_invalid'
}

validationConfig.formSelector = 'popup__form';
const validatorProfile = new FormValidator(validationConfig, formEditProfile);
validatorProfile.enableValidation();

validationConfig.formSelector = 'card-form';
const validatorNewCard = new FormValidator(validationConfig, formNewCard);
validatorNewCard.enableValidation();