import {showBigPicture} from './big-picture.js';

const listPhotos = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('a');

const createPhotoElement = (photo) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  photoElement.addEventListener('click', () => {
    showBigPicture(photo);
  });
  return photoElement;
};

const renderPhotos = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    listPhotos.appendChild(createPhotoElement(photo));
  });
  listPhotos.appendChild(fragment);
};

export {renderPhotos, createPhotoElement};
