const form = document.getElementById('ContactForm'); // получаем поле ввода
const emailInput = document.getElementById('email'); // получаем поле ввода email
const phoneInput = document.getElementById('phone'); // получаем поле ввода phone

emailInput.addEventListener('input',validateEmail); // на событие ввода email будет вызываться функция validateEmail()
phoneInput.addEventListener('input',validatePhone);

function validateEmail() { // функция проверки коректности email

    const emailRegex = /[A-Za-z0-9_\-\.]{2,10}@[a-z0-9\.\-_]{1,10}\.[a-z]{2,3}/;
    if(emailRegex.test(emailInput.value))
    {
        removeError(emailInput);
        return true;
    }
    else
    {
        showError(emailInput, "Email не соответствует формату. Пример: ivanov@mail.ru");
        return false;
    }

}

function validatePhone() { // функция проверки коректности номера телефона
    const digitsPhone = phoneInput.value.replace(/\D/g,'').slice(0,11);
    const dPhone = digitsPhone.replace(/^8/, '7');
    const partsPhone = [];

    if (d.length > 0) partsPhone.push('+7');
    if (d.length > 1) partsPhone.push(' (' + d.slice(1,4));
    if (d.length >= 4) partsPhone[partsPhone.length - 1] += ')';
    if (d.length >= 5) partsPhone.push(' ' + d.slice(4,7));
    if (d.length >= 8) partsPhone.push('-' + d.slice(7,9));
    if (d.length >= 10) partsPhone.push('-' + d.slice(9,11));
    phoneInput.value = partsPhone.join('');
    
}

function showError(input, message) { // функция показа ошибки

    const formControl = input.parentElement; // получаем родительскую форму
    const errorElement = formControl.querySelector('.error') || document.createElement('div');

    errorElement.className = 'error'; 
    errorElement.textContent = message;

    formControl.appendChild(errorElement);
    input.style.borderColor = 'red';

}

function removeError(input) { // функция скрытия ошибки

    const formControl = input.parentElement;
    const errorElement = formControl.querySelector('.error');

    if(errorElement)
    {
        formControl.removeChild(errorElement);
    }

    input.style.borderColor = 'green';
}