import {createPhotos} from './data.js';

const listPhotos = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('a');

const similarPhotos = createPhotos(25);

const fragment = document.createDocumentFragment();

similarPhotos.forEach((photo) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  fragment.appendChild(photoElement);
});

listPhotos.appendChild(fragment);

