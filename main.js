// fetch("https://www.cbr-xml-daily.ru/daily_json.js")
//   .then(function (result) {
//     return result.json();
//   })
//   .then(function (data) {});
const rates = {};
const elementUSD = document.querySelector('[data-value="USD"');
const elementEUR = document.querySelector('[data-value="EUR"');
const elementGBP = document.querySelector('[data-value="GBP"');

const input = document.querySelector("#input");
const result = document.querySelector("#result");
const select = document.querySelector("#select");

// Вытаскиваем данные курсов из сайта валют
async function getCurrentcies() {
  const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  const data = await response.json();
  const result = await data;

  // Добавили валюту в объект
  rates.USD = result.Valute.USD;
  rates.EUR = result.Valute.EUR;
  rates.GBP = result.Valute.GBP;

  // Присваиваем данные валют элементам страницы
  elementUSD.textContent = rates.USD.Value.toFixed(2);
  elementEUR.textContent = rates.EUR.Value.toFixed(2);
  elementGBP.textContent = rates.GBP.Value.toFixed(2);

  // Если доллар стал ниже - зеленый, наоборот - красный
  rates.USD.Value > rates.USD.Value
    ? elementUSD.classList.add("top")
    : elementUSD.classList.add("bottom");

  rates.EUR.Value > rates.EUR.Value
    ? elementEUR.classList.add("top")
    : elementEUR.classList.add("bottom");

  rates.GBP.Value > rates.GBP.Value
    ? elementGBP.classList.add("top")
    : elementGBP.classList.add("bottom");
}

getCurrentcies();

// Контроль изменений в инпуте и селекте
input.oninput = convertValue;
select.oninput = convertValue;

// Конвертирование
function convertValue() {
  result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(
    2
  );
}
