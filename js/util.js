const ALERT_SHOW_TIME = 5000;

/**  Возвращает случайное целое число из переданного диапазона включительно */
const getRandomIntInclusive = (min, max) => {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error('Диапазон должен содержать только целые числа');
  }
  if (min > max) {
    throw new Error('Неверный диапазон');
  }
  if (min < 0) {
    throw new Error('Диапазон не может быть отрицательным');
  }
  // Источник:
  // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/** Проверка максимальной длины строки */
/* eslint-disable no-console, no-unused-vars */
function checkCommentLength(comment, MAX_LENGTH) {
  return comment.length <= MAX_LENGTH;
}

const isEscapeKey = (evt) => evt.key === 'Escape';


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomIntInclusive, isEscapeKey, showAlert};
