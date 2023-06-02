export default class FormValidator {
    constructor(config, form) {
        this._form=form;
        this._formSelector=config.formSelector;
        this._inputSelector=config.inputSelector;
        this._submitButtonSelector=config.submitButtonSelector;
        this._button=form.querySelector(config.submitButtonSelector);
        this._inactiveButtonClass=config.inactiveButtonClass;
        this._inputErrorClass=config.inputErrorClass;
        this._errorClass=config.errorClass;
    }


    _setInputInvalidState(input, errorElement) {
        input.classList.add(this._inputErrorClass);
        errorElement.textContent=input.validationMessage;
    }

    _setInputValidState(input, errorElement) {
        input.classList.remove(this._inputErrorClass);
        errorElement.textContent='';
    }

    _checkInputValidity(input) {
        const errorElement = this._form.querySelector(`#error-${input.id}`);
        
        if (!input.checkValidity()){
            this._setInputInvalidState(input, errorElement);
            this._setButtonValidity();
        }
        else {
            this._setInputValidState(input, errorElement);
        }
    }
    

    _setButtonValidity() {
        if (this._form.checkValidity()) {
            this._button.removeAttribute('disabled');
            this._button.classList.remove(this._inactiveButtonClass);
        }
        else {
            this._button.setAttribute('disabled','');
            this._button.classList.add(this._inactiveButtonClass);        
        }
    }


    _setEventListeners() {
        const inputs = this._form.querySelectorAll(this._inputSelector);

        inputs.forEach((input) => {

            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonValidity();

            });
        });
    }

    enableValidation(){
        this._form.addEventListener('submit', function (event){
            event.preventDefault();
        });

        this._setEventListeners();
        this._setButtonValidity();
    }
}