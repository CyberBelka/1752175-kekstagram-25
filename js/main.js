import {createPhotos} from './data.js';
import {renderPhotos} from './picture.js';
import {showBigPicture, initBigPicture} from './big-picture.js';
import {initPhotoUPload} from './form.js';
import {initScale} from './scale.js';
import { initSlider } from './effects.js';

const similarPhotos = createPhotos(25);

renderPhotos(similarPhotos, showBigPicture);

initPhotoUPload();

initBigPicture();

initScale();

initSlider();
