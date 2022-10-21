// 1. XML, который мы будем парсить
const xmlString = `
  <list>
    <student>
      <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    <student>
      <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
    </student>
  </list>
`;

// 2. Создание экземпляра класса DOMParser
const parser = new DOMParser(); 

// 3. Создание пустого массива, куда буду помещены полученные данные
const list = [];

// 4. Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, 'text/xml');

// 5. Получаем из DOM все элементы с тэгом 'student'
const students = xmlDOM.querySelectorAll('student');

// 6. Перебираем внутри этих элементов другие тэги, формируем из них свойства-значения для объектов и добавляем их в массив list;
students.forEach(node => {
  let student = {
    name: `${node.querySelector('first').textContent} ${node.querySelector('second').textContent}`,
    age: node.querySelector('age').textContent,
    prof: node.querySelector('prof').textContent,
    lang: node.querySelector('name').getAttribute('lang')
    }
    list.push(student);
});

// 7. Вывод списка в консоль
console.log('list:', list);