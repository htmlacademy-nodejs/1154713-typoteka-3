'use strict';

const pino = require(`pino`);

const LOG_LEVEL = process.env.LOG_LEVEL || `info`;

const LOGGER = pino({
  level: LOG_LEVEL,
  prettyPrint: LOG_LEVEL === `debug` ? {
    translateTime: true,
    colorize: false,
    mkdir: true
  } : false,
}, LOG_LEVEL === `debug` ? pino.destination(`./logs/api.log`) : process.stdout);

module.exports = {
  getLogger: (name) => LOGGER.child({
    name,
  }),
};
