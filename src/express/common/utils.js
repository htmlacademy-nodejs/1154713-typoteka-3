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
  getLastComments: (lastCommentsData) => lastCommentsData.map(({comment_owner: commentOwner, comment_text: commentText}) => ({
    name: commentOwner,
    comment: commentText,
  })),
  getCardData: (allArticles) => allArticles.map(({categories, publication_date: publicationDate, title, announce, comments}) => ({
    categories,
    publicationDate,
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
