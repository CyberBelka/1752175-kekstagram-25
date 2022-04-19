const SCALE_STEP = 25;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPreview = document.querySelector('.img-upload__preview');

const setScale = (value) => {
  const scale = parseInt(value, 10) / 100;
  uploadPreview.style.transform = `scale(${scale})`;
};

const buttonSmallerClickHandler = () => {
  const newScale = parseInt(scaleControlValue.value, 10) - SCALE_STEP;
  if (newScale >= 25 ) {
    setScale(newScale);
    scaleControlValue.value = `${newScale}%`;
  }
};

const buttonBiggerClickHandler = () => {
  const newScale = parseInt(scaleControlValue.value, 10) + SCALE_STEP;
  if (newScale <= 100) {
    setScale(newScale);
    scaleControlValue.value = `${newScale}%`;
  }
};

const initScale = () => {
  scaleControlSmaller.addEventListener('click', buttonSmallerClickHandler);
  scaleControlBigger.addEventListener('click', buttonBiggerClickHandler);
};

export {uploadPreview, scaleControlValue, initScale};
