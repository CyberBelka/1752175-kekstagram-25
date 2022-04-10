const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const SCALE_STEP = 25;

const setScale = (value) => {
  const scale = parseInt(value, 10) / 100;
  imgUploadPreview.style.transform = `scale(${scale})`;
};

const buttonSmallerClickHahdler = () => {
  const newScale = parseInt(scaleControlValue.value, 10) - SCALE_STEP;
  if (newScale >= 25 ) {
    setScale(newScale);
    scaleControlValue.value = `${newScale}%`;
  }
};

const buttonBiggerClickHahdler = () => {
  const newScale = parseInt(scaleControlValue.value, 10) + SCALE_STEP;
  if (newScale <= 100) {
    setScale(newScale);
    scaleControlValue.value = `${newScale}%`;
  }
};

const initScale = () => {
  scaleControlSmaller.addEventListener('click', buttonSmallerClickHahdler);
  scaleControlBigger.addEventListener('click', buttonBiggerClickHahdler);
};

export {scaleControlValue, initScale};
