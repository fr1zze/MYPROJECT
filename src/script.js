const form = document.getElementById('ContactForm'); // получаем поле ввода
const emailInput = document.getElementById('email'); // получаем поле ввода email
const phoneInput = document.getElementById('phone'); // получаем поле ввода phone
const usernameInput = document.getElementById('username'); // получаем поле ввода username

emailInput.addEventListener('input',validateEmail); // на событие ввода email будет вызываться функция validateEmail()
phoneInput.addEventListener('input',validatePhone); // на событие ввода phone будет вызываться функция validatePhone()
usernameInput.addEventListener('input',validateUsername); // на событие ввода username будет вызываться функция validateUsername()

function validateUsername() {
    const usernameRegex = /[A-Яа-я]/;
    if(usernameRegex.test(usernameInput.value))
    {
        removeError(usernameInput);
        return true;
    }
    else
    {
        showError(usernameInput, "Username не соответствует формату. Пример: Иван");
        return false;
    }
        
}

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

phoneInput.setAttribute('pattern', '^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$');

function validatePhone() {

    const digits = phoneInput.value.replace(/\D/g, '').slice(0, 11); // до 11 цифр
    const d = digits.replace(/^8/, '7'); // нормализуем 8 → 7
    
    const parts = [];
    if (d.length > 0) parts.push('+7');
    if (d.length > 1) parts.push(' (' + d.slice(1, 4));
    if (d.length >= 4) parts[parts.length - 1] += ')';
    if (d.length >= 5) parts.push(' ' + d.slice(4, 7));
    if (d.length >= 8) parts.push('-' + d.slice(7, 9));
    if (d.length >= 10) parts.push('-' + d.slice(9, 11));
    
    phoneInput.value = parts.join('');
    
    const phonePattern = new RegExp(phoneInput.getAttribute('pattern'));
    
    if (phonePattern.test(phoneInput.value)) {
        removeError(phoneInput);
        return true;
    } else {
        showError(phoneInput, "Телефон не соответствует формату. Пример: +7 (912) 345-67-89");
        return false;
    }
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