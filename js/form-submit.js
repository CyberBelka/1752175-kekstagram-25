import {isEscapeKey} from './util.js';

const submitButton = document.querySelector('.img-upload__submit');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const successMessage = templateSuccess.cloneNode(true);
const successButton = successMessage.querySelector('button');
const templateError = document.querySelector('#error').content.querySelector('.error');
const errorMessage = templateError.cloneNode(true);
const errorButton = errorMessage.querySelector('button');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const successSubmit = () => {
  document.body.append(successMessage);

  successButton.addEventListener('click', () => {
    successMessage.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      successMessage.remove();
    }
  });

  document.addEventListener('click', (evt) => {
    const inner = successMessage.querySelector('.success__inner');
    const click = evt.composedPath().includes(inner);
    if (!click) {
      successMessage.remove();
    }
  });
};

const errorSubmit = () => {
  document.body.append(errorMessage);

  errorButton.addEventListener('click', () => {
    errorMessage.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      errorMessage.remove();
    }
  });

  document.addEventListener('click', (evt) => {
    const inner = errorMessage.querySelector('.error__inner');
    const click = evt.composedPath().includes(inner);
    if (!click) {
      errorMessage.remove();
    }
  });
};

export {blockSubmitButton, unblockSubmitButton, successSubmit, errorSubmit};
