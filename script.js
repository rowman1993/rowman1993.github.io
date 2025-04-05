function log(sana) {
  console.log(sana);
}
log("toimi");

const image = document.getElementById('zoomImage');
const kuva = document.getElementById('dimImage');

function onoff(el) {
  if (el.style.display === 'block') {
    el.style.display = 'none';
  } else {
    el.style.display = 'block';
  }
}

// Throttle with requestAnimationFrame
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const progress = scrollY / window.innerHeight;

      log(progress);

      // Prefer transform over scale (scale is experimental)
        image.style.transform = `scale(${progress + 1})`;
        
      // Clamp brightness to avoid negative values
        kuva.style.filter = `brightness(${Math.max(0, 1 - progress ** 3)})`;
        kuva.style.opacity = `${Math.max(0.3, 1.3 - progress ** 3)}`;
      // Only toggle once when passing threshold
      if (progress > 1 && image.style.display !== 'none') {
        onoff(image);
      } else if (progress <= 1 && image.style.display !== 'block') {
        onoff(image);
      }

      ticking = false;
    });

    ticking = true;
  }
});
