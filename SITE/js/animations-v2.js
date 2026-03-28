/**
 * ================================================
 * ANIMATIONS GSAP - FootTracker 2026
 * ================================================
 * 
 * Ce fichier gère toutes les animations du site avec GSAP.
 * 
 * SECTIONS :
 * 1. Navbar Scroll Effect
 * 2. Mobile Navigation Toggle
 * 3. Scroll-Triggered Animations (ScrollTrigger)
 * 4. Parallax Effects
 * 5. Hero Entry Animations
 * 6. Button Hover Effects
 * 
 * DOCUMENTATION GSAP :
 * - gsap.to() : Anime vers une valeur cible
 * - gsap.from() : Anime depuis une valeur initiale
 * - gsap.fromTo() : Contrôle complet (début + fin)
 * - ScrollTrigger : Déclenche animations au scroll
 * - ease: Type d'accélération (power2, back, elastic...)
 * - stagger: Délai entre éléments multiples
 * - duration: Durée en secondes
 */

// Vérification que GSAP est chargé
if (typeof gsap === 'undefined') {
  console.warn('⚠️ GSAP n\'est pas chargé. Animations désactivées.');
} else {
  console.log('✅ GSAP chargé - Animations activées');
  
  // Enregistrer ScrollTrigger si disponible
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    console.log('✅ ScrollTrigger enregistré');
  }
}

// ================================================
// 1. NAVBAR SCROLL EFFECT
// ================================================
/**
 * Ajoute une classe "scrolled" à la navbar quand on scroll.
 * Effet : backdrop-filter blur + border-bottom
 * 
 * GSAP n'est pas utilisé ici car c'est juste un toggle de classe.
 * Plus performant en JS vanilla pour un simple scroll listener.
 */
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ================================================
// 2. MOBILE NAVIGATION TOGGLE
// ================================================
/**
 * Toggle du menu mobile avec animation smooth.
 * 
 * GSAP utilisé pour animer :
 * - Les barres du burger (rotation en X)
 * - L'apparition du menu (slide depuis la droite)
 */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks && typeof gsap !== 'undefined') {
  let isOpen = false;
  
  navToggle.addEventListener('click', () => {
    isOpen = !isOpen;
    
    // Animation burger vers X
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      // Transformation en X
      gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
      gsap.to(spans[1], { opacity: 0, duration: 0.2 });
      gsap.to(spans[2], { rotation: -45, y: -7, duration: 0.3 });
      
      // Apparition du menu
      navLinks.classList.add('active');
      gsap.from(navLinks.querySelectorAll('li'), {
        opacity: 0,
        x: 20,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      // Retour à hamburger
      gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(spans[1], { opacity: 1, duration: 0.2 });
      gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
      
      // Fermeture du menu
      navLinks.classList.remove('active');
    }
  });
}

// ================================================
// 3. SCROLL-TRIGGERED ANIMATIONS
// ================================================
/**
 * Animations déclenchées quand l'élément entre dans le viewport.
 * 
 * ATTRIBUTS HTML :
 * - data-scroll-animation="fade-up" : Type d'animation
 * - data-scroll-delay="100" : Délai en ms (optionnel)
 * 
 * TYPES D'ANIMATIONS :
 * - fade-up : Montée + fade in
 * - fade-in : Simple fade in
 * - fade-scale : Fade + zoom
 * - slide-left : Slide depuis la gauche
 * - slide-right : Slide depuis la droite
 */

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  
  // Fade Up (le plus courant)
  document.querySelectorAll('[data-scroll-animation="fade-up"]').forEach((el) => {
    const delay = el.dataset.scrollDelay || 0;
    
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%', // Démarre quand le top de l'élément atteint 85% du viewport
        toggleActions: 'play none none none', // play au scroll down uniquement
      },
      opacity: 0,
      y: 40, // Décalage vertical
      duration: 0.8,
      delay: delay / 1000, // Conversion ms → s
      ease: 'power2.out'
    });
  });
  
  // Fade In (sans mouvement)
  document.querySelectorAll('[data-scroll-animation="fade-in"]').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  });
  
  // Fade Scale (zoom + fade)
  document.querySelectorAll('[data-scroll-animation="fade-scale"]').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'back.out(1.2)' // Légère élasticité
    });
  });
  
  // Slide Left
  document.querySelectorAll('[data-scroll-animation="slide-left"]').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      x: -60,
      duration: 0.9,
      ease: 'power3.out'
    });
  });
  
  // Slide Right
  document.querySelectorAll('[data-scroll-animation="slide-right"]').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      x: 60,
      duration: 0.9,
      ease: 'power3.out'
    });
  });
}

// ================================================
// 4. PARALLAX EFFECTS
// ================================================
/**
 * Effet parallax : les éléments bougent à vitesse différente du scroll.
 * 
 * ATTRIBUT HTML :
 * - data-scroll-parallax="0.3" : Facteur de vitesse
 *   • Valeur positive : descend plus lentement (effet profondeur)
 *   • Valeur négative : descend plus vite (effet vitesse)
 * 
 * EXEMPLE :
 * <div data-scroll-parallax="0.3"> → Bouge 30% de la vitesse du scroll
 */

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  document.querySelectorAll('[data-scroll-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.scrollParallax);
    
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top bottom', // Démarre dès que l'élément entre
        end: 'bottom top', // Se termine quand il sort
        scrub: true, // Synchronisé avec le scroll (smooth)
      },
      y: (i, target) => {
        // Calcul du déplacement basé sur la hauteur de viewport
        return -ScrollTrigger.maxScroll(window) * speed;
      },
      ease: 'none' // Linéaire pour effet naturel
    });
  });
}

// ================================================
// 5. HERO ENTRY ANIMATIONS
// ================================================
/**
 * Animations d'entrée du hero au chargement de la page.
 * Stagger : les éléments apparaissent un par un.
 */

if (typeof gsap !== 'undefined') {
  // Hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    gsap.from(heroTitle, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out'
    });
  }
  
  // Hero subtitle
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    gsap.from(heroSubtitle, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.4,
      ease: 'power2.out'
    });
  }
  
  // Hero CTA buttons (stagger)
  const heroCTA = document.querySelectorAll('.hero-cta a');
  if (heroCTA.length > 0) {
    gsap.from(heroCTA, {
      opacity: 0,
      y: 20,
      stagger: 0.15, // 150ms entre chaque bouton
      duration: 0.7,
      delay: 0.6,
      ease: 'back.out(1.5)' // Légère élasticité
    });
  }
}

// ================================================
// 6. BUTTON HOVER EFFECTS
// ================================================
/**
 * Micro-interactions au hover sur les boutons.
 * 
 * GSAP permet un contrôle précis de l'élasticité :
 * - back.out : léger dépassement puis retour
 * - elastic : rebond
 * - power2 : accélération douce
 */

if (typeof gsap !== 'undefined') {
  // Primary buttons
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  // Stat cards hover
  document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -8,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  });
}

// ================================================
// 7. PAGE READY LOG
// ================================================
console.log('🎨 Animations FootTracker initialisées');
if (typeof ScrollTrigger !== 'undefined') {
  console.log(`📜 ${document.querySelectorAll('[data-scroll-animation]').length} animations au scroll détectées`);
  console.log(`🌀 ${document.querySelectorAll('[data-scroll-parallax]').length} effets parallax détectés`);
}
