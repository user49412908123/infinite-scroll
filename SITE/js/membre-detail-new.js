// membre-detail.js - Page détail d'un joueur

async function chargerMembre() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  if (!slug) {
    const nomEl = document.getElementById("nom");
    if (nomEl) nomEl.innerText = "Joueur introuvable";
    const gallery = document.getElementById("gallery");
    if (gallery) gallery.innerHTML = "<p>Slug manquant dans l'URL.</p>";
    const commentContainer = document.getElementById("comments-list");
    if (commentContainer) commentContainer.innerHTML = "";
    return;
  }

  // Requête GROQ : récupérer le membre et ses commentaires
  const query = `*[_type == "member" && slug.current == "${slug}"][0] {
    firstname,
    age,
    Taille,
    poids,
    pointure,
    "image": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    "commentaires": *[_type == "comment" && belongsTo._ref == ^._id]
  }`;

  try {
    const data = await sanityFetch(query);
    if (!data) {
      const nomEl = document.getElementById("nom");
      if (nomEl) nomEl.innerText = "Joueur introuvable";
      return;
    }

    // 1. Affichage Profil
    document.getElementById("nom").innerText = data.firstname || "";
    const photoEl = document.getElementById("photo-profil");
    if (photoEl) photoEl.src = data.image ? `${data.image}?w=1000&auto=format` : "https://via.placeholder.com/600x800";

    // 1.1 Stats
    document.getElementById("stat-age").innerText = data.age ?? '—';
    document.getElementById("stat-taille").innerText = data.Taille ?? '—';
    document.getElementById("stat-poids").innerText = data.poids ?? '—';
    document.getElementById("stat-pointure").innerText = data.pointure ?? '—';

    // effet sur le titre et stats (défensif si GSAP absent)
    if (typeof gsap !== 'undefined') {
      try {
        gsap.from("#nom", { opacity: 0, y: -10, duration: 0.8, ease: "power2.out" });
        gsap.from(".player-stat-card", { opacity: 0, scale: 0.95, stagger: 0.08, duration: 0.6, ease: "back.out(1.4)" });
      } catch (e) {
        console.warn('GSAP animations skipped:', e);
      }
    }

    // 2. Affichage Galerie + GSAP (Bento layout)
    const galleryContainer = document.getElementById("gallery");
    galleryContainer.innerHTML = (data.gallery || [])
      .map((img) => `
        <img src="${img}?w=900&auto=format" alt="galerie">
      `)
      .join("");

    if (typeof gsap !== 'undefined') {
      try {
        gsap.from(".gallery-grid img", {
          opacity: 0,
          scale: 0.9,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 80%"
          }
        });
      } catch (e) {
        console.warn('GSAP gallery animation skipped:', e);
      }
    }

    // 3. Affichage Commentaires
    const commentContainer = document.getElementById("comments-list");
    commentContainer.innerHTML = (data.commentaires || [])
      .map(
        (c) => `
      <div class="comment-item">
        <div class="comment-author">${c.author || 'Anonyme'}</div>
        <p class="comment-text">${c.text || ''}</p>
      </div>
    `,
      )
      .join("");
  } catch (err) {
    console.error(err);
    const nomEl = document.getElementById("nom");
    if (nomEl) nomEl.innerText = "Erreur lors du chargement du profil.";
  }
}

chargerMembre();
