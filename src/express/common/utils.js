'use strict';

const {MIN_COMMENTS, NOT_FOUND_FLAG} = require(`../common/consts`);

module.exports = {
  getExistThemes: (allCategories, allArticles) => {
    const themesData = allCategories.reduce((result, item) => ({
      ...result,
      [item]: 0,
    }), {});

    const usedCategories = allArticles.reduce((result, {category}) => {
      result.push(...category);
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
    if (comments.length > MIN_COMMENTS) {
      result.push({
        announce,
        commentsCount: comments.length,
      });
    }
    return result;
  }, []),
  getLastComments: (allArticles) => allArticles.map(({comments}) => {
    const lastItem = comments[comments.length - 1];

    return {
      name: lastItem.id,
      comment: lastItem.text,
    };
  }),
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
  getSearchedData: (searchData) => searchData && searchData === NOT_FOUND_FLAG ? NOT_FOUND_FLAG : JSON.parse(searchData ?? `{}`),
};
