import {createPhotos} from './data.js';
import {renderPhotos} from './picture.js';
import {showBigPicture} from './big-picture.js';
import './form.js';

// Генерируем случайные фото
const similarPhotos = createPhotos(25);
// Рендер фото
renderPhotos(showBigPicture);

export {similarPhotos};
