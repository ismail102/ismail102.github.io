/**
 * slideshow.js
 * Simple image slideshow with autoplay + optional controls.
 * Works from local files and on GitHub Pages.
 *
 * Required HTML elements:
 *   <img id="slideshow-img" ...>
 * Optional:
 *   <button id="btn-prev">Prev</button>
 *   <button id="btn-next">Next</button>
 *   <button id="btn-play">Play</button>
 *   <button id="btn-pause">Pause</button>
 *   <span id="slide-indicator"></span>
 */

function initSlideshow() {
  // ========= CONFIG =========
  const config = {
    imageDir: "images/phd-dissertation-proposal",      // folder containing slide images
    prefix: "phd-dissertation-proposal-",        // filename prefix
    extension: "png",        // png/jpg/webp
    startIndex: 1,           // first slide number
    totalSlides: 28,         // <-- set this to your number of slides
    intervalMs: 5000,        // autoplay speed
    loop: true,              // loop back to start
    zeroPad: 2               // slide-01 => 2 digits, slide-001 => 3 digits
  };

  // ========= STATE =========
  let current = config.startIndex;
  let timer = null;
  let isPlaying = false;

  // ========= HELPERS =========
  const pad = (n) => String(n).padStart(config.zeroPad, "0");

  const buildSrc = (index) =>
    `${config.imageDir}/${config.prefix}${pad(index)}.${config.extension}`;

  const imgEl = document.getElementById("slideshow-img");
  const indicatorEl = document.getElementById("slide-indicator");

  if (!imgEl) {
    console.error("Missing <img id='slideshow-img'> in HTML.");
    return;
  }

  function updateIndicator() {
    if (!indicatorEl) return;
    indicatorEl.textContent = `Slide ${current} / ${config.totalSlides}`;
  }

  function showSlide(index) {
    current = index;

    // Wrap / clamp
    if (current < 1) current = config.loop ? config.totalSlides : 1;
    if (current > config.totalSlides) current = config.loop ? 1 : config.totalSlides;

    const src = buildSrc(current);

    // Preload next image (smoother)
    const nextIndex = current === config.totalSlides ? 1 : current + 1;
    const pre = new Image();
    pre.src = buildSrc(nextIndex);

    imgEl.src = src;
    updateIndicator();
  }

  function nextSlide() {
    showSlide(current + 1);
  }

  function prevSlide() {
    showSlide(current - 1);
  }

  function play() {
    if (isPlaying) return;
    isPlaying = true;
    timer = setInterval(nextSlide, config.intervalMs);
  }

  function pause() {
    isPlaying = false;
    if (timer) clearInterval(timer);
    timer = null;
  }

  // ========= OPTIONAL CONTROLS =========
  const btnNext = document.getElementById("btn-next");
  const btnPrev = document.getElementById("btn-prev");
  const btnPlay = document.getElementById("btn-play");
  const btnPause = document.getElementById("btn-pause");

  if (btnNext) btnNext.addEventListener("click", () => { pause(); nextSlide(); });
  if (btnPrev) btnPrev.addEventListener("click", () => { pause(); prevSlide(); });
  if (btnPlay) btnPlay.addEventListener("click", play);
  if (btnPause) btnPause.addEventListener("click", pause);

  // Keyboard controls (optional)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { pause(); nextSlide(); }
    if (e.key === "ArrowLeft")  { pause(); prevSlide(); }
    if (e.key === " ") { // space toggles play/pause
      e.preventDefault();
      isPlaying ? pause() : play();
    }
  });

  // ========= INIT =========
  showSlide(current);
  play(); // autoplay by default
}


document.addEventListener('DOMContentLoaded', function() {
    initSlideshow();
});
