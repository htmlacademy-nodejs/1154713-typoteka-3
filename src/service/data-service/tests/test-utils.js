'use strict';

const getUpdatedArrayData = (strData) => strData ? Array.from(new Set(strData.split(`|`))) : strData;

module.exports = {
  getUpdatedArrayData,
  getUpdatedData: (data) => data.map(({categories, comments, ...rest}) => ({
    ...rest,
    categories: getUpdatedArrayData(categories),
    comments: getUpdatedArrayData(comments),
  })),
};
