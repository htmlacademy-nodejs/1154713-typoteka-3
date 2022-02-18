'use strict';

module.exports = {
  run() {
    console.log(`Программа запускает http-сервер и формирует файл с данными для API.`);
    console.log(`
        Гайд:
        service.js <command>
        Команды:
            --version:            выводит номер версии
            --help:               печатает этот текст
            --generate <count>    формирует файл mocks.json
    `);
    process.exit();
  }
};
