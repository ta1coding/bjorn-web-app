const carouselContainer = document.querySelector('.carousel-container');

let scrollAmount = 0;

// Scroll the carousel left or right based on the wheel event
document.querySelector('.carousel').addEventListener('wheel', (e) => {
  e.preventDefault();
  scrollAmount += e.deltaY;

  if (scrollAmount < 0) {
    scrollAmount = 0;
  } else if (scrollAmount > carouselContainer.scrollWidth - carouselContainer.clientWidth) {
    scrollAmount = carouselContainer.scrollWidth - carouselContainer.clientWidth;
  }

  carouselContainer.style.transform = `translateX(-${scrollAmount}px)`;
});
