const SANITY_PROJECT_ID = "k7909trb";
const SANITY_DATASET = "infinite-scroll-dataset-1";
const SANITY_API_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}`;

// Robust sanityFetch: safe JSON parsing and clearer error messages
async function sanityFetch(query) {
  const url = `${SANITY_API_URL}?query=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url);
    const text = await response.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (parseErr) {
      console.error('Impossible de parser la réponse Sanity JSON:', parseErr, text);
      throw new Error(`Sanity API returned invalid JSON: ${parseErr.message}`);
    }

    if (!response.ok) {
      console.error("Détails de l'erreur Sanity :", data || text);
      const errMsg = data?.error?.description || data?.message || text || `HTTP ${response.status}`;
      throw new Error(`Erreur API : ${response.status} - ${errMsg}`);
    }

    // Some responses wrap the payload in { result: ... }, keep backwards compatibility
    return data?.result ?? data;
  } catch (err) {
    console.error('sanityFetch error:', err);
    throw err;
  }
}

// Accept either an asset object ({url: '...'}) or a raw URL string
function imageUrl(assetOrUrl, width = 800) {
  const placeholder = "https://via.placeholder.com/800x400?text=Image+non+disponible";
  if (!assetOrUrl) return placeholder;
  if (typeof assetOrUrl === 'string') return `${assetOrUrl}?w=${width}&auto=format`;
  if (assetOrUrl.url) return `${assetOrUrl.url}?w=${width}&auto=format`;
  return placeholder;
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
