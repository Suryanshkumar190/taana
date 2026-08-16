// Weave clusters featured on the site. Each has a base CSS pattern
// signature — colors + motif genuinely associated with the weave —
// which every product in that cluster then varies (see Swatch.jsx),
// so no two products, even within the same cluster, render identically.
export const clusters = [
  {
    id: "banarasi",
    name: "Banarasi",
    state: "Varanasi, Uttar Pradesh",
    note: "Zari brocade on silk, woven on the pit loom.",
    swatch: { base: "#8A3134", accent: "#E9B44C", pattern: "brocade" },
  },
  {
    id: "kanjeevaram",
    name: "Kanjeevaram",
    state: "Kanchipuram, Tamil Nadu",
    note: "Korvai silk with contrast temple borders.",
    swatch: { base: "#1E2A4A", accent: "#A63D40", pattern: "temple" },
  },
  {
    id: "chanderi",
    name: "Chanderi",
    state: "Ashoknagar, Madhya Pradesh",
    note: "Sheer cotton-silk with a signature translucent weave.",
    swatch: { base: "#E8DCC3", accent: "#2B3A67", pattern: "sheer" },
  },
  {
    id: "ikat",
    name: "Ikat",
    state: "Pochampally, Telangana",
    note: "Resist-dyed yarn, woven so the pattern blurs at the edges.",
    swatch: { base: "#2B3A67", accent: "#E9B44C", pattern: "ikat" },
  },
  {
    id: "ajrakh",
    name: "Ajrakh",
    state: "Kutch, Gujarat",
    note: "Block-printed indigo and madder, fourteen steps a piece.",
    swatch: { base: "#2B3A67", accent: "#8A3134", pattern: "block" },
  },
  {
    id: "jamdani",
    name: "Jamdani",
    state: "Nadia, West Bengal",
    note: "Hand-loomed motifs added thread by thread as it's woven.",
    swatch: { base: "#F2EAD9", accent: "#1E2A4A", pattern: "dot" },
  },
];

// ---------------------------------------------------------------------
// Product generation. Real saree sub-type / technique names per cluster,
// combined with a rotating list of weaver houses and cooperatives, build
// a 100-item catalog deterministically (same output every build). Each
// product carries a `seed` used only to vary its generated swatch — a
// hue rotation + pattern-scale tweak — so within a cluster no two
// products render the same swatch either. There are no sourced photos
// anywhere in this file, which is what guarantees zero duplicate images:
// nothing here is fetched or reused, everything is drawn from the data.
// ---------------------------------------------------------------------

