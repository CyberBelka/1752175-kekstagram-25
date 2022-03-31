import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const re = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const textDescription = uploadForm.querySelector('.text__description');

const uploadFormEscKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadForm.reset();
  }
};

function openUploadForm () {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', uploadFormEscKeydownHandler);
}

function closeUploadForm () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();

  document.removeEventListener('keydown', uploadFormEscKeydownHandler);
}

uploadInput.addEventListener('change', () => {
  openUploadForm();
});

uploadCancel.addEventListener('click', () => {
  closeUploadForm();
});

const pristine = new Pristine(uploadForm, {
  classTo: 'text', // Элемент, на который будут добавляться классы
  errorClass: 'text--invalid', // Класс, обозначающий невалидное поле
  successClass: 'text--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'text', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'div', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
});

pristine.addValidator(textHashtags, () => {
  const arrayHashtags = textHashtags.value.split(' ');
  if (arrayHashtags.length > 5) {
    return false;
  }
  return true;
}, 'Не более 5 хэш-тегов');

pristine.addValidator(textHashtags, () => {
  const arrayHashtags = textHashtags.value.split(' ');
  for (let i = 0; i < arrayHashtags.length; i++) {
    if (!re.test(arrayHashtags[i]) && arrayHashtags[i] !== '') {
      return false;
    }
  }
  return true;
}, 'Некорректный хэш-тег');

pristine.addValidator(textHashtags, () => {
  const arrayHashtags = textHashtags.value.split(' ');
  for (let i = 0; i < arrayHashtags.length; i++) {
    for (let j = i + 1; j < arrayHashtags.length; j++) {
      if (arrayHashtags[i].toLowerCase() === arrayHashtags[j].toLowerCase() && arrayHashtags[i] !== '') {
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
