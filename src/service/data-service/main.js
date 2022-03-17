'use strict';

const {nanoid} = require(`nanoid`);
const {getDate} = require(`../cli/utils`);

class MainService {
  constructor(fileData, categoriesData) {
    this._data = JSON.parse(fileData);
    this._categories = categoriesData;
  }

  getAll() {
    return this._data;
  }

  find(articleId) {
    return this._data.find(({id}) => id === articleId);
  }

  getCategories() {
    return this._categories;
  }

  getSearchedData(textSearch) {
    return this._data.filter(({title}) => title.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1);
  }

  deleteArticle(articleId) {
    const item = this.find(articleId);

    if (!item) {
      return item;
    }

    const newData = this._data.filter(({id}) => id !== articleId);
    this._data = newData;
    return this._data;
  }

  deleteComment(articleId, commentId) {
    const item = this.find(articleId);

    if (!item) {
      return item;
    }

    const hasComment = item.comments.find(({id}) => id === commentId);

    if (!hasComment) {
      return hasComment;
    }

    const changedComments = item.comments.filter(({id}) => id !== commentId);

    const newData = this._data.map((element) => {
      if (element.id === articleId) {
        return {
          ...element,
          comments: changedComments,
        };
      }

      return element;
    });

    this._data = newData;

    return this._data;
  }

  editArticle(articleId, bodyArticle) {
    const editedItem = this.find(articleId);

    if (!editedItem) {
      return editedItem;
    }

    for (let key in bodyArticle) {
      if (bodyArticle.hasOwnProperty(key)) {
        editedItem[key] = bodyArticle[key];
      }
    }

    const newData = this._data.map((oldItem) => {
      if (oldItem.id === articleId) {
        return editedItem;
      }

      return oldItem;
    });

    this._data = newData;

    return this._data;
  }

  addNewArticle(bodyArticle) {
    this._data.push({
      ...bodyArticle,
      id: nanoid(6),
      createDate: getDate(),
      comments: [],
    });

    return this._data;
  }

  addNewComment(articleId, commentText) {
    const item = this.find(articleId);

    if (!item) {
      return item;
    }

    const newData = this._data.map((oldItem) => {
      if (oldItem.id === articleId) {
        return {
          ...oldItem,
          comments: [...oldItem.comments, {
            id: nanoid(6),
            text: commentText,
          }],
        };
      }

      return oldItem;
    });

    this._data = newData;

    return this._data;
  }
}

module.exports = MainService;
