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
      track.innerHTML = "<p>Aucun joueur dans l'effectif.</p>";
      return;
    }

    track.innerHTML = "";

    joueurs.forEach((joueur) => {
      const clone = template.content.cloneNode(true);
      const img = clone.querySelector('.js-player-img');
      img.src = joueur.imageUrl ? `${joueur.imageUrl}?w=600&auto=format` : "https://via.placeholder.com/600x800";
      img.alt = joueur.firstname || 'Joueur';
      clone.querySelector('.js-player-name').textContent = joueur.firstname || '—';
      clone.querySelector('.js-comments-count').textContent = `${joueur.nbComments} avis`;
      const slugVal = joueur.slug ? (typeof joueur.slug === 'string' ? joueur.slug : joueur.slug.current) : '';
      clone.querySelector('.js-player-link').href = `membre-detail.html?slug=${encodeURIComponent(slugVal)}`;
      track.appendChild(clone);
    });

    // Duplicate nodes so loop appears infinite
    const originals = Array.from(track.children);
    originals.forEach(node => track.appendChild(node.cloneNode(true)));

    // Entry animation
    gsap.from(track.querySelectorAll('.player-card'), {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power2.out'
    });

    // Compute scroll width and start loop after layout settles
    setTimeout(() => {
      const scrollWidth = track.scrollWidth / 2; // since we duplicated the items
      const pixelsPerSecond = 100; // tuned by Hélidya — increase for snappier motion (change to adjust)
      const duration = scrollWidth / pixelsPerSecond;

      const loop = gsap.to(track, {
        x: -scrollWidth,
        duration,
        ease: 'none',
        repeat: -1
      });

      const parent = track.closest('.carousel-wrapper') || track.parentElement;
      if (parent) {
        parent.addEventListener('mouseenter', () => loop.pause());
        parent.addEventListener('mouseleave', () => loop.resume());
        parent.addEventListener('touchstart', () => loop.pause(), { passive: true });
        parent.addEventListener('touchend', () => loop.resume());
      }
    }, 200);

  } catch (err) {
    track.innerHTML = "<p>Erreur lors du transfert des donn\u00e9es du terrain...</p>";
    console.error("D\u00e9tails technique :", err);
  }
}

afficherJoueurs();
