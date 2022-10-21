// 1. Создаем Promise, который с задержкой 3 секунды генерирует случайное число, если число четное то вызывается resolve, если нечетное то вызывается reject
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let min = 1;
        let max = 100;
        let randomNum = Math.floor(Math.random() * (max - min + 1) + min);
        if (randomNum% 2 === 0) {
            resolve(`Завершено успешно. Сгенерированное число — ${randomNum}`);
         } else {
            reject(`Завершено с ошибкой. Сгенерированное число — ${randomNum}`);
        }
    }, 3000);

})

// 2. Выполняем Promise
myPromise
  .then((result) => {
    console.log('Обрабатываем resolve', result);
  })
  .catch((error) => {
    console.log('Обрабатываем reject', error);
  });