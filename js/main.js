import {createPhotos} from './data.js';
import {renderPhotos} from './picture.js';
import {showBigPicture, initBigPicture} from './big-picture.js';
import {initPhotoUPload} from './form.js';

// Генерируем случайные фото
const similarPhotos = createPhotos(25);
// Рендер фото
renderPhotos(showBigPicture);

initPhotoUPload();

initBigPicture();

export {similarPhotos};
