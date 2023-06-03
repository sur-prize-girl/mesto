//Open & close any popup

const _closePopupByEsc = (event) => {
    const popupOpened = document.querySelector('.popup_opened');
    if (event.key === 'Escape'){
        closePopup(popupOpened);
    }
};

export const initClosePopupsOnOverlay = () => {
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

export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', _closePopupByEsc);
}

export const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', _closePopupByEsc);
}