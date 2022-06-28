'use strict';

const {DB_TYPE} = process.env;

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

  getIncludeAttributes(sequelizeLib) {
    return [
      [
        (
          DB_TYPE
            ? sequelizeLib.fn(`array_agg`, sequelizeLib.fn(`DISTINCT`, sequelizeLib.col(`categories.category_name`)))
            : sequelizeLib.fn(`group_concat`, sequelizeLib.col(`categories.category_name`), `|`)
        ), `categories`
      ],
      [
        (
          DB_TYPE
            ? sequelizeLib.fn(`array_agg`, sequelizeLib.fn(`DISTINCT`, sequelizeLib.col(`comments-publication.comment_text`)))
            : sequelizeLib.fn(`group_concat`, sequelizeLib.col(`comments-publication.comment_text`), `|`)
        ), `comments`
      ],
      [
        (
          DB_TYPE
            ? sequelizeLib.fn(`concat`, sequelizeLib.col(`User.user_name`), ` `, sequelizeLib.col(`User.user_surname`))
            : sequelizeLib.literal(`User.user_name || ' ' || User.user_surname`)
        ), `publication_owner`
      ],
    ];
  }
}

module.exports = BaseUtils;

