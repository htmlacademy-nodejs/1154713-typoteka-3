'use strict';

const {writeFile} = require(`fs`);

const formatValue = (value) => String(value).length < 2 ? `0${value}` : String(value);

const getRangeRandomCount = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getTitle = (textData) => textData[getRangeRandomCount(0, textData.length - 1)];

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

const writeToFile = (outputPath, content) => {
  writeFile(outputPath, content, (error) => {
    if (error) {
      console.log(`ОШИБКА записи в файл.`);
      process.exit(1);
    } else {
      console.log(`Файл записан УСПЕШНО.`);
      process.exit(0);
    }
  });
};

const checkGenerateCount = (generateCount) => {
  const argumentToNumber = Number(generateCount);

  if (!argumentToNumber || argumentToNumber === 0) {
    console.log(`Некорректный аргумент для флага --generate.`);
    process.exit(1);
  }
};

module.exports = {
  getTitle,
  getText,
  getDate,
  writeToFile,
  checkGenerateCount,
};
