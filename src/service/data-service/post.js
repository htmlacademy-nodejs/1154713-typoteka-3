'use strict';

class PostService {
  constructor(fileData) {
    this._data = fileData;
  }

  getAll() {
    return JSON.parse(this._data);
  }
}

module.exports = PostService;
