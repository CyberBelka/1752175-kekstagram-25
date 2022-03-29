import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const userModalCloseElement = bigPicture.querySelector('.big-picture__cancel');

/**
 * Рендер комментариев в модальном окне
 */
const renderPictureComments = (comments, container, template) => {
  container.textContent = '';
  comments.forEach((comment) => {
    const commentNode = template.cloneNode(true);
    const commentPictureNode = commentNode.querySelector('.social__picture');
    commentPictureNode.src = comment.avatar;
    commentPictureNode.alt = comment.name;
    commentNode.querySelector('.social__text').textContent = comment.message;
    container.appendChild(commentNode);
  });
};

/**
 * Открытие и заполнение модального окна
 */
const showBigPicture = (photo) => {
  // открытие модального окна
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  // заполнение модального окна данными
  bigPicture.querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  // render comments
  const commentsContainer = bigPicture.querySelector('.social__comments');
  const commentTemplate = commentsContainer.querySelector('.social__comment');
  renderPictureComments(photo.comments, commentsContainer, commentTemplate);
};

userModalCloseElement.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

export {showBigPicture};
