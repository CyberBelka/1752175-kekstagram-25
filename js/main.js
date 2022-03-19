import {createPhotos} from './data.js';
import {checkCommentLength} from './util.js';
import './picture.js';

// eslint-disable-next-line no-console
console.log(
  createPhotos(25)
);

// eslint-disable-next-line no-console
console.log(
  checkCommentLength('Some comment', 140)
);
