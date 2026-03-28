/**
 * ========================================
 * CAROUSEL INFINI SEAMLESS - FootTracker
 * ========================================
 * 
 * Technique utilisée : Duplication + Animation continue sans reset visible
 * 
 * PRINCIPE :
 * 1. On duplique les cartes (x3 minimum pour couvrir viewport + scroll)
 * 2. On anime en continu avec GSAP
 * 3. Quand le premier groupe sort de vue, on le repositionne à la fin (seamless)
 * 4. L'utilisateur ne voit JAMAIS la coupure
 * 
 * GSAP DOC :
 * - gsap.to() : Animation vers une valeur cible
 * - ease: 'none' : Vitesse constante (pas d'accélération)
 * - repeat: -1 : Boucle infinie
 * - onRepeat : Callback à chaque cycle pour reset seamless
 */

async function afficherJoueurs() {
  const track = document.getElementById("players-grid");
  const template = document.getElementById("player-card-template");

  try {
    const joueurs = await sanityFetch(`*[_type == "member"] {
      firstname,
      slug,
      poids,
      "imageUrl": mainImage.asset->url,
      "nbComments": count(*[_type == "comment" && belongsTo._ref == ^._id])
    }`);

    if (!joueurs || joueurs.length === 0) {
      track.innerHTML = "<p style='color: #999; padding: 40px;'>Aucun joueur dans l'effectif.</p>";
      return;
    }

    track.innerHTML = "";

    // ========================================
    // ÉTAPE 1 : Création des cartes originales
    // ========================================
    joueurs.forEach((joueur) => {
      const clone = template.content.cloneNode(true);
      const card = clone.querySelector('.player-card');
      
      // Image avec fallback
      const img = clone.querySelector('.js-player-img');
      img.src = joueur.imageUrl 
        ? `${joueur.imageUrl}?w=600&h=700&fit=crop&auto=format` 
        : "https://via.placeholder.com/300x350/0d0d0d/00ff7f?text=Photo";
      img.alt = joueur.firstname || 'Joueur';
      
      // Nom
      clone.querySelector('.js-player-name').textContent = joueur.firstname || '—';
      
      // Avis (nombre fixe pour hauteur uniforme)
      const commentsEl = clone.querySelector('.js-comments-count');
      commentsEl.textContent = `${joueur.nbComments || 0} avis`;
      
      // Lien vers détail
      const slugVal = joueur.slug 
        ? (typeof joueur.slug === 'string' ? joueur.slug : joueur.slug.current) 
        : '';
      clone.querySelector('.js-player-link').href = `membre-detail.html?slug=${encodeURIComponent(slugVal)}`;
      
      track.appendChild(clone);
    });

    // ========================================
    // ÉTAPE 2 : Duplication pour loop infini
    // ========================================
    // On duplique 3x pour garantir un scroll seamless
    const originals = Array.from(track.children);
    
    // Duplication 1
    originals.forEach(node => {
      const duplicate = node.cloneNode(true);
      duplicate.classList.add('duplicate-1');
      track.appendChild(duplicate);
    });
    
    // Duplication 2
    originals.forEach(node => {
      const duplicate = node.cloneNode(true);
      duplicate.classList.add('duplicate-2');
      track.appendChild(duplicate);
    });

    // ========================================
    // ÉTAPE 3 : Animation d'entrée (Stagger)
    // ========================================
    // Les cartes apparaissent une par une avec effet de montée
    if (typeof gsap !== 'undefined') {
      gsap.from(track.querySelectorAll('.player-card'), {
        opacity: 0,
        y: 40,
        stagger: 0.06, // Délai entre chaque carte
        duration: 0.7,
        ease: 'power2.out'
      });
    }

    // ========================================
    // ÉTAPE 4 : Carousel infini seamless
    // ========================================
    setTimeout(() => {
      // Calcul des dimensions
      const firstCard = track.querySelector('.player-card');
      const cardWidth = firstCard.offsetWidth;
      const gap = 24; // CSS gap (var(--space-6))
      const cardTotalWidth = cardWidth + gap;
      
      // Largeur d'un groupe complet
      const groupWidth = cardTotalWidth * joueurs.length;
      
      if (typeof gsap !== 'undefined') {
        // Position initiale
        gsap.set(track, { x: 0 });
        
        // Vitesse : 50px/seconde (ajustable)
        const speed = 50;
        const duration = groupWidth / speed;
        
        /**
         * ANIMATION PRINCIPALE
         * 
         * La magie : on anime vers -groupWidth exactement
         * Quand on atteint cette position, le premier groupe est hors de vue
         * MAIS les duplicatas prennent le relais visuellement
         * On reset alors à x: 0 (invisible pour l'utilisateur)
         */
        const loop = gsap.to(track, {
          x: -groupWidth, // On déplace d'exactement la largeur d'un groupe
          duration: duration,
          ease: 'none', // Vitesse constante = fluidité
          repeat: -1, // Boucle infinie
          onRepeat: function() {
            // À chaque fin de cycle, reset instantané (imperceptible)
            gsap.set(track, { x: 0 });
          }
        });

        // ========================================
        // INTERACTIONS : Pause/Resume au hover
        // ========================================
        const wrapper = track.closest('.carousel-wrapper');
        if (wrapper) {
          // Desktop : hover
          wrapper.addEventListener('mouseenter', () => {
            loop.pause();
            // Léger ralenti avant pause (optionnel)
            gsap.to(loop, { timeScale: 0, duration: 0.3 });
          });
          
          wrapper.addEventListener('mouseleave', () => {
            // Reprise progressive
            gsap.to(loop, { 
              timeScale: 1, 
              duration: 0.3,
              onComplete: () => loop.resume()
            });
          });
          
          // Mobile : touch
          wrapper.addEventListener('touchstart', () => loop.pause(), { passive: true });
          wrapper.addEventListener('touchend', () => loop.resume());
        }
      }
    }, 600); // Délai pour laisser le temps aux cartes d'apparaître

  } catch (err) {
    track.innerHTML = "<p style='color: #ff6b6b; padding: 40px;'>Erreur lors du chargement des joueurs.</p>";
    console.error("Erreur Sanity :", err);
  }
}

// Lancement au chargement de la page
afficherJoueurs();
