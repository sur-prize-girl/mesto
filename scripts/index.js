//Карточки при загрузке страницы
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

//Open & close any popup
const openPopup = (type) => {
    type.classList.add('popup_opened');
}

const closePopup = (type) => {
    type.classList.remove('popup_opened');
}


//Cards-template

const cardsElements = document.querySelector('.elements');
const cardsTemplate = document.getElementById('cards-template');

const popupImg = document.querySelector('.popup_type_img');

const createCardElement = (cardData) => {
    const cardElement = cardsTemplate.content.querySelector('.elements__card').cloneNode(true);
    const cardImg = cardElement.querySelector('.elements__img');
    const cardTitle = cardElement.querySelector('.elements__name');

    const deleteButton = cardElement.querySelector('.elements__trash');
    const likeButton = cardElement.querySelector('.elements__like');

    const popupImgData = popupImg.querySelector('.popup__fig-img');
    const popupImgCaption = popupImg.querySelector('.popup__fig-caption');
    const popupImgClose = popupImg.querySelector('.popup__close');

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

    popupImgClose.addEventListener('click', () => {
        closePopup(popupImg);
    });

    return cardElement;
};

const renderCardElement = (cardElement) => {
    cardsElements.prepend(cardElement);
};

initialCards.forEach((item) => {
    renderCardElement(createCardElement(item));
});


//Add cards popup
const cardsCreateButton = document.querySelector('.profile__add-button');
const popupCreateCard = document.querySelector('.popup_type_place');
const popupCreateCloseButton = popupCreateCard.querySelector('.popup__close');
const formNewCard = popupCreateCard.querySelector('.popup__form');
const placeInput = formNewCard.querySelector('.popup__input_type_place');
const sourceInput = formNewCard.querySelector('.popup__input_type_url');

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
    renderCardElement(createCardElement(cardPlaceData));
    closePopup(popupCreateCard);
};

formNewCard.addEventListener('submit', handleCardFormSubmit);


//Edit profile popup
const profileEditButton = document.querySelector('.profile__edit');
const popupUserProfile = document.querySelector('.popup_type_profile');
const popupCloseButton = popupUserProfile.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const formElement = popupUserProfile.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const statusInput = formElement.querySelector('.popup__input_type_status');


function handleFormSubmit (evt) {
    evt.preventDefault(); 
    let nameValue = nameInput.value;
    let statusValue = statusInput.value;
    profileName.textContent = nameValue;
    profileStatus.textContent = statusValue;
    closePopup(popupUserProfile);
}

profileEditButton.addEventListener('click', () => {
    openPopup(popupUserProfile);
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
});

popupCloseButton.addEventListener('click', () => {
    closePopup(popupUserProfile);
});

formElement.addEventListener('submit', handleFormSubmit);