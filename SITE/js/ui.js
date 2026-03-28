// ui.js — small UI helpers: nav toggle and accessible behaviors

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
      toggle.classList.toggle('is-active');
    });
  }

  // Make entire .player-card clickable by delegating clicks to anchor
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.player-card');
    if (!card) return;
    const a = card.querySelector('a.js-player-link');
    if (a && e.target.tagName !== 'A' && !e.target.closest('a')) {
      // ensure clicks on child links are preserved
      window.location.href = a.href;
    }
  });
});
