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

function commons(file, width = 900) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

// COVER photos = always an actual saree/textile/garment shot. This pool
// is the only thing allowed at images[0], so a product card's thumbnail
// is never a loom or machine.
const COVERS = {
  banarasi: [
    commons("Banarasi Silk Saree.jpg"),
    commons("Banarasi sari pallu by ashish4.JPG"),
    commons("Saree on display at Dilli Haat.JPG"),
  ],
  kanjeevaram: [
    commons("Kanchipuram silk sareer.JPG"),
    commons("Original pattu saree trademark.jpg"),
  ],
  chanderi: [
    commons("KASHTHA SAREE.jpg"),
    commons("Indian Saree kuchu knots.jpg"),
  ],
  ikat: [
    commons("Pochampalli Ikat saree.jpg"),
    commons("Indian Saree kuchu knots.jpg"),
  ],
  ajrakh: [
    commons("Ajrak.jpg"),
    commons("KASHTHA SAREE.jpg"),
  ],
  jamdani: [
    commons("Bangladeshi bride in Jamdani sari.jpg"),
    commons("KASHTHA SAREE.jpg"),
  ],
};

// DETAIL photos = loom/process/texture shots. Shown only as the 2nd/3rd
// image in a product's gallery, never as the card cover.
const DETAILS = {
  banarasi: [commons("India - Varanasi loom - 0987.jpg")],
  kanjeevaram: [
    commons("Silk Sari Weaving at Kanchipuram, Tamil Nadu.jpg"),
    commons("Complicated hand-loom for silk weaving, Kanchipuram, Tamil Nadu.jpg"),
  ],
  chanderi: [
    commons("A man weaving the famous handloom Chanderi Saree.jpg"),
    commons("Looms at Rehwa society, Maheshwari handloom sarees weavers society, Maheshwar.jpg"),
    commons("Saree Weaving by Handloom 3.jpg"),
  ],
  ikat: [
    commons("Saree Weaving by Handloom 3.jpg"),
    commons("Assamese woman using traditional handloom.jpg"),
  ],
  ajrakh: [
    commons("Looms at Rehwa society, Maheshwari handloom sarees weavers society, Maheshwar.jpg"),
  ],
  jamdani: [
    commons("The delicate process of making a Jamdani saree has been passed down from generation to generation.jpg"),
  ],
};

// Builds a per-product gallery: cover photo first (rotated by `index` so
// products in the same cluster don't all show the same lead photo),
// a second cover if one exists, then up to two process/detail shots.
function galleryFor(clusterId, index) {
  const covers = COVERS[clusterId];
  const details = DETAILS[clusterId] || [];
  const primary = covers[index % covers.length];
  const secondary = covers.length > 1 ? covers[(index + 1) % covers.length] : null;
  return [primary, secondary, ...details.slice(0, 2)].filter(Boolean);
}

