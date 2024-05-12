// Описаний у документації для відображення сповіщення про помилку
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// const optionsIziToast = {
//   class: 'snackbar-box',
//   theme: 'dark', // темна тема
//   timeout: 4000, // час прогресс бару
//   message: 'Please choose a date in the future', //фраза сповіщення
//   messageColor: '#fff',
//   messageSize: 20,
//   position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
//   maxWidth: 500,
//   progressBar: false,
//   closeOnClick: true, // можливість передчасного закривання вінка
//   displayMode: 'once', // спрацювати 1 раз
//   transitionIn: 'fadeInUp',
//   close: false, // закривання при наисканні на будь-який елемент сповіщення
// };

const form = document.querySelector('.form');

let { delay, state } = {};
form.addEventListener('change', handleChange);
form.addEventListener('submit', handleSubmit);

function handleChange(event) {
  if (event.target.name === 'delay') {
    delay = event.target.value;
  }
  if (event.target.value === 'fulfilled') {
    state = true;
  }
  if (event.target.value === 'rejected') {
    state = false;
  }
  // console.log({ delay, state });
}

function getIziToastDefaults() {
  return {
    class: 'snackbar-box',
    theme: 'dark', // темна тема
    timeout: 4000, // час прогресс бару
    message: 'Please choose a date in the future', //фраза сповіщення
    messageColor: '#fff',
    messageSize: 20,
    position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
    maxWidth: 500,
    progressBar: false,
    closeOnClick: true, // можливість передчасного закривання вінка
    displayMode: 'once', // спрацювати 1 раз
    transitionIn: 'fadeInUp',
    close: false, // закривання при наисканні на будь-який елемент сповіщення
  };
}
function getCustomIziToastOptions(customizedOptions) {
  return {
    ...getIziToastDefaults(),
    ...customizedOptions,
  };
}

/**
 * Обгортка для виклику методів бібліотеки iziToast зі спеціалізованими опціями.
 * @param {"success"|"error"} method- Метод, який потрібно викликати (наприклад, "success", "error", "info" і т. д.).
 * @param {Object} customizedOptions - Спеціалізовані опції для виклику методу.
 */

function iziToastWrapper(method, customizedOptions) {
  const customIziToastOptions = getCustomIziToastOptions(customizedOptions);
  iziToast[method](customIziToastOptions);
}

function handleSubmit(event) {
  event.preventDefault();
  const myPromise = new Promise((resolve, reject) => {
    const getMessage = prefix => `${prefix} promise in ${delay}ms`;
    if (state) {
      setTimeout(() => {
        const message = getMessage('Fulfilled');
        resolve(message);
        iziToastWrapper('success', {
          message,
          backgroundColor: '#33c660',
          iconUrl: './img/check-ok.png',
        });
      }, delay);
    } else {
      setTimeout(() => {
        const message = getMessage('Rejected');
        reject(message);
        iziToastWrapper('error', {
          message,
          backgroundColor: '#fe554b',
          iconUrl: './img/cross.png',
        });
      }, delay);
    }
  });

  myPromise
    .then(result => {
      // Цей блок .then() не буде викликано,
      // оскільки обіцянка завжди відхиляється
      console.log('Виконано:', result);
    })
    .catch(error => {
      // Блок .catch() буде викликано, і ми отримаємо причину відхилення
      console.error('Відхилено:', error);
    });
}
