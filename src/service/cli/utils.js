'use strict';

const {promises: {readFile, writeFile}} = require(`fs`);
const {red, green} = require(`chalk`);
const {ANSWER_ERROR} = require(`./consts`);

const formatValue = (value) => String(value).length < 2 ? `0${value}` : String(value);

const getRangeRandomCount = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getTitle = (textData) => textData[getRangeRandomCount(0, textData.length - 1)];

const getDataFromFile = async (pathToFile, isTextFile = true) => {
  const fileData = await readFile(pathToFile, `utf-8`);
  return isTextFile ? fileData.trim().split(`\n`) : fileData;
};

const writeToMockJSON = async (content) => {
  try {
    await writeFile(`../../mock.json`, JSON.stringify(content));
    console.log(green(`Файл записан УСПЕШНО.`));
    process.exit(0);
  } catch {
    console.log(red(`ОШИБКА записи в файл.`));
    process.exit(1);
  }
};

const getText = (textData, maxStringLimit, joinSymbol = ` `) => {
  const cicleCount = getRangeRandomCount(1, maxStringLimit);
  const result = [];

  for (let i = 0; i < cicleCount; i++) {
    const randomStringCount = getRangeRandomCount(0, textData.length - 1);
    result.push(textData[randomStringCount]);
  }

  return result.join(joinSymbol);
};

const getDate = () => {
  const nowDate = new Date();
  const nowDateMilliseconds = nowDate.getTime();

  const threeMonthAgoDate = new Date(new Date().setMonth(nowDate.getMonth() - 2));
  const threeMonthAgoDateMilliseconds = threeMonthAgoDate.getTime();

  const randomDate = new Date(getRangeRandomCount(threeMonthAgoDateMilliseconds, nowDateMilliseconds));

  const year = randomDate.getFullYear();
  const month = randomDate.getMonth() + 1;
  const day = randomDate.getDate();
  const hours = randomDate.getHours();
  const minutes = randomDate.getMinutes();
  const seconds = randomDate.getSeconds();

  return `${formatValue(year)}-${formatValue(month)}-${formatValue(day)} ${formatValue(hours)}:${formatValue(minutes)}:${formatValue(seconds)}`;
};

const checkGenerateCount = (generateCount) => {
  const argumentToNumber = Number(generateCount);

  if (!argumentToNumber || argumentToNumber === 0) {
    console.log(red(`Некорректный аргумент для флага --generate.`));
    process.exit(1);
  }
};

const getResponseErrorScenario = (responseObject) => {
  responseObject.writeHead(ANSWER_ERROR, {
    'Content-type': `text/plain`
  });

  responseObject.end(`Not found`);
};

const getHtmlPage = (contentData) => {
  const listTags = contentData.map((item) => `<li>${item}</li>`).join(``);

  return `
  <!DOCTYPE html>
  <html lang="ru">
    <head>
      <title>Typoteka</title>
    </head>
    <body>
      <ul>
      ${listTags}
      </ul>
    </body>
  </html>
  `;
};

module.exports = {
  getTitle,
  getDataFromFile,
  writeToMockJSON,
  getText,
  getDate,
  checkGenerateCount,
  getResponseErrorScenario,
  getHtmlPage,
};
