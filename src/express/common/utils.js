'use strict';

const {MIN_COMMENTS, NOT_FOUND_FLAG} = require(`../common/consts`);

module.exports = {
  getExistThemes: (allCategories, allArticles) => {
    const themesData = allCategories.reduce((result, {category_name: categoryName}) => ({
      ...result,
      [categoryName]: 0,
    }), {});

    const usedCategories = allArticles.reduce((result, {categories}) => {
      result.push(...categories);
      return result;
    }, []);

    usedCategories.forEach((item) => {
      if (item in themesData) {
        themesData[item] = themesData[item] + 1;
      }
    });

    return themesData;
  },
  getMostCommentedItems: (allArticles) => allArticles.reduce((result, {announce, comments}) => {
    if (comments.length >= MIN_COMMENTS) {
      result.push({
        announce,
        commentsCount: comments.length,
      });
    }
    return result;
  }, []),





  // usera последнего комментария в публикации
  getLastComment: (allArticles) => allArticles.reduce((result, {user, comments}) => {
    const lastItem = comments[comments.length - 1];

    if (lastItem) {
      result.push({
        name: id,
        comment: lastItem,
      });
    }

    return result;
  }, []),





  getCardData: (allArticles) => allArticles.map(({category, createdDate, title, announce, comments}) => ({
    category,
    createdDate,
    title,
    announce,
    commentsCount: comments.length,
  })),




  getUsersRecordData: (allArticles) => allArticles.map(({createdDate, title}) => ({
    title,
    createdDate,
  })),
  getUpdatedCommentsData: (allArticles) => allArticles.reduce((result, {id, title, createdDate, comments}) => {
    const currentPublication = {
      id,
      title,
      createdDate,
    };

    comments.forEach(({text}) => result.push({
      text,
      ...currentPublication,
    }));

    return result;
  }, []),
  getResultData: (search, result) => {
    if (search) {
      return result ?? NOT_FOUND_FLAG;
    }

    return ``;
  },
};
