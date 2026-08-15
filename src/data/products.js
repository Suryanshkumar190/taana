// Weave clusters featured on the site. Each has a CSS pattern signature
// (used to render a generative "swatch" instead of a stock photo) built
// from colors and motifs genuinely associated with the weave.
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

export const products = [
  {
    id: "p1",
    name: "Meenakari Zari Saree",
    cluster: "banarasi",
    weaver: "Rehmat Textiles, Varanasi",
    price: 18400,
    unit: "6.3m saree",
    tag: "Best seller",
  },
  {
    id: "p2",
    name: "Korvai Temple-Border Saree",
    cluster: "kanjeevaram",
    weaver: "Lakshmi Silk Weavers, Kanchipuram",
    price: 24900,
    unit: "6.3m saree",
  },
  {
    id: "p3",
    name: "Chanderi Sheer Dupatta",
    cluster: "chanderi",
    weaver: "Baghora Handlooms, Ashoknagar",
    price: 3200,
    unit: "2.5m dupatta",
    tag: "New",
  },
  {
    id: "p4",
    name: "Double Ikat Pochampally Stole",
    cluster: "ikat",
    weaver: "Nalgonda Weavers Collective",
    price: 4650,
    unit: "2.1m stole",
  },
  {
    id: "p5",
    name: "Ajrakh Block-Print Running Fabric",
    cluster: "ajrakh",
    weaver: "Khatri Ajrakh House, Dhamadka",
    price: 2850,
    unit: "per metre",
  },
  {
    id: "p6",
    name: "Jamdani Motif Cotton Saree",
    cluster: "jamdani",
    weaver: "Phulia Jamdani Cooperative",
    price: 7900,
    unit: "5.5m saree",
  },
  {
    id: "p7",
    name: "Banarasi Katan Silk Stole",
    cluster: "banarasi",
    weaver: "Rehmat Textiles, Varanasi",
    price: 5400,
    unit: "2.2m stole",
  },
  {
    id: "p8",
    name: "Ikat Cotton Cushion Cover Set",
    cluster: "ikat",
    weaver: "Nalgonda Weavers Collective",
    price: 1650,
    unit: "set of 2",
    tag: "Home",
  },
];

export function formatINR(amount) {
  return "\u20B9" + amount.toLocaleString("en-IN");
}
