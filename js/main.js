// import {createPhotos} from './data.js';
import {renderPhotos} from './picture.js';
import {initBigPicture} from './big-picture.js';
import {initPhotoUPload, setUserFormSubmit, closeUploadForm} from './form.js';
import {initScale} from './scale.js';
import {initSlider} from './effects.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

// const similarPhotos = createPhotos(25);

// renderPhotos(similarPhotos, showBigPicture);

initPhotoUPload();

initBigPicture();

initScale();

initSlider();

getData(renderPhotos, showAlert);

setUserFormSubmit(closeUploadForm);
