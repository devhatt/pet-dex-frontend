export const activeSlide = (slides, slide) => {
  Array.from(slides).forEach((item) => {
    item.classList.toggle('sliding__slide--active', item === slide);
  });
};
