import {isEscapeKey} from './util.js';

const submitButton = document.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const showFormMessage = (overlay, messageButton, typeMessage) => {
  document.body.appendChild(overlay);
  const message = document.querySelector(typeMessage);

  const closeFormMessage = () => {
    document.body.removeChild(overlay);

    document.removeEventListener('keydown', successMessageEscKeydownHandler);
    messageButton.removeEventListener('click', closeFormMessage);
    message.removeEventListener('click', closeFormMessage);
  };

  function successMessageEscKeydownHandler (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeFormMessage();
    }
  }

  document.addEventListener('keydown', successMessageEscKeydownHandler);
  message.addEventListener('click', closeFormMessage);

};

export {blockSubmitButton, unblockSubmitButton, showFormMessage};
