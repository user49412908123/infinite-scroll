// animations.js — GSAP animations globales pour FootTracker

document.addEventListener('DOMContentLoaded', function() {
  if (typeof gsap === 'undefined') return;

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    });
  }

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-active');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-active');
      });
    });
  }

  // Hero animations (page d'accueil uniquement)
  if (document.querySelector('.hero')) {
    gsap.from('.hero-badge', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.2
    });

    gsap.from('.hero-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.4
    });

    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.6
    });

    gsap.from('.hero-cta', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.8
    });

    gsap.from('.hero-visual', {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      delay: 0.5
    });
  }

  // Stats cards animation
  const statsCards = document.querySelectorAll('.stat-card');
  if (statsCards.length > 0) {
    gsap.from(statsCards, {
      scrollTrigger: {
        trigger: statsCards[0],
        start: 'top 80%'
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6
    });
  }

  // Feature cards animation
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards.length > 0) {
    gsap.from(featureCards, {
      scrollTrigger: {
        trigger: featureCards[0],
        start: 'top 80%'
      },
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8
    });
  }

  // Section headers animation
  const sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach(header => {
    gsap.from(header.children, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%'
      },
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6
    });
  });

  // Player cards click effect (rendre toute la carte cliquable)
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.player-card');
    if (!card) return;
    const link = card.querySelector('.js-player-link');
    if (link && e.target !== link && !e.target.closest('.js-player-link')) {
      window.location.href = link.href;
    }
  });

  // Buttons hover effect
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  });
});
