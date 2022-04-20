import {showBigPicture} from './big-picture.js';

const listPictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPhoto = (photo) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('img').src = photo.url;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;

  picture.addEventListener('click', () => {
    showBigPicture(photo);
  });
  return picture;
};

const renderPhotos = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.appendChild(createPhoto(photo));
  });
  listPictures.appendChild(fragment);
};

export {renderPhotos, createPhoto};
