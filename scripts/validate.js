function setInputValidState(inputErrorClass, input, errorElement) {
    input.classList.remove(inputErrorClass);
    errorElement.textContent='';
}

function setInputInvalidState(inputErrorClass, input, errorElement) {
    input.classList.add(inputErrorClass);
    errorElement.textContent=input.validationMessage;
}


function checkInputValidity({inputErrorClass}, input, form) {
    const errorElement = form.querySelector(`#error-${input.id}`);
    
    if (!input.checkValidity()){
        setInputInvalidState(inputErrorClass, input, errorElement);
    }
    else {
        setInputValidState(inputErrorClass, input, errorElement);
    }
}

function disableButton({inactiveButtonClass}, button) {
    button.setAttribute('disabled','');
    button.classList.add(inactiveButtonClass);
}

function enableButton({inactiveButtonClass}, button) {
    button.removeAttribute('disabled');
    button.classList.remove(inactiveButtonClass);
}


function setButtonValidity({submitButtonSelector, ...rest}, form) {
    const submitButton = form.querySelector(submitButtonSelector);

    if (form.checkValidity()) {
        enableButton(rest, submitButton);
    }
    else {
        disableButton(rest, submitButton);
    }
}

function enableValidation({formSelector, inputSelector, ...rest}){

    const forms = document.querySelectorAll(formSelector);
    const formsArray = Array.from(forms);

    formsArray.forEach(function(form){ 
        form.addEventListener('submit', function (event){
            event.preventDefault();
            setButtonValidity(rest, form);
    });
    
    setButtonValidity(rest, form);
    
    const inputs = form.querySelectorAll(inputSelector);
    const inputsArray=Array.from(inputs);
    
    inputsArray.forEach(function (input) {
        input.addEventListener('input', function () {
            checkInputValidity(rest, input, form);
            setButtonValidity(rest, form);
        });
    });

});
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input_invalid'
  }); 