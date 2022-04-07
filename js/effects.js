const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const effectLevel = sliderContainer.querySelector('.effect-level__value');
const uploadPreview = document.querySelector('.img-upload__preview');
const imgUploadPreview = uploadPreview.querySelector('img');
const imgUploadEffects = document.querySelector('.img-upload__effects');

let currentEffect;

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const hideSlider = () => {
  if (currentEffect === 'none') {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

const changeEffect = (evt) => {
  currentEffect = evt.target.value;
  imgUploadPreview.classList.add(`effects__preview--${currentEffect}`);
  hideSlider();
  if (currentEffect === 'none' || currentEffect === 'chrome' || currentEffect === 'sepia') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
  if (currentEffect === 'marvin') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }
  if (currentEffect === 'phobos') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
  if (currentEffect === 'heat') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
};

slider.noUiSlider.on('update', () => {
  effectLevel.value = slider.noUiSlider.get();
  if (currentEffect === 'none') {
    imgUploadPreview.style.filter = 'none';
  }
  if (currentEffect === 'chrome') {
    imgUploadPreview.style.filter = `grayscale(${effectLevel.value})`;
  }
  if (currentEffect === 'sepia') {
    imgUploadPreview.style.filter = `sepia(${effectLevel.value})`;
  }
  if (currentEffect === 'marvin') {
    imgUploadPreview.style.filter = `invert(${effectLevel.value}%)`;
  }
  if (currentEffect === 'phobos') {
    imgUploadPreview.style.filter = `blur(${effectLevel.value}px)`;
  }
  if (currentEffect === 'heat') {
    imgUploadPreview.style.filter = `brightness(${effectLevel.value})`;
  }
});

const initSlider = () => {
  currentEffect = 'none';
  hideSlider();
  imgUploadEffects.addEventListener('click', changeEffect);
};

export {initSlider};
