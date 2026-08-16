// Draws a stylised "folded saree" product shot. Earlier versions only
// hue-shifted one fixed layout (diamond body + block pallu) per product,
// which is why every piece in a cluster still read as "the same saree,
// different color". This version instead picks a genuinely different
// BODY pattern family, BORDER treatment, and PALLU treatment per product
// — three independent seeded choices — so two products only look alike
// if all three choices *and* the hue land the same, which across a
// 10 × 5 × 4 combination space is effectively never within one cluster.
// Cluster identity still comes through via the base/accent color pair;
// everything else about the drawing is per-product.

const VIEWBOX = {
  full: "0 0 160 100",
  pallu: "116 0 44 100",
  border: "0 66 122 34",
  drape: "0 0 160 100",
};

// ---- body pattern families -------------------------------------------
// Each returns the *contents* of a <pattern> tile given the two colors
// and a size multiplier. Kept intentionally distinct in silhouette
// (diamonds vs checks vs stripes vs waves vs paisley...) rather than
// just re-coloring one shape.
const BODY_PATTERNS = [
  // 0 diamond lattice
  (c1, c2, s) => ({
    size: 34 * s,
    content: (
      <>
        <rect width={34 * s} height={34 * s} fill={c1} />
        <path d={`M${17 * s} ${2 * s} L${27 * s} ${17 * s} L${17 * s} ${32 * s} L${7 * s} ${17 * s} Z`} fill="none" stroke={c2} strokeWidth="1.4" opacity="0.85" />
        <circle cx={17 * s} cy={17 * s} r={2.4 * s} fill={c2} />
      </>
    ),
  }),
  // 1 chevron / temple rows
  (c1, c2, s) => ({
    size: 30 * s,
    content: (
      <>
        <rect width={30 * s} height={30 * s} fill={c1} />
        <path d={`M0 ${26 * s} L${7 * s} ${14 * s} L${15 * s} ${26 * s} Z`} fill="none" stroke={c2} strokeWidth="1.6" />
        <path d={`M${15 * s} ${26 * s} L${22 * s} ${14 * s} L${30 * s} ${26 * s} Z`} fill="none" stroke={c2} strokeWidth="1.6" />
      </>
    ),
  }),
  // 2 check / plaid
  (c1, c2, s) => ({
    size: 18 * s,
    content: (
      <>
        <rect width={18 * s} height={18 * s} fill={c1} />
        <rect width={18 * s} height={2.2 * s} fill={c2} opacity="0.75" />
        <rect width={2.2 * s} height={18 * s} fill={c2} opacity="0.75" />
      </>
    ),
  }),
  // 3 vertical stripes
  (c1, c2, s) => ({
    size: 14 * s,
    content: (
      <>
        <rect width={14 * s} height={14 * s} fill={c1} />
        <rect width={4 * s} height={14 * s} fill={c2} opacity="0.8" />
      </>
    ),
  }),
  // 4 polka / booti dot grid
  (c1, c2, s) => ({
    size: 16 * s,
    content: (
      <>
        <rect width={16 * s} height={16 * s} fill={c1} />
        <circle cx={8 * s} cy={8 * s} r={1.5 * s} fill={c2} />
      </>
    ),
  }),
  // 5 ring / circle motif
  (c1, c2, s) => ({
    size: 22 * s,
    content: (
      <>
        <rect width={22 * s} height={22 * s} fill={c1} />
        <circle cx={11 * s} cy={11 * s} r={5.5 * s} fill="none" stroke={c2} strokeWidth="1.4" />
      </>
    ),
  }),
  // 6 cross / plus motif
  (c1, c2, s) => ({
    size: 18 * s,
    content: (
      <>
        <rect width={18 * s} height={18 * s} fill={c1} />
        <rect x={7.5 * s} y={3 * s} width={3 * s} height={12 * s} fill={c2} opacity="0.85" />
        <rect x={3 * s} y={7.5 * s} width={12 * s} height={3 * s} fill={c2} opacity="0.85" />
      </>
    ),
  }),
  // 7 sheer horizontal weave lines
  (c1, c2, s) => ({
    size: 10 * s,
    content: (
      <>
        <rect width={10 * s} height={10 * s} fill={c1} />
        <line x1="0" y1="0" x2="0" y2={10 * s} stroke={c2} strokeWidth="0.6" opacity="0.5" />
        <line x1="0" y1="0" x2={10 * s} y2="0" stroke={c2} strokeWidth="0.6" opacity="0.35" />
      </>
    ),
  }),
  // 8 paisley-ish teardrop
  (c1, c2, s) => ({
    size: 24 * s,
    content: (
      <>
        <rect width={24 * s} height={24 * s} fill={c1} />
        <path d={`M${12 * s} ${4 * s} Q${20 * s} ${8 * s} ${14 * s} ${18 * s} Q${10 * s} ${22 * s} ${6 * s} ${16 * s} Q${4 * s} ${8 * s} ${12 * s} ${4 * s} Z`} fill="none" stroke={c2} strokeWidth="1.3" opacity="0.85" />
      </>
    ),
  }),
  // 9 ikat blur blocks
  (c1, c2, s) => ({
    size: 26 * s,
    content: (
      <>
        <rect width={26 * s} height={26 * s} fill={c1} />
        <rect x={4 * s} y={4 * s} width={18 * s} height={18 * s} fill="none" stroke={c2} strokeWidth="5" opacity="0.55" filter="blur(1.5px)" />
      </>
    ),
  }),
];

