const THREAD_COLORS = ["var(--madder)", "var(--indigo-deep)", "var(--turmeric)", "var(--thread)"];

export default function Hero() {
  const threads = Array.from({ length: 22 });

  return (
    <section className="hero" id="top">
      <div className="hero-threads" aria-hidden="true">
        {threads.map((_, i) => (
          <span
            key={i}
            className="thread"
            style={{
              left: `${(i / (threads.length - 1)) * 100}%`,
              background: THREAD_COLORS[i % THREAD_COLORS.length],
              animationDelay: `${(i % 6) * 0.35}s`,
            }}
          />
        ))}
      </div>

      <div className="wrap hero-inner">
        <div className="hero-motif" aria-hidden="true">
          <span className="motif-line" />
          <span className="motif-dot" />
          <span className="motif-diamond">❖</span>
          <span className="motif-dot" />
          <span className="motif-line" />
        </div>

        <p className="hero-kicker">परंपरा · हस्तकला · विरासत — tradition, woven by hand</p>

        <span className="eyebrow">Handloom, bought direct</span>
        <h1>
          Every piece has<br />a weaver's name on it.
        </h1>
        <p className="hero-sub">
          Taana connects handloom weavers across India directly to buyers —
          no middleman markup, no anonymous "handcrafted" labels. You see
          the loom, the district, and the person who wove your fabric.
        </p>
        <div className="hero-actions">
          <a href="#shop" className="btn btn-primary">Explore the collection</a>
          <a href="#weavers" className="btn btn-ghost">Meet the weavers</a>
        </div>
      </div>
    </section>
  );
}
