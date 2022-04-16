import {renderPhotos} from './picture.js';
import {initPhotoUPload, setUserFormSubmit, closeUploadForm} from './form.js';
import {initScale} from './scale.js';
import {initSlider} from './effects.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {showFilters, hideFilters, initFilters} from './filters.js';
import {initUploadPhoto} from './upload-photo.js';

initPhotoUPload();

initScale();

initSlider();

initUploadPhoto();

getData ((photos) => {
  renderPhotos(photos);
  showFilters();
  initFilters();
},
() => {
  showAlert('Не получилось загрузить фотографии...');
  hideFilters();
}
);

setUserFormSubmit(closeUploadForm);