// ---- border treatments (bottom band of the body) ----------------------
const BORDER_STYLES = [
  // 0 slim single line
  (accent) => <rect x="0" y="0" width="122" height="2" fill={accent} opacity="0.9" />,
  // 1 temple triangle row
  (accent) => (
    <g fill="none" stroke={accent} strokeWidth="1.4">
      {Array.from({ length: 14 }).map((_, i) => (
        <path key={i} d={`M${i * 9} 8 L${i * 9 + 4.5} 0 L${i * 9 + 9} 8`} />
      ))}
    </g>
  ),
  // 2 dashed row
  (accent) => (
    <g fill={accent} opacity="0.85">
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={i * 6.2} y="2" width="3.6" height="4" />
      ))}
    </g>
  ),
  // 3 double line
  (accent) => (
    <>
      <rect x="0" y="0" width="122" height="1.4" fill={accent} opacity="0.9" />
      <rect x="0" y="5" width="122" height="1.4" fill={accent} opacity="0.6" />
    </>
  ),
  // 4 dot row
  (accent) => (
    <g fill={accent} opacity="0.85">
      {Array.from({ length: 30 }).map((_, i) => (
        <circle key={i} cx={i * 4.1 + 2} cy="4" r="1.3" />
      ))}
    </g>
  ),
];

// ---- pallu treatments (right-hand decorative end block) ----------------
const PALLU_KINDS = ["dense", "solid", "emblem", "stripes"];

