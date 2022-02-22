function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  if (min < 0) {
    throw new Error('Диапазон не может быть отрицательным');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive();

function getLength(testComment, maxLength) {
  const lengthComment = testComment.length;
  if (lengthComment > maxLength) {
    return false;
  }
  return true;
}

getLength();

