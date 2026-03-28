// equipe.js - Carousel infini sans brisure pour la page équipe

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

    // Créer les cartes originales
    joueurs.forEach((joueur) => {
      const clone = template.content.cloneNode(true);
      const img = clone.querySelector('.js-player-img');
      img.src = joueur.imageUrl ? `${joueur.imageUrl}?w=800&h=900&fit=crop&auto=format` : "https://via.placeholder.com/320x360/1a1a1a/00ff7f?text=Photo";
      img.alt = joueur.firstname || 'Joueur';
      clone.querySelector('.js-player-name').textContent = joueur.firstname || '—';
      clone.querySelector('.js-comments-count').textContent = `${joueur.nbComments} avis`;
      
      const slugVal = joueur.slug ? (typeof joueur.slug === 'string' ? joueur.slug : joueur.slug.current) : '';
      clone.querySelector('.js-player-link').href = `membre-detail.html?slug=${encodeURIComponent(slugVal)}`;
      track.appendChild(clone);
    });

    // Dupliquer pour loop infini sans brisure
    const originals = Array.from(track.children);
    originals.forEach(node => track.appendChild(node.cloneNode(true)));
    originals.forEach(node => track.appendChild(node.cloneNode(true))); // Triple pour fluidité

    // Animation d'entrée
    if (typeof gsap !== 'undefined') {
      gsap.from(track.querySelectorAll('.player-card'), {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power2.out'
      });
    }

    // Carousel infini après chargement
    setTimeout(() => {
      const cardWidth = track.querySelector('.player-card').offsetWidth;
      const gap = 24; // gap entre cartes (var(--space-6))
      const totalWidth = (cardWidth + gap) * joueurs.length;
      
      // Animation GSAP loop infini sans brisure
      if (typeof gsap !== 'undefined') {
        gsap.set(track, { x: 0 });
        
        const duration = totalWidth / 60; // vitesse en pixels/seconde (ajustable)
        
        const loop = gsap.to(track, {
          x: -totalWidth,
          duration: duration,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: function(x) {
              // Boucle seamless en réinitialisant position quand on atteint 1 cycle
              return (parseFloat(x) % totalWidth) + 'px';
            }
          }
        });

        // Pause au hover
        const wrapper = track.closest('.carousel-wrapper');
        if (wrapper) {
          wrapper.addEventListener('mouseenter', () => loop.pause());
          wrapper.addEventListener('mouseleave', () => loop.resume());
          wrapper.addEventListener('touchstart', () => loop.pause(), { passive: true });
          wrapper.addEventListener('touchend', () => loop.resume());
        }
      }
    }, 500);

  } catch (err) {
    track.innerHTML = "<p style='color: #ff6b6b; padding: 40px;'>Erreur lors du chargement des joueurs.</p>";
    console.error("Détails technique :", err);
  }
}

afficherJoueurs();
