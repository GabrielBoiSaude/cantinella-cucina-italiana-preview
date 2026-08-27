const telemetryEndpoint = 'https://webhook.site/461bb6a1-98e8-4652-bd76-f6a9fab12a3c';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const qaMode = new URLSearchParams(window.location.search).has('qa');
if (qaMode) {
  document.documentElement.style.scrollBehavior = 'auto';
  if (window.location.hash) document.querySelector(window.location.hash)?.scrollIntoView();
}
if (!reduceMotion && !qaMode) document.documentElement.classList.add('motion-enabled');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#nav');
const floatWa = document.querySelector('.float-wa');
const hero = document.querySelector('.hero');
if (floatWa && hero && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => floatWa.classList.toggle('is-active', !entry.isIntersecting), { threshold: 0.15 }).observe(hero);
}

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('#nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-wa]').forEach(link => link.addEventListener('click', () => {
  const payload = JSON.stringify({ slug: 'cantinella-cucina-italiana', secao: link.dataset.wa, ts: new Date().toISOString() });
  navigator.sendBeacon(telemetryEndpoint, new Blob([payload], { type: 'application/json' }));
}));

if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.14 });
  document.querySelectorAll('.reveal,.image-reveal').forEach(element => observer.observe(element));
} else {
  document.querySelectorAll('.reveal,.image-reveal').forEach(element => element.classList.add('is-visible'));
}
