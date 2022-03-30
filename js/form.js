import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');

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
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
});

function validateHashtags (value) {
  return value.length >= 2 && value.length <= 20;
}

pristine.addValidator(uploadForm.querySelector('.text__hashtags'), validateHashtags, 'От 2 до 20 символов');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
