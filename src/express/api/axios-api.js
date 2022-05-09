'use strict';

const axios = require(`axios`);

class AxiosApi {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  getAllArticles() {
    return this._load(`/api/articles`);
  }

  getArticle(id) {
    return this._load(`api/articles/${id}`);
  }

  getAllCategories() {
    return this._load(`/api/categories`);
  }

  setNewPost(data) {
    return this._load(`api/articles`, {
      method: `POST`,
      data,
    });
  }

  getSearchData(data) {
    return this._load(`/api/search`, {
      method: `GET`,
      data,
    });
  }
}

module.exports = AxiosApi;
