import {debounce} from './util.js';

const RERENDER_DELAY = 500;
const AMOUNT_RANDOM = 10;

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

const shuffleArray = (array) => {
  for (let j = array.length - 1; j > 0; j--) {
    const randomIndex = Math.floor(Math.random() * (j + 1));
    const temporaryValue = array[randomIndex];
    array[randomIndex] = array [j];
    array[j] = temporaryValue;
  }
  return array;
};

const initFilters = () => {
  const photoContainer = document.querySelector('.pictures');
  const pictures = Array.from(document.querySelectorAll('.picture'));

  const removePhotos = () => {
    pictures.forEach((photo) => {
      photo.remove();
    });
  };

  const addPhotos = (photos) => {
    const fragment = document.createDocumentFragment();
    photos.forEach((photo) => {
      fragment.append(photo);
    });
    photoContainer.append(fragment);
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
    debounceAddPhotos(pictures);
  });

  randomFilterButton.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    removePhotos();
    const copyPhotos = pictures.slice();
    const randomPhotos = shuffleArray(copyPhotos).slice(0, AMOUNT_RANDOM);
    debounceAddPhotos(randomPhotos);
  });

  discussedFilterButton.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    removePhotos();
    const discussedPhotos = pictures.slice().sort(compareComments);
    debounceAddPhotos(discussedPhotos);
  });
};

export {showFilters, hideFilters, setActiveButton, initFilters};
