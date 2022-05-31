'use strict';

const {getServerConfig} = require(`./server-config`);
const {getLogger} = require(`../lib/logger`);
const {createDBInstance} = require(`../api/db-connect`);
const {define} = require(`../db-models/index`);

module.exports = {
  run: async (port = 3000) => {
    const logger = getLogger(`server`);

    const db = createDBInstance();
    const dbModels = define(db);

    try {
      logger.info(`Trying to connect to database...`);

      await db.authenticate();
      await db.sync();

      logger.info(`Connection to DB is OK`);

      const serverConfig = getServerConfig(dbModels);

      serverConfig.listen(port, () => logger.info(`Server started...`));
    } catch ({message}) {
      logger.error(`Error: ${message}`);
    }
  },
};
