import {getRandomIntInclusive} from './util.js';

const DESCRIPTIONS =[
  'Ещё один прекрасный день!',
  'Лучшее место для тренировки',
  'Бесстрашный исследователь',
  'Вы слышали уже новость? Как вам она?',
  'Впечатлило сильно'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Александр',
  'Петя',
  'Анна',
  'Света',
  'Ольга',
  'Владимир',
  'Константин',
  'Кристина',
  'Лена',
  'Аркадий'
];

let commentNumber = 1;

/**  Создаёт комментарии */
const createComments = (number) => {
  const comments = [];
  for (let i = 0; i < number; i++) {
    const comment = {
      id: commentNumber++,
      avatar: `img/avatar-${  getRandomIntInclusive(1, 6)  }.svg`,
      message: MESSAGES[getRandomIntInclusive(0, MESSAGES.length - 1)],
      name: NAMES[getRandomIntInclusive(0, NAMES.length - 1)]
    };
    comments.push(comment);
  }
  return comments;
};

/**  Создаёт описание фотографии */
const createPhotos = (number) => {
  const photo = [];
  for (let i = 0; i < number; i++) {
    photo[i] = {
      id: i + 1,
      url: `photos/${  i + 1  }.jpg`,
      description: DESCRIPTIONS[getRandomIntInclusive(0, DESCRIPTIONS.length - 1)],
      likes: getRandomIntInclusive(15, 200),
      comments: createComments(getRandomIntInclusive(0, 30))
    };
  }
  return photo;
};

export {createPhotos};
