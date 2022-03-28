import {similarPhotos} from './main.js';

const listPhotos = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('a');

// TODO заменить 2-е функции (handlePictureClick, createBigPicture) на одну в параметрах
const createPhotoElement = (photo, pictureClickHandler) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  // Создать обработчик на click
  photoElement.addEventListener('click', () => {
    // Открываем модальное окно с данными
    pictureClickHandler(photo);
  });
  return photoElement;
};

const renderPhotos = (pictureClickHandler) => {
  const fragment = document.createDocumentFragment();
  similarPhotos.forEach((photo) => {
    listPhotos.appendChild(createPhotoElement(photo, pictureClickHandler));
  });
  listPhotos.appendChild(fragment);
};


export {renderPhotos, createPhotoElement};
