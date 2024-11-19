const swiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  spaceBetween: 0,
  centeredSlides: true,
  loop: true,
  speed: 1000,
  grabCursor: true,
  mousewheel: {
    enabled: true,
    sensitivity: 1,
  },
  freeMode: {
    enabled: true,
    sticky: false,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
});