'use strict';

const Sequelize = require(`sequelize`);

const {define} = require(`../../db-models/index`);
const {getServerConfig} = require(`../../cli/server-config`);

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
const dbModels = define(mockDB);

module.exports = {
  serverConfig: getServerConfig(dbModels),
  mockDB,
  dbModels,
};
