'use strict';

const hasNeededBodyKeys = (bodyKeys, neededKeys) => {
  if (!bodyKeys.length || bodyKeys.length !== neededKeys.length) {
    return false;
  }

  return bodyKeys.every((bodyKey) => neededKeys.find((item) => item === bodyKey));
};

module.exports = {
  hasNeededBodyKeys,
};