export const products = [
  // ---------- Banarasi ----------
  { id: "p1", name: "Meenakari Zari Saree", cluster: "banarasi", weaver: "Rehmat Textiles, Varanasi", price: 18400, unit: "6.3m saree", tag: "Best seller", images: galleryFor("banarasi", 0) },
  { id: "p2", name: "Banarasi Katan Silk Stole", cluster: "banarasi", weaver: "Rehmat Textiles, Varanasi", price: 5400, unit: "2.2m stole", images: galleryFor("banarasi", 1) },
  { id: "p3", name: "Tissue Zari Wedding Saree", cluster: "banarasi", weaver: "Ansari Zari House, Varanasi", price: 21900, unit: "6.3m saree", tag: "Bridal", images: galleryFor("banarasi", 2) },
  { id: "p4", name: "Butidar Brocade Saree", cluster: "banarasi", weaver: "Gangajali Weaves, Varanasi", price: 16750, unit: "6.3m saree", images: galleryFor("banarasi", 0) },
  { id: "p5", name: "Cutwork Cotton-Silk Saree", cluster: "banarasi", weaver: "Rehmat Textiles, Varanasi", price: 8200, unit: "6m saree", tag: "Everyday", images: galleryFor("banarasi", 1) },

  // ---------- Kanjeevaram ----------
  { id: "p6", name: "Korvai Temple-Border Saree", cluster: "kanjeevaram", weaver: "Lakshmi Silk Weavers, Kanchipuram", price: 24900, unit: "6.3m saree", images: galleryFor("kanjeevaram", 0) },
  { id: "p7", name: "Thread-Brocade Bridal Saree", cluster: "kanjeevaram", weaver: "Sri Meenakshi Silks, Kanchipuram", price: 32500, unit: "6.3m saree", tag: "Bridal", images: galleryFor("kanjeevaram", 1) },
  { id: "p8", name: "Checked Silk Saree", cluster: "kanjeevaram", weaver: "Lakshmi Silk Weavers, Kanchipuram", price: 15600, unit: "6.3m saree", images: galleryFor("kanjeevaram", 0) },
  { id: "p9", name: "Pure Mulberry Silk Saree", cluster: "kanjeevaram", weaver: "Arani Handloom Cooperative", price: 19800, unit: "6.3m saree", tag: "New", images: galleryFor("kanjeevaram", 1) },
  { id: "p10", name: "Contrast Pallu Silk Saree", cluster: "kanjeevaram", weaver: "Sri Meenakshi Silks, Kanchipuram", price: 21200, unit: "6.3m saree", images: galleryFor("kanjeevaram", 0) },

  // ---------- Chanderi ----------
  { id: "p11", name: "Chanderi Sheer Dupatta", cluster: "chanderi", weaver: "Baghora Handlooms, Ashoknagar", price: 3200, unit: "2.5m dupatta", tag: "New", images: galleryFor("chanderi", 0) },
  { id: "p12", name: "Chanderi Silk-Cotton Saree", cluster: "chanderi", weaver: "Baghora Handlooms, Ashoknagar", price: 6800, unit: "5.5m saree", images: galleryFor("chanderi", 1) },
  { id: "p13", name: "Chanderi Booti Saree", cluster: "chanderi", weaver: "Chanderiyaan Weavers Trust", price: 7400, unit: "5.5m saree", images: galleryFor("chanderi", 2) },
  { id: "p14", name: "Chanderi Zari-Border Stole", cluster: "chanderi", weaver: "Baghora Handlooms, Ashoknagar", price: 2650, unit: "2.2m stole", images: galleryFor("chanderi", 0) },
  { id: "p15", name: "Chanderi Handloom Running Fabric", cluster: "chanderi", weaver: "Chanderiyaan Weavers Trust", price: 1450, unit: "per metre", images: galleryFor("chanderi", 1) },

  // ---------- Ikat ----------
  { id: "p16", name: "Double Ikat Pochampally Stole", cluster: "ikat", weaver: "Nalgonda Weavers Collective", price: 4650, unit: "2.1m stole", images: galleryFor("ikat", 0) },
  { id: "p17", name: "Ikat Cotton Cushion Cover Set", cluster: "ikat", weaver: "Nalgonda Weavers Collective", price: 1650, unit: "set of 2", tag: "Home", images: galleryFor("ikat", 1) },
  { id: "p18", name: "Telia Rumal Ikat Saree", cluster: "ikat", weaver: "Puttapaka Ikat Cooperative", price: 9200, unit: "5.8m saree", images: galleryFor("ikat", 0) },
  { id: "p19", name: "Pochampally Ikat Silk Saree", cluster: "ikat", weaver: "Nalgonda Weavers Collective", price: 13400, unit: "6m saree", tag: "Best seller", images: galleryFor("ikat", 1) },
  { id: "p20", name: "Ikat Cotton Running Fabric", cluster: "ikat", weaver: "Puttapaka Ikat Cooperative", price: 1180, unit: "per metre", images: galleryFor("ikat", 0) },

  // ---------- Ajrakh ----------
  { id: "p21", name: "Ajrakh Block-Print Running Fabric", cluster: "ajrakh", weaver: "Khatri Ajrakh House, Dhamadka", price: 2850, unit: "per metre", images: galleryFor("ajrakh", 0) },
  { id: "p22", name: "Ajrakh Modal Silk Saree", cluster: "ajrakh", weaver: "Khatri Ajrakh House, Dhamadka", price: 6900, unit: "5.8m saree", tag: "New", images: galleryFor("ajrakh", 1) },
  { id: "p23", name: "Ajrakh Cotton Dupatta", cluster: "ajrakh", weaver: "Ajrakhpur Printers Guild", price: 1950, unit: "2.4m dupatta", images: galleryFor("ajrakh", 0) },
  { id: "p24", name: "Ajrakh Indigo Bedcover", cluster: "ajrakh", weaver: "Ajrakhpur Printers Guild", price: 4200, unit: "single bedcover", tag: "Home", images: galleryFor("ajrakh", 1) },
  { id: "p25", name: "Ajrakh Hand-Block Stole", cluster: "ajrakh", weaver: "Khatri Ajrakh House, Dhamadka", price: 2100, unit: "2.2m stole", images: galleryFor("ajrakh", 0) },

  // ---------- Jamdani ----------
  { id: "p26", name: "Jamdani Motif Cotton Saree", cluster: "jamdani", weaver: "Phulia Jamdani Cooperative", price: 7900, unit: "5.5m saree", images: galleryFor("jamdani", 0) },
  { id: "p27", name: "Jamdani Silk-Cotton Saree", cluster: "jamdani", weaver: "Phulia Jamdani Cooperative", price: 11200, unit: "5.5m saree", tag: "Best seller", images: galleryFor("jamdani", 1) },
  { id: "p28", name: "Dhakai Jamdani Saree", cluster: "jamdani", weaver: "Shantipur Jamdani Weavers", price: 15800, unit: "6m saree", tag: "Bridal", images: galleryFor("jamdani", 0) },
  { id: "p29", name: "Jamdani Cotton Stole", cluster: "jamdani", weaver: "Phulia Jamdani Cooperative", price: 2400, unit: "2.2m stole", images: galleryFor("jamdani", 1) },
  { id: "p30", name: "Jamdani Booti Dupatta", cluster: "jamdani", weaver: "Shantipur Jamdani Weavers", price: 2950, unit: "2.4m dupatta", tag: "New", images: galleryFor("jamdani", 0) },
];

export function formatINR(amount) {
  return "\u20B9" + amount.toLocaleString("en-IN");
}
