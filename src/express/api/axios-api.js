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

  getAllArticles(pageNumber) {
    return this._load(`/api/articles`, {
      method: `GET`,
      data: pageNumber,
    });
  }

  getAllCategories() {
    return this._load(`/api/categories`);
  }

  getArticle(id) {
    return this._load(`/api/articles/${id}`);
  }

  setNewPost(data) {
    return this._load(`/api/articles`, {
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

  getCategoryDataById(id) {
    return this._load(`/api/articles/category/${id}`);
  }

  setNewComment(id, data) {
    return this._load(`/api/articles/${id}/comments`, {
      method: `POST`,
      data,
    });
  }

  updatePublication(id, data) {
    return this._load(`/api/articles/${id}`, {
      method: `PUT`,
      data,
    });
  }
}

module.exports = AxiosApi;
