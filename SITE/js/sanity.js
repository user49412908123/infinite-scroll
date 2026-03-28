const SANITY_PROJECT_ID = "k7909trb";
const SANITY_DATASET = "production";
const SANITY_API_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}`;

async function sanityFetch(query) {
  const url = `${SANITY_API_URL}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erreur API Sanity");
  const data = await response.json();
  return data.result;
}

function imageUrl(asset, width = 800) {
  if (!asset || !asset.url) {
    return "https://via.placeholder.com/800x400?text=Image+non+disponible";
  }

  return `${asset.url}?w=${width}&auto=format`;
}

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function renderPortableText(blocks) {
  if (!blocks || !blocks.length) return "<p>Aucun contenu.</p>";
  return blocks
    .map((block) => {
      if (block._type === "image") {
        return `<img src="${imageUrl(block.asset, 1200)}" alt="" style="max-width:100%;margin:2rem 0;border-radius:8px;">`;
      }
      if (block._type !== "block") return "";
      const text = (block.children || [])
        .map((span) => {
          let t = span.text || "";
          if (span.marks && span.marks.includes("strong"))
            t = `<strong>${t}</strong>`;
          if (span.marks && span.marks.includes("em")) t = `<em>${t}</em>`;
          return t;
        })
        .join("");
      const tag =
        { h2: "h2", h3: "h3", blockquote: "blockquote" }[block.style] || "p";
      return `<${tag}>${text}</${tag}>`;
    })
    .join("\n");
}
