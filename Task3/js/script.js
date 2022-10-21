// 1. Получаем элементы DOM
const msg = document.querySelector('.msg');
const btn = document.querySelector('.btn');
const btnReset = document.querySelector('.btn-reset');
const resultNode = document.querySelector('.result');

// 2. Делаем запрос XHR вызывающийся функцией useRequest
function useRequest(url, callback) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                return callback(result);
            }
        }
    }

    xhr.onerror = function() {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    }

    xhr.send();
};

// 3. Создаем функцию, которая будет отображать полученные результаты из п.2 в DOM
function displayResult(apiData) {
    let cards = '';

    apiData.forEach(item => {
        const cardBlock = `
          <div class="card">
            <img
              src="${item.download_url}"
              class="card-image"
            />
            <p class="card-text">${item.author}</p>
          </div>
        `;
        cards = cards + cardBlock;
      });
        
      resultNode.innerHTML = cards;
}

// 4. Создаем функцию showDatа, которая принимает и проверяет введенные в input данные, для вызова функции useRequest
function showData() {

    const inputData = document.querySelector('input').value;
    let data = +inputData;

    console.log(data);

    if ((typeof(data) === 'number' && !isNaN(data))) {

        if (data > 10 || data < 1 && data !== 0) {
            msg.textContent = "Число вне диапазона от 1 до 10";
            resultNode.innerHTML = "";

        } else if (data === 0) {
            msg.textContent = "Вы ничего не ввели";
            resultNode.innerHTML = "";

        } else {
            let url = `https://picsum.photos/v2/list/?limit=${data}`;
            useRequest(url, displayResult);
            msg.textContent = "";
        }

    } else {
        msg.textContent = "Вы ввели не число";
        resultNode.innerHTML = "";
    }

    resetAll();
}

// 5. Создаем функцию для очищения введенных в input данных
function resetAll() {
    btnReset.addEventListener('click', () => {
        data = 0;
        msg.textContent = "";
        resultNode.innerHTML = "";
    })
}

// 6. Созданем event при нажатии на кнопку "Отправить", которое вызывает функцию showData
btn.addEventListener('click', showData);