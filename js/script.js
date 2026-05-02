const innerPhotos = {
    futebol: { files: ['futebol1.jpeg','futebol2.jpeg','futebol3.jpeg'], folder: 'futebol', cur: 0 },
    musica:  { files: ['musica1.jpeg','musica2.jpeg'],                  folder: 'musica',  cur: 0 },
    luta:    { files: ['luta1.jpeg','luta2.jpeg'],                      folder: 'luta',    cur: 0 },
    artes:   { files: ['artes1.jpeg'],                                 folder: 'artes',   cur: 0 }
  };

  function innerSlide(key, dir) {
    const d = innerPhotos[key];
    d.cur = (d.cur + dir + d.files.length) % d.files.length;
    document.getElementById('img-' + key).src = 'imagens/' + d.folder + '/' + d.files[d.cur];
    const counter = document.getElementById('counter-' + key);
    if (counter) counter.textContent = (d.cur + 1) + ' / ' + d.files.length;
  }

  const track  = document.getElementById('carouselTrack');
  const dotsEl = document.getElementById('dots');
  const slides = track.querySelectorAll('.carousel-slide');
  let current = 0, timer;

  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Slide ' + (i + 1));
    d.onclick = () => goTo(i);
    dotsEl.appendChild(d);
  });

  function goTo(n) {
    current = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
    resetTimer();
  }
  function moveCarousel(dir) { goTo(current + dir); }
  function resetTimer() { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 5000); }
  resetTimer();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.animation = 'fadeUp .7s ease both'; observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.info-card, .address-block, .sobre-grid > *, .localizacao-grid > *').forEach(el => {
    el.style.opacity = '0'; observer.observe(el);
  });
