function getRandomIntInclusive(min, max) {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error('Диапазон должен содержать только целые числа');
  }
  if (min > max) {
    throw new Error('Неверный диапазон');
  }
  if (min < 0) {
    throw new Error('Диапазон не может быть отрицательным');
  }
  /*
  Источник:
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  */
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive(0, 5);

function checkCommentLength(comment, MAX_LENGTH) {
  const lengthComment = comment.length;
  return lengthComment <= MAX_LENGTH;
}

checkCommentLength('Some comment', 140);

