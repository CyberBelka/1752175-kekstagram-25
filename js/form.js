import {isEscapeKey} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const regular = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const textDescription = uploadForm.querySelector('.text__description');

const uploadFormEscKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadForm.reset();
  }
};

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', uploadFormEscKeydownHandler);
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();

  document.removeEventListener('keydown', uploadFormEscKeydownHandler);
};

const pristine = new Pristine(uploadForm, {
  classTo: 'text', // Элемент, на который будут добавляться классы
  errorClass: 'text--invalid', // Класс, обозначающий невалидное поле
  successClass: 'text--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'text', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'div', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
});

pristine.addValidator(textHashtags, () => {
  const hashtags = textHashtags.value.split(' ');
  return hashtags.length <= 5;
}, 'Не более 5 хэш-тегов');

pristine.addValidator(textHashtags, () => {
  const hashtags = textHashtags.value.split(' ');
  return !hashtags.some((hashtag) => !hashtag || !regular.test(hashtag));
}, 'Некорректный хэш-тег');

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
}, 'Хэш-теги не должны повторяться');

pristine.addValidator(textDescription, () => textDescription.value.length <= 140, 'Не более 140 символов');

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const initPhotoUPload = () => {
  uploadInput.addEventListener('change', () => {
    openUploadForm();
  });
  uploadCancel.addEventListener('click', () => {
    closeUploadForm();
  });
};

export {initPhotoUPload};
