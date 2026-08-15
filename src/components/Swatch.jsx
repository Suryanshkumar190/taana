// Renders a small generative pattern standing in for a fabric photograph.
// Each weave cluster gets a motif built from real characteristics of that
// textile (brocade repeat, temple border, sheer weave, ikat blur, block
// print grid, jamdani dot) rather than a stock image.
export default function Swatch({ base, accent, pattern, className = "" }) {
  const uid = `${pattern}-${base.replace("#", "")}`;

  const patterns = {
    brocade: (
      <pattern id={uid} width="34" height="34" patternUnits="userSpaceOnUse">
        <rect width="34" height="34" fill={base} />
        <path d="M17 2 L27 17 L17 32 L7 17 Z" fill="none" stroke={accent} strokeWidth="1.4" opacity="0.85" />
        <circle cx="17" cy="17" r="2.4" fill={accent} />
      </pattern>
    ),
    temple: (
      <pattern id={uid} width="30" height="30" patternUnits="userSpaceOnUse">
        <rect width="30" height="30" fill={base} />
        <path d="M0 26 L7 14 L15 26 Z" fill="none" stroke={accent} strokeWidth="1.6" />
        <path d="M15 26 L22 14 L30 26 Z" fill="none" stroke={accent} strokeWidth="1.6" />
      </pattern>
    ),
    sheer: (
      <pattern id={uid} width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill={base} />
        <line x1="0" y1="0" x2="0" y2="10" stroke={accent} strokeWidth="0.6" opacity="0.5" />
        <line x1="0" y1="0" x2="10" y2="0" stroke={accent} strokeWidth="0.6" opacity="0.35" />
      </pattern>
    ),
    ikat: (
      <pattern id={uid} width="26" height="26" patternUnits="userSpaceOnUse">
        <rect width="26" height="26" fill={base} />
        <rect x="4" y="4" width="18" height="18" fill="none" stroke={accent} strokeWidth="5" opacity="0.55" filter="blur(2px)" />
      </pattern>
    ),
    block: (
      <pattern id={uid} width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill={base} />
        <rect x="2" y="2" width="16" height="16" fill="none" stroke={accent} strokeWidth="1.2" />
        <circle cx="10" cy="10" r="1.6" fill={accent} />
      </pattern>
    ),
    dot: (
      <pattern id={uid} width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="16" height="16" fill={base} />
        <circle cx="8" cy="8" r="1.5" fill={accent} />
      </pattern>
    ),
  };

  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>{patterns[pattern] || patterns.dot}</defs>
      <rect width="100" height="100" fill={`url(#${uid})`} />
    </svg>
  );
}
