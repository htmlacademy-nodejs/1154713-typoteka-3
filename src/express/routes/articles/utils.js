'use strict';

module.exports = {
  renderPostDetailPage: ({
    id,
    errorData,
    publication,
    usedCategoriesData,
    publicationComments,
    res,
  }) => {
    const validationError = errorData ? JSON.parse(decodeURIComponent(errorData)) : ``;

    const pageData = {
      id,
      publicationOwner: publication.publication_owner,
      publicationDate: publication.publication_date,
      title: publication.title,
      categories: usedCategoriesData,
      picture: publication.picture,
      fullText: publication.full_text,

      // TODO: формат дат в гггг-мм-дд
      comments: publicationComments,
      commentMessage: validationError?.bodyMessage ?? ``,
      errorMessage: validationError?.errorMessage,




      //isAuthorized: true,
    };

    res.render(`post/post-detail`, pageData);
  },

  renderPostEditPage: ({
    errorData,
    publication,
    id,
    res,
  }) => {
    const validationError = errorData ? JSON.parse(decodeURIComponent(errorData)) : ``;

    res.render(`post/post`, {
      pageTitle: `Редактирование публикации`,
      title: validationError?.body?.title ?? publication.title,
      announce: validationError?.body?.announce ?? publication.announce,
      [`full_text`]: validationError?.body?.[`full-text`] ?? publication.full_text,
      categories: publication.categories,
      isEditPage: true,
      id,
      validationError: validationError?.errorsMessageData ?? ``,
    });
  },

  renderAddPostPage: ({
    errorData,
    res,
  }) => {
    const validationError = errorData ? JSON.parse(decodeURIComponent(errorData)) : ``;

    res.render(`post/post`, {
      // временно без категории
      pageTitle: `Новая публикация`,
      title: validationError?.body?.title ?? ``,
      announce: validationError?.body?.announce ?? ``,
      [`full_text`]: validationError?.body?.[`full-text`] ?? ``,
      validationError: validationError?.errorsMessageData ?? ``,
    });
  },
};
