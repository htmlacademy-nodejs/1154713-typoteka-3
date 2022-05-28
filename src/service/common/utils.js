'use strict';

const {promises: {readFile, writeFile}} = require(`fs`);

const {getLogger} = require(`../lib/logger`);

const formatValue = (value) => String(value).length < 2 ? `0${value}` : String(value);

const getRangeRandomCount = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getTitle = (textData) => textData[getRangeRandomCount(0, textData.length - 1)];

const getDataFromFile = async (pathToFile) => {
  const fileData = await readFile(pathToFile, `utf-8`);
  return fileData.trim().split(/\r?\n/);
};



// del
const writeToMockJSON = async (content) => {
  const logger = getLogger(`writeToMockJSON-function`);

  try {


    // generate будет error
    await writeFile(`../../mock.json`, JSON.stringify(content));
    logger.info(`Файл записан УСПЕШНО.`);
    process.exit(0);
  } catch {
    logger.error(`ОШИБКА записи в файл.`);
    process.exit(1);
  }
};




const getText = (textData, maxStringLimit) => {
  const cicleCount = getRangeRandomCount(1, maxStringLimit);
  const result = [];

  for (let i = 0; i < cicleCount; i++) {
    const randomStringCount = getRangeRandomCount(0, textData.length - 1);
    result.push(textData[randomStringCount]);
  }

  return result;
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
  const logger = getLogger(`writeToMockJSON-function`);

  const argumentToNumber = Number(generateCount);

  if (!argumentToNumber || argumentToNumber === 0) {
    logger.error(`Некорректный аргумент для флага --generate.`);
    process.exit(1);
  }
};

const hasNeededBodyKeys = (bodyKeys, neededKeys) => {
  if (!bodyKeys.length || bodyKeys.length !== neededKeys.length) {
    return false;
  }

  return bodyKeys.every((bodyKey) => neededKeys.find((item) => item === bodyKey));
};

module.exports = {
  getTitle,
  getDataFromFile,
  writeToMockJSON,
  getText,
  getDate,
  checkGenerateCount,
  hasNeededBodyKeys,
};
