'use strict';

const help = require(`./help`);
const version = require(`./version`);
const server = require(`./server`);

module.exports = {
  application: {
    help,
    version,
    server,
  }
};
