const carouselContainer = document.querySelector('.carousel-container');

// Clone images to create a seamless scroll loop
const images = Array.from(carouselContainer.children);
images.forEach(image => {
  const clone = image.cloneNode(true);
  carouselContainer.appendChild(clone);
});

// Manually bind vertical scroll to horizontal scroll for infinite effect
let scrollAmount = 0;

document.addEventListener('wheel', (e) => {
  e.preventDefault();
  scrollAmount += e.deltaY;

  if (scrollAmount >= carouselContainer.scrollWidth / 2) {
    scrollAmount = 0;
  } else if (scrollAmount < 0) {
    scrollAmount = carouselContainer.scrollWidth / 2;
  }

  carouselContainer.style.transform = `translateX(-${scrollAmount}px)`;
});
