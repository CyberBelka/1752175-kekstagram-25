const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadFile = document.querySelector('.img-upload__input');
const uploadFilePrewiew = document.querySelector('.img-upload__preview img');
const effects = document.querySelectorAll('.effects__preview');

const initUploadPhoto = () => {
  uploadFile.addEventListener('change', () => {
    const file = uploadFile.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      uploadFilePrewiew.src = URL.createObjectURL(file);
    }

    effects.forEach((image) => {
      image.style.backgroundImage = `url(${uploadFilePrewiew.src})`;
    });
  });
};

export {initUploadPhoto};
