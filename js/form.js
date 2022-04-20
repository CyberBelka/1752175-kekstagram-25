import {isEscapeKey, isFocused} from './util.js';
import {uploadPreview, scaleControlValue} from './scale.js';
import {sendData} from './api.js';
import {blockSubmitButton, unblockSubmitButton, showFormMessage} from './form-submit.js';
import {sliderContainer, imgUploadPreview} from './effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');
const regular = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;

const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const successMessage = templateSuccess.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');
const templateError = document.querySelector('#error').content.querySelector('.error');
const errorMessage = templateError.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

const pristine = new Pristine(uploadForm, {
  classTo: 'check',
  errorClass: 'check--invalid',
  successClass: 'check--valid',
  errorTextParent: 'check',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scaleControlValue.value = '100%';
  imgUploadPreview.style.filter = 'none';

  document.addEventListener('keydown', uploadFormEscKeydownHandler);
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  uploadPreview.style.transform = `scale(${1})`;
  imgUploadPreview.removeAttribute('class');
  sliderContainer.classList.add('hidden');

  document.removeEventListener('keydown', uploadFormEscKeydownHandler);
};

function uploadFormEscKeydownHandler (evt) {
  if (isEscapeKey(evt) && isFocused(textHashtags) && isFocused(textDescription)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const getHashtags = (string) => string.split(' ');

pristine.addValidator(textHashtags, () => {
  const hashtags = getHashtags(textHashtags.value);
  return hashtags.length <= 5;
}, 'Не более 5 хэш-тегов', 3, true);

pristine.addValidator(textHashtags, () => {
  if (textHashtags.value === '') {
    return true;
  }

  const hashtags = getHashtags(textHashtags.value);
  return !hashtags.some((hashtag) => !hashtag || !regular.test(hashtag));
}, 'Некорректный хэш-тег', 1, true);

pristine.addValidator(textHashtags, () => {
  const hashtagsIdentity = textHashtags.value.toLowerCase();
  const hashtags = getHashtags(hashtagsIdentity);
  const hashtagsSet = new Set(hashtags);
  return hashtags.length === hashtagsSet.size;
}, 'Хэш-теги не должны повторяться', 2, true);

pristine.addValidator(textDescription, () => textDescription.value.length <= 140, 'Не более 140 символов', 1, true);

const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showFormMessage(templateSuccess, successButton, '.success');
        },
        () => {
          closeUploadForm();
          unblockSubmitButton();
          showFormMessage(templateError, errorButton, '.error');
        },
        new FormData(evt.target),
      );
    }
  });
};

const initPhotoUPload = () => {
  uploadInput.addEventListener('change', () => {
    openUploadForm();
  });
  uploadCancel.addEventListener('click', () => {
    closeUploadForm();
  });
};

export {initPhotoUPload, setUserFormSubmit, closeUploadForm};