export default function Swatch({ base, accent, pattern, seed = 0, view = "full", className = "" }) {
  const clusterSalt = pattern.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const uid = `${pattern}-${base.replace("#", "")}-${seed}`;

  const hue = ((seed * 37 + clusterSalt) % 40) - 20;
  const scale = 0.82 + ((seed * 13) % 7) * 0.06;
  const rotate = (seed * 23) % 360;
  const foldAngle = 8 + ((seed * 17) % 10);
  const isDrape = view === "drape";

  const bodyPatternFn = BODY_PATTERNS[(seed * 3 + clusterSalt) % BODY_PATTERNS.length];
  const borderFn = BORDER_STYLES[(seed * 7 + clusterSalt * 2) % BORDER_STYLES.length];
  const palluKind = PALLU_KINDS[(seed * 5 + clusterSalt * 3) % PALLU_KINDS.length];
  const swapBodyColors = seed % 2 === 1; // some pieces read dark-on-light, others light-on-dark

  const bodyId = `${uid}-body`;
  const palluId = `${uid}-pallu`;
  const sheenId = `${uid}-sheen`;

  const bc1 = swapBodyColors ? accent : base;
  const bc2 = swapBodyColors ? base : accent;
  const body = bodyPatternFn(bc1, bc2, scale);
  const pallu = bodyPatternFn(accent, base, scale * 0.4);

  return (
    <svg
      className={className}
      viewBox={VIEWBOX[view] || VIEWBOX.full}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ filter: `hue-rotate(${hue}deg)${isDrape ? " brightness(0.94)" : ""}` }}
    >
      <defs>
        <pattern id={bodyId} width={body.size} height={body.size} patternUnits="userSpaceOnUse">
          {body.content}
        </pattern>
        <pattern id={palluId} width={pallu.size} height={pallu.size} patternUnits="userSpaceOnUse">
          {pallu.content}
        </pattern>
        <linearGradient id={sheenId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity={isDrape ? "0.22" : "0.16"} />
          <stop offset="35%" stopColor="#fff" stopOpacity="0" />
          <stop offset="70%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity={isDrape ? "0.2" : "0.12"} />
        </linearGradient>
      </defs>

      {/* body — the main fabric field */}
      <rect x="0" y="0" width="128" height="100" fill={`url(#${bodyId})`} transform={`rotate(${rotate * 0.03} 64 50)`} />

      {/* zari divider between body and pallu */}
      <rect x="122" y="0" width="6" height="100" fill={accent} opacity="0.9" />

      {/* pallu block — treatment varies: dense pattern, solid color, single emblem, or stripes */}
      {palluKind === "dense" && <rect x="128" y="0" width="32" height="100" fill={`url(#${palluId})`} />}
      {palluKind === "solid" && <rect x="128" y="0" width="32" height="100" fill={accent} opacity="0.92" />}
      {palluKind === "stripes" && (
        <g>
          <rect x="128" y="0" width="32" height="100" fill={base} />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x="128" y={i * 20} width="32" height="9" fill={accent} opacity="0.85" />
          ))}
        </g>
      )}
      {palluKind === "emblem" && (
        <g>
          <rect x="128" y="0" width="32" height="100" fill={base} />
          <circle cx="144" cy="50" r="13" fill="none" stroke={accent} strokeWidth="2.2" />
          <circle cx="144" cy="50" r="5" fill={accent} />
        </g>
      )}
      <rect x="128" y="0" width="32" height="8" fill={accent} opacity="0.85" />
      <rect x="128" y="92" width="32" height="8" fill={accent} opacity="0.85" />

      {/* border band along the bottom of the body */}
      <g transform="translate(0 82)">{borderFn(accent)}</g>
      <rect x="0" y="80" width="122" height="1.6" fill={accent} opacity="0.55" />

      {/* soft diagonal fold lines to suggest folded cloth rather than a flat tile */}
      <g stroke="#000" strokeOpacity={isDrape ? "0.14" : "0.08"} strokeWidth="1.1">
        <line x1="0" y1={20 + foldAngle * 0.4} x2="160" y2={8} />
        <line x1="0" y1={48 + foldAngle * 0.3} x2="160" y2={38} />
        <line x1="0" y1={74} x2="160" y2={66 - foldAngle * 0.2} />
        {isDrape && (
          <>
            <line x1="0" y1={4} x2="160" y2={16 + foldAngle * 0.2} />
            <line x1="0" y1={92} x2="160" y2={84 - foldAngle * 0.15} />
          </>
        )}
      </g>

      {/* silk sheen */}
      <rect x="0" y="0" width="160" height="100" fill={`url(#${sheenId})`} />
    </svg>
  );
}
