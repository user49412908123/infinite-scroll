async function afficherJoueurs() {
  const grid = document.getElementById("players-grid");
  const template = document.getElementById("player-card-template");

  try {
    // On récupère les membres ET on compte leurs commentaires liés
    const joueurs = await sanityFetch(`*[_type == "member"] {
      name, 
      slug, 
      description,
      "imageUrl": image.asset->url,
      "nbComments": count(*[_type == "comment" && belongsTo._ref == ^._id])
    }`);

    if (!joueurs || joueurs.length === 0) {
      grid.innerHTML = "<p>Aucun joueur dans l'effectif.</p>";
      return;
    }

    grid.innerHTML = ""; // On vide le message de chargement

    joueurs.forEach((joueur) => {
      const clone = template.content.cloneNode(true);

      // On remplit le clone avec les données Sanity
      clone.querySelector(".js-player-img").src = joueur.imageUrl
        ? `${joueur.imageUrl}?w=600`
        : "https://via.placeholder.com/600x800";
      clone.querySelector(".js-player-img").alt = joueur.name;
      clone.querySelector(".js-player-name").textContent = joueur.name;
      clone.querySelector(".js-player-desc").textContent =
        joueur.description || "";
      clone.querySelector(".js-comments-count").textContent =
        `${joueur.nbComments} avis`;
      clone.querySelector(".js-player-link").href =
        `membre-detail.html?slug=${joueur.slug.current}`;

      grid.appendChild(clone);
    });

    // Animation GSAP une fois que tout est ajouté
    gsap.from(".player-card", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
    });
  } catch (err) {
    grid.innerHTML =
      "<p>Erreur lors du transfert des données du terrain...</p>";
    console.error("Détails technique :", err);
  }
}

afficherJoueurs();
