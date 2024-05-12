// // Описаний у документації
// import iziToast from "izitoast";
// // Додатковий імпорт стилів
// import "izitoast/dist/css/iziToast.min.css";

// let optionsIziToast = {
//   theme: 'ligth',
//   timeout: 5000,
//   message: 'Please choose a date in the future',
//   position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
//   progressBarColor: 'rgb(254, 80, 68)',
//   closeOnClick: true,
//   displayMode: 'once',
//   // messageSize: 22,
//   iconUrl: './img/x-circle.svg',
//   close: false,

// }

// iziToast.error(optionsIziToast);
// iziToast.success(optionsIziToast);

const form = document.querySelector('.form');
const timerDom = document.querySelectorAll('.form input');
// const stateDom = form.querySelectorAll('[state]');
const arrStr = ['delay','fulfilled','rejected'];
const asd = {}
for (const item of timerDom){
  arrStr.forEach((elem)=>{
    if(item[elem] === elem || item.value === elem){
      asd[delay] = item
    }
  })
}
// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('foo');
//   }, 300);

// });

// promise1.then((value) => {
//   console.log(value);
//   // Expected output: "foo"
// });
