import {openPopup} from './utils.js';
import {popupImgData, popupImgCaption} from './init.js';

export default class Card {
    constructor(data, templateSelector, popupImg) {
        this._data = data;
        this._template = templateSelector;
        this._link = data.link;
        this._name = data.name;
        this._popupImg = popupImg;
    }

    _getCard(){
       return document.querySelector(this._template).content.querySelector('.elements__card').cloneNode(true);
    }

    _handleDelete() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _handleLike(){
        this._likeButton.classList.toggle('elements__like_active');
    }

    _handleImg() {
            openPopup(this._popupImg);
            popupImgData.src = this._link;
            popupImgData.alt = this._name;
            popupImgCaption.textContent = this._name;
        }

    _setEventListeners(){
        this._deleteButton.addEventListener('click', () => {
            this._handleDelete();
        });
    
        this._likeButton.addEventListener('click', () => {
            this._handleLike();
        });
        
        this._cardImg.addEventListener('click', () => {
            this._handleImg();
        });
    }
    
    createCard() { 
        this._cardElement = this._getCard();
        this._cardImg = this._cardElement.querySelector('.elements__img');
        this._cardTitle = this._cardElement.querySelector('.elements__name');
        
        this._deleteButton = this._cardElement.querySelector('.elements__trash');
        this._likeButton = this._cardElement.querySelector('.elements__like');

        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
        this._cardTitle.textContent = this._name;

        this._setEventListeners();

        return this._cardElement;
    }

    
}