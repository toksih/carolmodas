document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.nav');
const menuLinks = document.querySelectorAll('.nav a');
const menuIcon = menuButton?.querySelector('.bi');
const menuLabel = menuButton?.querySelector('.sr-only');

function closeMenu() {
  menu?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuIcon?.classList.remove('bi-x-lg');
  menuIcon?.classList.add('bi-list');
  if (menuLabel) menuLabel.textContent = 'Abrir menu';
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const isOpen = menu?.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
  menuIcon?.classList.toggle('bi-list', !isOpen);
  menuIcon?.classList.toggle('bi-x-lg', Boolean(isOpen));
  if (menuLabel) menuLabel.textContent = isOpen ? 'Fechar menu' : 'Abrir menu';
  document.body.classList.toggle('menu-open', Boolean(isOpen));
});

menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('resize', () => {
  if (window.innerWidth > 980) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.querySelector('#year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}
