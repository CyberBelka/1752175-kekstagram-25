import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const userModalCloseElement = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const COMMENTS_STEP = 5;

let sourceComments = [];
let renderedCommentsNumber = 0;

/**
 * Рендер комментариев в модальном окне
 */
const renderPictureComments = (comments, container, template) => {
  commentsLoader.classList.remove('hidden');
  if (sourceComments.length <= COMMENTS_STEP) {
    commentsLoader.classList.add('hidden');
  }
  commentsCount.innerHTML = sourceComments.length <= COMMENTS_STEP
    ? `${sourceComments.length} из <span class="comments-count">${sourceComments.length}</span> комментариев`
    : `${COMMENTS_STEP} из <span class="comments-count">${sourceComments.length}</span> комментариев`;
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
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  sourceComments = photo.comments;
  const partComments = sourceComments.slice(0, COMMENTS_STEP);
  renderPictureComments(partComments, commentsContainer, commentTemplate);
  renderedCommentsNumber = partComments.length;
};

const initBigPicture = () => {
  commentsLoader.addEventListener('click', () => {
    const count = renderedCommentsNumber + COMMENTS_STEP;
    const newPartComments = sourceComments.slice(0, count);
    renderPictureComments(newPartComments, commentsContainer, commentTemplate);
    renderedCommentsNumber = renderedCommentsNumber + COMMENTS_STEP;
    commentsCount.innerHTML = `${newPartComments.length} из <span class="comments-count">${sourceComments.length}</span> комментариев`;
    if (
      sourceComments.length <= COMMENTS_STEP
      || renderedCommentsNumber === sourceComments.length
      || newPartComments.length >= sourceComments.length
    ) {
      commentsLoader.classList.add('hidden');
    }
  });

  userModalCloseElement.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
};

export {showBigPicture, initBigPicture};
