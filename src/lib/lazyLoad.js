export function lazyLoad() {
  const lazyImages = Array.from(document.querySelectorAll('img.lazy'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entires, observer) => {
      entires.forEach((entry) => {
        if (entry.isIntersecting) {
          let image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove('lazy');
          io.unobserve(image);
        }
      });
    });

    lazyImages.forEach((lazyImage) => {
      io.observe(lazyImage);
    });
  }
}
