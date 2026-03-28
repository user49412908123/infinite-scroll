// hero.js — GSAP micro-animations for hero

document.addEventListener('DOMContentLoaded', function() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline();
  tl.from('.hero-title', { opacity: 0, y: 20, duration: 0.9, ease: 'power2.out' });
  tl.from('.hero-sub', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out' }, '-=0.5');
  tl.from('.cta', { opacity: 0, y: 15, stagger: 0.12, duration: 0.6 }, '-=0.4');

  gsap.to('.brand', { scale: 1.02, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.hero-visual', { y: -8, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  document.querySelectorAll('.cta').forEach(btn => {
    btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.03, duration: 0.18 }));
    btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: 0.18 }));
  });
});
