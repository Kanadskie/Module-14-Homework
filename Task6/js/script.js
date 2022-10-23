// 1. Получаем элементы DOM
const btn = document.querySelector('.btn');
const btnReset = document.querySelector('.btn-reset');
const msg = document.querySelector('.msg');
const result = document.querySelector('.result');

const apiKey = "OwdEYwQ-Uv-4dI2uew06efHTSF8tRpgE9U4lWYpZI6A";

// 2. Объявляем функцию, которая делает запрос c помощью fetch
function sendRequest(callback) { 

  const numImagesAvailable = 12;
  let randomNumber = Math.floor(Math.random() * numImagesAvailable);

  fetch(`https://api.unsplash.com/photos/?per_page=${randomNumber}&client_id=${apiKey}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
        localStorage.setItem('myJSON', JSON.stringify(data))
        writeOutput(formatOutput(data));
        
      })
  }

// 3. Объявляем функцию, которая будет отображать полученные результаты из п.2 в DOM
function formatOutput(data) {

  const imageWidth = document.querySelector('#input1').value;
  const imageHeight = document.querySelector('#input2').value;

  let cards = '';

    data.forEach(function(item, index) {
      let cardBlock = `
      <div class="card">
      <img src="${data[index].urls.small}" width="${imageWidth}" height="${imageHeight}"/>
      <p class="card-text">${data[index].user.first_name}</p>
      </div>
      `;
      cards = cards + cardBlock;
    });
    return cards;
}

function writeOutput(image) {
  result.innerHTML = image;
}

// 4. Объявляем функцию showDatа, которая принимает и проверяет введенные в input данные, для вызова функции sendRequest
function showData() {

  if ((typeof(+input1.value) === 'number' && typeof(+input2.value) === 'number' && !isNaN(+input1.value) && !isNaN(+input2.value))) {

      if (+input1.value > 500 || +input1.value < 100) {
        msg.textContent = "Ширина картинки вне диапазона от 100 до 500";
        result.innerHTML = "";

      } else if (+input2.value > 500 || +input2.value < 100) {
        msg.textContent = "Высота картинки вне диапазона от 100 до 500";
        result.innerHTML = "";
      
      } else {
        const myJSON = localStorage.getItem('myJSON');
        if (myJSON) {
          JSON.parse(myJSON)
        } else {
          sendRequest()
          msg.textContent = "";
          result.innerHTML = "";
        }

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
      data = "";
      msg.textContent = "";
      result.innerHTML = "";
  })
}

// 6. Созданем event при нажатии на кнопку "Отправить", которое вызывает функцию showData
btn.addEventListener('click', showData);