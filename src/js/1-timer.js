//додавання змінних для дом елемента кнопка запуску
const buttonDom = document.querySelector('.section button[data-start]');

//додавання змінних для дом елементів відображення елментів
const timerDom = document.querySelectorAll('.timer .field span.value');

// затемененя кнопки для розуміння неактивності кнопки
buttonDom.classList.add('inactive');

//визначення змінних !!!!!!!!!!!!!!!!!!!!
let userSelectedDate;

// визначення поточного дати та часу
const curDate = new Date();

// визначення змінної поточного шндентифікатора setInterval() для його видалення
let outerItnervalId;

//визначення змінної для прибрання навішування слухача при обранні тієїєж дати відліку
let deltaDatePrev;

// опції для flatpickr
const options = {
  enableTime: true, //відображення дати
  time_24hr: true, // 24-часовий відображення
  defaultDate: new Date(), //потчні дата на приклад як -  placeholder
  minuteIncrement: 1, // встановлення часу минімальні зміни на 1 хвилину
  onClose: closeCalendar, //визов функції після обрання дати та часу
};

// конфігурування flatpickr із підключенням опцій
flatpickr('#datetime-picker', options);

/**
 * функція запуску відліку до обраної дати
 * @param {Array} selectedDates формат обраноъ дати
 * @returns
 */
function closeCalendar(selectedDates) {
  // дельта дат обраної та поточної
  let deltaDateCur = selectedDates[0].getTime() - curDate.getTime();
  // перевірку на дати в минулому
  if (deltaDateCur < 0) {
    // відображення попееджувальноого напису
    window.alert('Please choose a date in the future');
    // кнопка отримує стиль класу'.inactive'
    buttonDom.classList.add('inactive');
    return;
  }

  // перевірка зміни обраної дати для виключення повторно обраної дати
  if (deltaDateCur !== deltaDatePrev) {
    // видалення стилю класу'.inactive'
    buttonDom.classList.remove('inactive');
    // попереднє значення дорівнює поточній дельті дат
    deltaDatePrev = deltaDateCur;
    //визов функції як аргумент додано дельту дат
    iterate(deltaDatePrev);
  }
}

/**
 * функція запуску відображення відліку до обраної дати у полі timerDom
 * @param {Numder} value
 */
function iterate(deltaDate) {
  let value = deltaDate;
  buttonDom.addEventListener(
    'click',
    event => {
      // Перевіряємо, чи існує інтервал перед тим як створювати новий старий треба стерти
      if (outerItnervalId) {
        clearInterval(outerItnervalId);
      }
      // завдання сетІнтревалу() для рахування value
      let intervalId = setInterval(() => {
        //пертворення value до обєкту із 4 параметрами день, час, хвилина, секунда
        let objDateData = convertMs(value);
        // відображення знаяень у span
        addsDataToDom({ objDateData, timerDom });
        //зменьшення значення value на 1000мікросекунд
        value -= 1000;
        //умова завершення циклу та стирання сетІнтервалу()
        if (value < 0) {
          console.log('Done');
          clearInterval(intervalId);
        }
      }, 1000);
      //зберегли значення сетІнтревалу() для його видалення після завдання нового сетІнтервалу()
      outerItnervalId = intervalId;
    },
    { once: true } // працює лише 1 раз потім слухач зникає
  );
}

/**
 * функція відображення у елементах timerDom значеннь змінних у objDateData
 * @param { Object} objDateData - формат дати у виглдяді об'єкту { days, hours, minutes, seconds }
 * @param { NodeList} timerDom - timerDom - посилання на дом елементи в HTML
 */
function addsDataToDom({ objDateData, timerDom }) {
  // ітерація обєкту objDateData
  for (const item in objDateData) {
    // ітерація timerDom
    for (let i = 0; i < timerDom.length; i++) {
      //якщо i-тий елемент із датасет ==''
      if (timerDom[i].dataset[item] === '') {
        // якщо значення timerDom.textContent не змінилося у objDateData
        if (timerDom[i].textContent !== addsZero(objDateData[item])) {
          // змінити значення timerDom якщо значення objDateData відповідне змінилося
          timerDom[i].textContent = addsZero(objDateData[item]);
        }
      }
    }
  }
}

/**
 * функція додавання "0" до значень менших за 10
 * @param {Number} value - передане значення
 * @returns String
 */
function addsZero(value) {
  if (value < 10) return `0${value}`;
  return `${value}`;
}

/**
 * перетворення значень поточного часу у (ms) для отримання об'єкту із відповідними параметрами
 * @param {NUmber} ms значення часу у мс
 * @returns Object - { days, hours, minutes, seconds }
 */
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
