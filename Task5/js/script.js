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
              src="${item.file}"
              class="card-image"
            />
            <p class="card-text">${item.owner}</p>
          </div>
        `;
        cards = cards + cardBlock;
      });
        
      resultNode.innerHTML = cards;
}

// 4. Создаем функцию showDatа, которая принимает и проверяет введенные в input данные, для вызова функции useRequest
function showData() {

    const inputDataFirst = document.querySelector('.inputFirst').value;
    const inputDataSecond = document.querySelector('.inputSecond').value;
    let dataFirst = +inputDataFirst;
    let dataSecond = +inputDataSecond;

    console.log(dataFirst, dataSecond);

    if ((typeof(dataFirst) === 'number' && typeof(dataSecond) === 'number' && !isNaN(dataFirst) && !isNaN(dataSecond))) {

        if (dataFirst > 500 || dataFirst < 100 || dataSecond > 500 || dataSecond < 100) {
            msg.textContent = "Числа вне диапазона от 100 до 500";
            resultNode.innerHTML = "";

        } else {
            let url = `https://loremflickr.com/json/g/${dataFirst}/${dataSecond}/all`;
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