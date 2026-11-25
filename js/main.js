// Mobile navigation toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Highlight the nav link of the section in view
const navAnchors = [...links.querySelectorAll('a[href^="#"]')];
const sections = navAnchors
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

// Fade-in on scroll
const revealTargets = document.querySelectorAll('.card, .stat, .skill-group, .pub, .contact-card');
const revealer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealTargets.forEach(el => { el.classList.add('reveal'); revealer.observe(el); });

// Thesis PDF preview
document.querySelectorAll('.pdf-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const preview = btn.nextElementSibling;
    const show = preview.hidden;
    preview.hidden = !show;
    btn.setAttribute('aria-expanded', String(show));
    btn.innerHTML = show
      ? '<i class="fa-regular fa-file-pdf"></i> Hide Thesis PDF'
      : '<i class="fa-regular fa-file-pdf"></i> Preview Thesis PDF';
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
