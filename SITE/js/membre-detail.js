async function chargerMembre() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  // Requête GROQ surpuissante :
  // 1. On récupère le membre
  // 2. On récupère TOUS les commentaires qui pointent vers son ID (_id)
  const query = `*[_type == "member" && slug.current == "${slug}"][0] {
    ...,
    "image": image.asset->url,
    "gallery": gallery[].asset->url,
    "commentaires": *[_type == "comment" && belongsTo._ref == ^._id]
  }`;

  try {
    const data = await sanityFetch(query);
    if (!data) return;

    // 1. Affichage Profil
    document.getElementById("nom").innerText = data.name;
    document.getElementById("photo-profil").src = data.image;

    // 2. Affichage Galerie + GSAP
    const galleryContainer = document.getElementById("gallery");
    galleryContainer.innerHTML = data.gallery
      .map(
        (img) => `
      <img src="${img}?w=600" class="gallery-img" alt="galerie">
    `,
      )
      .join("");

    gsap.from(".gallery-img", {
      opacity: 0,
      scale: 0.8,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: "#gallery",
    });

    // 3. Affichage Commentaires
    const commentContainer = document.getElementById("comments-list");
    commentContainer.innerHTML = data.commentaires
      .map(
        (c) => `
      <div class="comment-item">
        <strong>${c.author}</strong>
        <p>${c.text}</p>
      </div>
    `,
      )
      .join("");
  } catch (err) {
    console.error(err);
  }
}

chargerMembre();
