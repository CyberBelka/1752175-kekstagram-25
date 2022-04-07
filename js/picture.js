const listPhotos = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('a');

const createPhotoElement = (photo, pictureClickHandler) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  photoElement.addEventListener('click', () => {
    pictureClickHandler(photo);
  });
  return photoElement;
};

const renderPhotos = (photos, pictureClickHandler) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    listPhotos.appendChild(createPhotoElement(photo, pictureClickHandler));
  });
  listPhotos.appendChild(fragment);
};


export {renderPhotos, createPhotoElement};
