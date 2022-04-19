import {isEscapeKey} from './util.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');

const img = bigPicture.querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');

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
  socialCommentsCount.innerHTML = sourceComments.length <= COMMENTS_STEP
    ? `${sourceComments.length} из <span class="comments-count">${sourceComments.length}</span> комментариев`
    : `${COMMENTS_STEP} из <span class="comments-count">${sourceComments.length}</span> комментариев`;
  container.textContent = '';
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentNode = template.cloneNode(true);
    const commentPictureNode = commentNode.querySelector('.social__picture');
    commentPictureNode.src = comment.avatar;
    commentPictureNode.alt = comment.name;
    commentNode.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(commentNode);
  });
  container.appendChild(commentsFragment);
};

const loadCommentsButtonClickHandler = () => {
  const count = renderedCommentsNumber + COMMENTS_STEP;
  const newPartComments = sourceComments.slice(0, count);
  renderPictureComments(newPartComments, commentsContainer, commentTemplate);
  renderedCommentsNumber = renderedCommentsNumber + COMMENTS_STEP;
  socialCommentsCount.innerHTML = `${newPartComments.length} из <span class="comments-count">${sourceComments.length}</span> комментариев`;
  if (
    sourceComments.length <= COMMENTS_STEP
    || renderedCommentsNumber === sourceComments.length
    || newPartComments.length >= sourceComments.length
  ) {
    commentsLoader.classList.add('hidden');
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  bigPictureCloseButton.removeEventListener('click', closeButtonClickHandler);
  document.removeEventListener('keydown', bigPictureEscKeydownHandler);
  commentsLoader.removeEventListener('click', loadCommentsButtonClickHandler);
};

/**
 * Открытие и заполнение модального окна
 */
const showBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  img.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  sourceComments = photo.comments;
  const partComments = sourceComments.slice(0, COMMENTS_STEP);
  renderPictureComments(partComments, commentsContainer, commentTemplate);
  renderedCommentsNumber = partComments.length;

  commentsLoader.addEventListener('click', loadCommentsButtonClickHandler);
  bigPictureCloseButton.addEventListener('click', closeButtonClickHandler);
  document.addEventListener('keydown', bigPictureEscKeydownHandler);
};

function closeButtonClickHandler () {
  closeBigPicture();
}

function bigPictureEscKeydownHandler (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export {showBigPicture};
