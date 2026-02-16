const addressEl = document.getElementById("address");
const bedsBathsEl = document.getElementById("bedsBaths");
const sqftEl = document.getElementById("sqft");
const styleEl = document.getElementById("style");
const highlightsEl = document.getElementById("highlights");

const statusEl = document.getElementById("status");
const outputEl = document.getElementById("output");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

function setStatus(text) {
  statusEl.textContent = text || "";
}

function formatSqft(value) {
  const cleaned = (value || "").replace(/,/g, "").trim();
  const num = Number(cleaned);
  if (!cleaned || Number.isNaN(num)) return value.trim();
  return num.toLocaleString();
}

function getHighlights() {
  const raw = highlightsEl.value.trim();
  if (!raw) return [];
  return raw.split(",").map((h) => h.trim()).filter(Boolean);
}

function buildListing(data) {
  const sqftText = data.sqft ? `${formatSqft(data.sqft)} sq ft` : "plenty of space";
  const bedsBathsText = data.bedsBaths || "a great layout";
  const styleText = data.style || "clean, modern";

  const highlightLines = data.highlights.length
    ? data.highlights.map((h) => `- ${h}`).join("\n")
    : "- Great natural light\n- Functional layout\n- Move-in ready feel";

  const headline = `${bedsBathsText} at ${data.address}`;

  const mls = `Welcome to ${data.address}. This ${styleText} home offers ${bedsBathsText} with approximately ${sqftText}.

Highlights:
${highlightLines}

Schedule a showing to see it in person.`;

  const ig = `${data.address}
${bedsBathsText}${data.sqft ? ` • ${formatSqft(data.sqft)} sq ft` : ""}

Aesthetic: ${styleText}
Top features: ${data.highlights.slice(0, 4).join(" • ") || "Great light • Nice layout • Move-in ready"}

#JustListed #RealEstate #HomeForSale #HouseHunting`;

  const followup = `Yes — it’s still available. Want to schedule a showing for ${data.address}?`;

  return { headline, mls, ig, followup };
}

generateBtn.addEventListener("click", () => {
  const data = {
    address: addressEl.value.trim(),
    bedsBaths: bedsBathsEl.value.trim(),
    sqft: sqftEl.value.trim(),
    style: styleEl.value.trim(),
    highlights: getHighlights()
  };

  if (!data.address) {
    setStatus("Address is required.");
    return;
  }

  generateBtn.disabled = true;
  copyBtn.disabled = true;

  outputEl.textContent = "Generating...";
  setStatus("Generating locally...");

  setTimeout(() => {
    const result = buildListing(data);

    outputEl.textContent =
`HEADLINE:
${result.headline}

MLS DESCRIPTION:
${result.mls}

IG CAPTION:
${result.ig}

FOLLOW-UP TEXT:
${result.followup}
`;

    setStatus("Done!");
    copyBtn.disabled = false;
    generateBtn.disabled = false;
  }, 300);
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(outputEl.textContent);
    setStatus("Copied ✅");
    setTimeout(() => setStatus(""), 1000);
  } catch {
    setStatus("Copy failed — please copy manually.");
  }
});
