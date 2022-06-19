'use strict';

class BaseUtils {
  getOffsetNumber(totalCount, page) {
    const limit = 8;
    const allPublicationsNumber = [];

    for (let number = 0; number < totalCount; number = number + limit) {
      allPublicationsNumber.push(number);
    }

    return allPublicationsNumber[page - 1];
  }

  getIncludeModels() {
    return [
      {
        model: this._categories,
        as: `categories`,
        through: {
          attributes: [],
        },
        attributes: [],
      },
      {
        model: this._comments,
        as: `comments-publication`,
        attributes: [],
      },
      {
        model: this._user,
        as: `User`,
        attributes: [],
      },
    ];
  }

  getIncludeAttributes(sequilizeLib) {
    return [
      [
        sequilizeLib.fn(`array_agg`, sequilizeLib.fn(`DISTINCT`, sequilizeLib.col(`categories.category_name`))), `categories`
      ],
      [
        sequilizeLib.fn(`array_agg`, sequilizeLib.fn(`DISTINCT`, sequilizeLib.col(`comments-publication.comment_text`))), `comments`
      ],
      [
        sequilizeLib.fn(`concat`, sequilizeLib.col(`User.user_name`), ` `, sequilizeLib.col(`User.user_surname`)), `publication_owner`
      ],
    ];
  }
}

module.exports = BaseUtils;
