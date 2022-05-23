'use strict';

const {promises: {readFile}} = require(`fs`);

const {getDataFromFile} = require(`./utils`);
const {getServerConfig} = require(`./server-config`);

const {getLogger} = require(`../lib/logger`);

const {createDBInstance} = require(`../api/db-connect`);

module.exports = {
  run: async (port = 3000) => {
    const logger = getLogger(`server`);

    const db = createDBInstance();

    try {
      logger.info(`Trying to connect to database...`);

      await db.authenticate();
      logger.info(`Connection to DB is OK`);

      const fileData = await readFile(`mock.json`);
      const categoriesData = await getDataFromFile(`./data/categories.txt`);

      const serverConfig = getServerConfig(JSON.parse(fileData), categoriesData);

      serverConfig.listen(port, () => logger.info(`Server started...`));
    } catch ({message}) {
      logger.error(`Error: ${message}`);
    }
  },
};
