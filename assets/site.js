/* HoldtDeOrd.no – felles skript for alle sider: mobilmeny og partikkelbakgrunn. */
(function () {
  'use strict';

  /* ---------- Mobilmeny ---------- */
  var menuButton = document.getElementById('mobile-menu-button');
  var mobileMenu = document.getElementById('mobile-menu');
  var closeButton = document.getElementById('close-mobile-menu');

  if (menuButton && mobileMenu && closeButton) {
    var isOpen = function () { return !mobileMenu.classList.contains('hidden'); };

    var focusables = function () {
      return Array.prototype.slice.call(mobileMenu.querySelectorAll('a[href], button'));
    };

    var onKeydown = function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        closeMenu();
      } else if (e.key === 'Tab') {
        // Hold fokus inne i menyen mens den er åpen
        var items = focusables();
        if (!items.length) return;
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    var openMenu = function () {
      mobileMenu.classList.remove('hidden');
      menuButton.setAttribute('aria-expanded', 'true');
      document.addEventListener('keydown', onKeydown);
      var firstLink = mobileMenu.querySelector('a[href]');
      (firstLink || closeButton).focus();
    };

    var closeMenu = function () {
      mobileMenu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', onKeydown);
      menuButton.focus();
    };

    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.addEventListener('click', openMenu);
    closeButton.addEventListener('click', closeMenu);
  }

  /* ---------- Partikkelbakgrunn ---------- */
  var canvas = document.getElementById('bg-particles');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var cfg = {
    count: Number(canvas.dataset.count) || 95,
    maxSize: Number(canvas.dataset.size) || 2.2,
    speed: Number(canvas.dataset.speed) || 0.8,
    minSpeed: Number(canvas.dataset.minSpeed) || 0.3,
    color: canvas.dataset.color || 'rgba(147, 197, 253, 0.65)'
  };
  var particles = [];
  var rafId = null;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var wideScreen = window.matchMedia('(min-width: 1024px)'); // lerretet er bare synlig fra lg (hidden lg:block)

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function Particle() { this.reset(); }
  Particle.prototype.reset = function () {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * cfg.maxSize + 0.5;
    this.speedY = Math.random() * cfg.speed + cfg.minSpeed;
  };
  Particle.prototype.update = function () {
    this.y += this.speedY;
    if (this.y > canvas.height) this.reset();
  };
  Particle.prototype.draw = function () {
    ctx.fillStyle = cfg.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  };

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) { particles[i].update(); particles[i].draw(); }
    rafId = window.requestAnimationFrame(frame);
  }

  function shouldRun() {
    return wideScreen.matches && !reducedMotion.matches && !document.hidden &&
      window.getComputedStyle(canvas).display !== 'none';
  }

  function start() {
    if (rafId !== null) return;
    if (!particles.length) {
      resizeCanvas();
      for (var i = 0; i < cfg.count; i++) particles.push(new Particle());
    }
    rafId = window.requestAnimationFrame(frame);
  }

  function stop() {
    if (rafId === null) return;
    window.cancelAnimationFrame(rafId);
    rafId = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function update() { if (shouldRun()) start(); else stop(); }

  window.addEventListener('resize', function () { if (rafId !== null) resizeCanvas(); });
  document.addEventListener('visibilitychange', update);
  [reducedMotion, wideScreen].forEach(function (mq) {
    if (mq.addEventListener) mq.addEventListener('change', update);
    else if (mq.addListener) mq.addListener(update);
  });

  // Statusflagg for testing/feilsøking
  window.__hdoParticles = function () { return rafId !== null; };

  update();
})();
