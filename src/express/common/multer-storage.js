'use strict';

const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const uploadDirAbsolute = path.resolve(__dirname, `../upload/img/`);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (_, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

module.exports = storage;
