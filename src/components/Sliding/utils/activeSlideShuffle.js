export const activeSlideShuffle = (slides, activeIndex) => {
  const totalSlides = slides.length;
  const hasMoreThanTwoSlides = totalSlides > 2;
  const prevIndex = activeIndex === 0 ? totalSlides - 1 : activeIndex - 1;
  const nextIndex = activeIndex === totalSlides - 1 ? 0 : activeIndex + 1;

  Array.from(slides).forEach((slide, index) => {
    slide.classList.remove(
      'sliding__slide--active',
      'sliding__slide--unfocused',
      'sliding__slide--prev',
      'sliding__slide--next',
    );

    if (index === activeIndex) slide.classList.add('sliding__slide--active');

    if (index !== activeIndex && !hasMoreThanTwoSlides)
      slide.classList.add('sliding__slide--unfocused');

    if (index === prevIndex && hasMoreThanTwoSlides)
      slide.classList.add('sliding__slide--prev');

    if (index === nextIndex && hasMoreThanTwoSlides)
      slide.classList.add('sliding__slide--next');
  });
};
