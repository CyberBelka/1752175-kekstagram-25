import {isEscapeKey, focused} from './util.js';
import {scaleControlValue} from './scale.js';
import {sendData} from './api.js';
import {blockSubmitButton, unblockSubmitButton, showFormMessage} from './form-submit.js';

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
const errorButton = errorMessage.querySelector('error__button');

const uploadFormEscKeydownHandler = (evt) => {
  if (isEscapeKey(evt) && focused(textHashtags) && focused(textDescription)) {
    evt.preventDefault();
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadForm.reset();
  }
};

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scaleControlValue.value = '100%';

  document.addEventListener('keydown', uploadFormEscKeydownHandler);
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();

  document.removeEventListener('keydown', uploadFormEscKeydownHandler);
};

const pristine = new Pristine(uploadForm, {
  classTo: 'text',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

pristine.addValidator(textHashtags, () => {
  const hashtags = textHashtags.value.split(' ');
  return hashtags.length <= 5;
}, 'Не более 5 хэш-тегов', 1, true);

pristine.addValidator(textHashtags, () => {
  if (textHashtags.value === '') {
    return true;
  }

  const hashtags = textHashtags.value.split(' ');
  return !hashtags.some((hashtag) => !hashtag || !regular.test(hashtag));
}, 'Некорректный хэш-тег', 2, true);

pristine.addValidator(textHashtags, () => {
  const hashtags = textHashtags.value.split(' ');
  for (let i = 0; i < hashtags.length; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase() && hashtags[i] !== '') {
        return false;
      }
    }
  }
  return true;
}, 'Хэш-теги не должны повторяться', 3, true);

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
          showFormMessage(templateSuccess, successButton, '.success',);
        },
        () => {
          closeUploadForm();
          unblockSubmitButton();
          showFormMessage(templateError, errorButton, '.error',);
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
