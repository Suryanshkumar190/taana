// A slim repeating temple-triangle strip, styled after the woven border
// that runs along a saree's edge — used as a section divider so the
// clean white canvas still carries a handloom detail instead of a plain
// empty gap.
export default function BorderMotif() {
  const tris = Array.from({ length: 40 });
  return (
    <div className="border-motif" aria-hidden="true">
      <svg viewBox="0 0 400 14" preserveAspectRatio="none">
        {tris.map((_, i) => (
          <path
            key={i}
            d={`M${i * 10} 12 L${i * 10 + 5} 2 L${i * 10 + 10} 12 Z`}
            fill="none"
            stroke={i % 2 === 0 ? "var(--madder)" : "var(--indigo-deep)"}
            strokeWidth="1"
            opacity="0.55"
          />
        ))}
      </svg>
    </div>
  );
}
