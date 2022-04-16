import {debounce} from './util.js';

const RERENDER_DELAY = 500;

const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
const imgFilters = document.querySelector('.img-filters');

const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

const hideFilters = () => {
  imgFilters.classList.add('img-filters--inactive');
};

const setActiveButton = (activeButton) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  activeButton.classList.add('img-filters__button--active');
};

const initFilters = () => {
  const photoContainer = document.querySelector('.pictures');
  const photosList = Array.from(document.querySelectorAll('.picture'));

  const removePhotos = () => {
    photosList.forEach((photo) => {
      photo.remove();
    });
  };

  const addPhotos = (photos) => {
    photos.forEach((photo) => {
      photoContainer.append(photo);
    });
  };

  const debounceAddPhotos = debounce(addPhotos, RERENDER_DELAY);

  const getAmountComments = (photo) => photo.querySelector('.picture__comments').textContent;

  const compareComments = (photoA, photoB) => {
    const amountCommentsA = getAmountComments(photoA);
    const amountCommentsB = getAmountComments(photoB);

    return amountCommentsB - amountCommentsA;
  };

  defaultFilterButton.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    removePhotos();
    debounceAddPhotos(photosList);
  });

  randomFilterButton.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    removePhotos();
    const getRandomPhotos = photosList.slice().sort(() => Math.random() - 0.5).slice(0, 10);
    debounceAddPhotos(getRandomPhotos);
  });

  discussedFilterButton.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    removePhotos();
    const discussedPhotos = photosList.slice().sort(compareComments);
    debounceAddPhotos(discussedPhotos);
  });
};

export {showFilters, hideFilters, setActiveButton, initFilters};
