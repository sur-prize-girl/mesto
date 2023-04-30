//const for Cards-template
const cardsElements = document.querySelector('.elements');
const cardsTemplate = document.querySelector('.elements__card-template');

//const for Image popup
const popupImg = document.querySelector('.popup_type_img');
const popupImgData = popupImg.querySelector('.popup__fig-img');
const popupImgCaption = popupImg.querySelector('.popup__fig-caption');
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

const closePopupByEsc = (event) => {
    const popupOpened = document.querySelector('.popup_opened');
    if (event.key === 'Escape'){
        closePopup(popupOpened);
    }
};


//Open & close any popup
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

const closePopupOnOverlay = (evt) => {
    const popups = document.querySelectorAll('.popup');
    const popupsArr = Array.from(popups);

    popupsArr.forEach(function (popup){
        popup.addEventListener('click', function(evt) {
            if (evt.target === evt.currentTarget) {
                closePopup(popup);
            }      
        });
    });
}

closePopupOnOverlay();

//Cards-template

const createCardElement = (cardData) => {
    const cardElement = cardsTemplate.content.querySelector('.elements__card').cloneNode(true);
    const cardImg = cardElement.querySelector('.elements__img');
    const cardTitle = cardElement.querySelector('.elements__name');

    const deleteButton = cardElement.querySelector('.elements__trash');
    const likeButton = cardElement.querySelector('.elements__like');


    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    cardTitle.textContent = cardData.name;


    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('elements__like_active');        
    });
    
    cardImg.addEventListener('click', (event) => {
        event.preventDefault();
        openPopup(popupImg);
        popupImgData.src = cardData.link;
        popupImgData.alt = cardData.name;
        popupImgCaption.textContent = cardData.name;
    });
    return cardElement;
};

initialCards.forEach((item) => {
    cardsElements.prepend(createCardElement(item));
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

    cardsElements.prepend(createCardElement(cardPlaceData));
    closePopup(popupCreateCard);
    formNewCard.reset();
};

formNewCard.addEventListener('submit', handleCardFormSubmit);


//Edit profile popup

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = inputNameFormProfile.value;
    profileStatus.textContent = inputStatusFormProfile.value;
    closePopup(popupUserProfile);
    formEditProfile.reset();
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