'use strict';

class PostService {
  constructor(fileData) {
    this._data = fileData;
  }

  getAll() {
    return this._data;
  }
}

module.exports = PostService;
