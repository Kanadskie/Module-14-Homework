// 1. Получаем элементы DOM

const btn = document.querySelector('.btn');
const btnReset = document.querySelector('.btn-reset');
const msg = document.querySelector('.msg');
const result = document.querySelector('.result');

// 2. Объявляем функцию, которая делает запрос c помощью fetch

function sendRequest() {  

  fetch(`https://random.imagecdn.app/v1/image?width=${input1.value}&height=${input2.value}&category=buildings&format=json`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      writeOutput(formatOutput(data));
    })

}

// 3. Объявляем функцию, которая будет отображать полученные результаты из п.2 в DOM

function formatOutput(data) {

  let output = `
  <div class="card">
    <img src="${data.url}"/>
  </div>
  `
  return output;

}

function writeOutput(image) {

  result.innerHTML = image;

}

// 4. Объявляем функцию showDatа, которая принимает и проверяет введенные в input данные, для вызова функции sendRequest

function showData() {

  if ((typeof(+input1.value) === 'number' && typeof(+input2.value) === 'number' && !isNaN(+input1.value) && !isNaN(+input2.value))) {

      if (+input1.value > 500 || +input1.value < 100 || +input2.value > 500 || +input2.value < 100) {
          msg.textContent = "Числа вне диапазона от 100 до 500";
          result.innerHTML = "";

      } else {
        sendRequest()
        msg.textContent = "";
        result.innerHTML = "";
      }

  } else {
      msg.textContent = "Вы ввели не число";
      result.innerHTML = "";
  }

  resetAll();

}

// 5. Объявляем функцию для очищения введенных в input данных

function resetAll() {

  btnReset.addEventListener('click', () => {
      data = 0;
      msg.textContent = "";
      result.innerHTML = "";
  })

}

// 6. Созданем event при нажатии на кнопку "Отправить", которое вызывает функцию showData

btn.addEventListener('click', showData);