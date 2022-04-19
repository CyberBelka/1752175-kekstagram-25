const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const effectLevel = sliderContainer.querySelector('.effect-level__value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const imgUploadEffects = document.querySelector('.img-upload__effects');

let currentEffect;

const switchSlider = () => {
  if (currentEffect === 'none') {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

const imgClickHandler = (evt) => {
  imgUploadPreview.classList.remove(`effects__preview--${currentEffect}`);
  currentEffect = evt.target.value;
  imgUploadPreview.classList.add(`effects__preview--${currentEffect}`);
  switchSlider();
  switch (currentEffect) {
    case 'none':
    case 'chrome':
    case 'sepia':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'marvin':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;
    case 'phobos':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    case 'heat':
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
  }
};

const initSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  imgUploadEffects.addEventListener('click', imgClickHandler);
  slider.noUiSlider.on('update', () => {
    effectLevel.value = slider.noUiSlider.get();
    switch (currentEffect) {
      case 'none':
        imgUploadPreview.style.filter = 'none';
        break;
      case 'chrome':
        imgUploadPreview.style.filter = `grayscale(${effectLevel.value})`;
        break;
      case 'sepia':
        imgUploadPreview.style.filter = `sepia(${effectLevel.value})`;
        break;
      case 'marvin':
        imgUploadPreview.style.filter = `invert(${effectLevel.value}%)`;
        break;
      case 'phobos':
        imgUploadPreview.style.filter = `blur(${effectLevel.value}px)`;
        break;
      case 'heat':
        imgUploadPreview.style.filter = `brightness(${effectLevel.value})`;
        break;
    }
  });

  currentEffect = 'none';

  switchSlider();
};

export {sliderContainer, imgUploadPreview, initSlider};
