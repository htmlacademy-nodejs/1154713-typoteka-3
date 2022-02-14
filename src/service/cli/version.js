'use strict';

const {version} = require(`../../../package.json`);

module.exports = {
  run() {
    console.log(version);
    
    process.exit();
  }
};
