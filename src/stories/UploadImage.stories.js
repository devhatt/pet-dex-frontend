import UploadImage from '../components/UploadImage';

export default {
  title: 'Components/UploadImage',

  render: () => {
    const $container = document.createElement('div');
    const uploadImage = new UploadImage();
    uploadImage.mount($container);
    return $container;
  },
};

export const Default = {};
