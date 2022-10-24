// 1. JSON, который мы будем парсить

const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;

// 2. Получаем данные

const data = JSON.parse(jsonString);

const list = data.list;

// 3. Выводим полученные данные в консоль

console.log('list:', list);