const CLUSTER_DEFS = {
  banarasi: {
    types: [
      "Meenakari Zari", "Katan Silk", "Tissue Zari Wedding", "Butidar Brocade",
      "Cutwork Cotton-Silk", "Tanchoi Silk", "Kadhwa Brocade", "Jangla Silk",
      "Alfi Zari", "Shikargah Motif", "Rangkat Silk", "Organza Zari",
      "Georgette Zari", "Konia Border", "Ganga-Jamuna Border", "Resham Booti", "Diagonal Stripe",
    ],
    weavers: [
      "Rehmat Textiles, Varanasi", "Ansari Zari House, Varanasi",
      "Gangajali Weaves, Varanasi", "Banaras Heritage Looms", "Kashi Zari Karkhana",
    ],
    units: ["saree", "saree", "saree", "stole", "saree", "dupatta"],
    basePrice: 6800, step: 950,
  },
  kanjeevaram: {
    types: [
      "Korvai Temple-Border", "Thread-Brocade Bridal", "Checked Pattu", "Pure Mulberry Silk",
      "Contrast Pallu Silk", "Vairaoosi Motif", "Rettapet Zari", "Peacock Motif",
      "Mango Motif", "Gopuram Motif", "Rudraksham Motif", "Small-Border Silk",
      "Big-Border Bridal", "Paisley Motif", "Zari-Heavy Bridal", "Plain Zari-Border", "Two-Tone Silk",
    ],
    weavers: [
      "Lakshmi Silk Weavers, Kanchipuram", "Sri Meenakshi Silks, Kanchipuram",
      "Arani Handloom Cooperative", "Thiruvanaikoil Silk House", "Kumarapalayam Weavers Guild",
    ],
    units: ["saree"],
    basePrice: 14500, step: 1150,
  },
  chanderi: {
    types: [
      "Sheer", "Silk-Cotton", "Booti", "Zari-Border", "Tissue", "Pure Silk",
      "Hand-Block Print", "Peacock Booti", "Coin (Ashrafi) Booti", "Floral (Genda) Booti",
      "Mango (Keri) Booti", "Gold Booti", "Checked Silk-Cotton", "Plain Zari-Edge",
      "Two-Tone Sheer", "Butta Motif",
    ],
    weavers: [
      "Baghora Handlooms, Ashoknagar", "Chanderiyaan Weavers Trust",
      "Chanderi Silk Cooperative", "Ashoknagar Handloom Society",
    ],
    units: ["saree", "dupatta", "saree", "stole", "saree", "running fabric"],
    basePrice: 2200, step: 420,
  },
  ikat: {
    types: [
      "Double Ikat Pochampally", "Telia Rumal", "Single Ikat Cotton", "Pochampally Silk",
      "Diamond Ikat", "Temple-Border Ikat", "Bhoodan Pochampally", "Ikat Tussar Silk",
      "Checked Ikat", "Geometric Ikat", "Ikat Cotton Cushion", "Ikat Running Fabric",
      "Sunburst Ikat", "Chevron Ikat", "Ikat Silk-Cotton", "Broad-Border Ikat", "Ripple Ikat",
    ],
    weavers: [
      "Nalgonda Weavers Collective", "Puttapaka Ikat Cooperative",
      "Bhoodan Pochampally Society", "Telangana Ikat Guild",
    ],
    units: ["saree", "stole", "saree", "running fabric", "saree", "home"],
    basePrice: 1400, step: 480,
  },
  ajrakh: {
    types: [
      "Block-Print Running Fabric", "Modal Silk", "Cotton", "Indigo",
      "Madder-Dye Cotton", "Cotton Mulmul", "Kutch Hand-Block", "Natural-Dye Cotton",
      "Geometric Print", "Floral Block-Print", "Trellis Print", "Star Motif",
      "Indigo-Madder Dupatta", "Hand-Block Bedcover", "Double-Dye Cotton", "Rosette Print", "Border Print",
    ],
    weavers: [
      "Khatri Ajrakh House, Dhamadka", "Ajrakhpur Printers Guild",
      "Kutch Block Print Cooperative", "Dhamadka Hand-Block Society",
    ],
    units: ["running fabric", "saree", "dupatta", "stole", "saree", "home"],
    basePrice: 1250, step: 380,
  },
  jamdani: {
    types: [
      "Motif Cotton", "Silk-Cotton", "Dhakai", "Cotton Stole", "Booti Dupatta",
      "Nakshi Motif", "Fine-Count", "Zari Jamdani", "Tangail-Style", "Half-Silk",
      "Floral Butta", "Paisley Motif", "Checked Cotton", "Plain-Border Cotton", "Two-Tone Silk-Cotton", "Rich Pallu",
    ],
    weavers: [
      "Phulia Jamdani Cooperative", "Shantipur Jamdani Weavers",
      "Tangail Jamdani Society", "Nadia Handloom Trust",
    ],
    units: ["saree", "saree", "stole", "dupatta", "saree", "saree"],
    basePrice: 2600, step: 650,
  },
};

const UNIT_LABELS = {
  saree: (i) => `${(5.5 + (i % 3) * 0.4).toFixed(1)}m saree`,
  stole: () => "2.2m stole",
  dupatta: () => "2.4m dupatta",
  "running fabric": () => "per metre",
  home: (i) => (i % 2 === 0 ? "set of 2" : "single bedcover"),
};

const TAGS = [null, null, "New", null, "Best seller", null, null, "Everyday", null, "Bridal"];

function buildCluster(clusterId) {
  const def = CLUSTER_DEFS[clusterId];
  const list = [];
  def.types.forEach((type, i) => {
    const unitKind = def.units[i % def.units.length];
    const unit = UNIT_LABELS[unitKind](i);
    const price = Math.round((def.basePrice + i * def.step) / 10) * 10;
    const discountPct = [10, 15, 20, 12, 25, 18, 30, 15][i % 8];
    const mrp = Math.round((price / (1 - discountPct / 100)) / 10) * 10;
    const rating = Math.min(4.9, +(3.8 + ((i * 7) % 11) * 0.09).toFixed(1));
    const reviews = 24 + ((i * 53) % 480);
    const weaver = def.weavers[i % def.weavers.length];
    const tag = unitKind === "saree" ? TAGS[i % TAGS.length] : null;
    const suffix = unitKind === "saree" ? "Saree" : unitKind === "home" ? "" : unitKind.replace(/^\w/, (c) => c.toUpperCase());

    list.push({
      id: `${clusterId}-${i + 1}`,
      name: `${type} ${suffix}`.trim(),
      cluster: clusterId,
      weaver,
      price,
      mrp,
      discountPct,
      rating,
      reviews,
      unit,
      tag,
      seed: i, // drives this product's unique swatch variation — see Swatch.jsx
    });
  });
  return list;
}

export const products = Object.keys(CLUSTER_DEFS).flatMap(buildCluster);

export function formatINR(amount) {
  return "\u20B9" + amount.toLocaleString("en-IN");
}
