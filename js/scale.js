const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const SCALE_STEP = 25;

const setScale = (value) => {
  const scale = parseInt(value, 10) / 100;
  imgUploadPreview.style.transform = `scale(${scale})`;
};

const scaleSmaller = () => {
  const newScale = parseInt(scaleControlValue.value, 10) - SCALE_STEP;
  if (newScale >= 25 ) {
    setScale(newScale);
    scaleControlValue.value = `${newScale}%`;
  }
};

const scaleBigger = () => {
  const newScale = parseInt(scaleControlValue.value, 10) + SCALE_STEP;
  if (newScale <= 100) {
    setScale(newScale);
    scaleControlValue.value = `${newScale}%`;
  }
};

const initScale = () => {
  scaleControlSmaller.addEventListener('click', scaleSmaller);
  scaleControlBigger.addEventListener('click', scaleBigger);
};

export {scaleControlValue, initScale};
