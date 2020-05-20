export function fetchScroll(func) {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entires, observer) => {
      entires.forEach((entry) => {
        if (entry.isIntersecting) {
          func();
        }
      });
    });

    io.observe(document.querySelector('.scroll-detector'));
  }
}
