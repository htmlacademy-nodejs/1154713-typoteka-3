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
  getUpdatedCommentsData: (allArticles) => allArticles.reduce((result, {publication_owner: publicationOwner, title, publication_date: publicationDate, comments}) => {
    const currentPublication = {
      publicationOwner,
      title,
      publicationDate,
    };

    comments.forEach((textComment) => result.push({
      text: textComment,
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
  getPages: (publicationsCount, currentPage) => {
    const result = [];

    const pagesCount = Math.ceil(publicationsCount / 8);

    // доработать с учетом стр а не кол-ва публикаций

    for (let pageNumber = 1; pageNumber < pagesCount + 1; pageNumber++) {
      result.push(pageNumber);
    }



    return result;
  },
};
