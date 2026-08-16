export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="site-header">
      <div className="header-accent" aria-hidden="true">
        <span style={{ background: "var(--madder)" }} />
        <span style={{ background: "var(--turmeric)" }} />
        <span style={{ background: "var(--indigo-deep)" }} />
      </div>
      <div className="wrap site-header-inner">
        <a href="#top" className="logo">
          <span className="logo-mark">
            <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
              <rect x="1" y="1" width="32" height="32" rx="7" fill="var(--indigo-deep)" />
              <g stroke="var(--khadi)" strokeWidth="1.5" strokeLinecap="round">
                <line x1="9" y1="6" x2="9" y2="28" />
                <line x1="17" y1="6" x2="17" y2="28" />
                <line x1="25" y1="6" x2="25" y2="28" />
              </g>
              <g stroke="var(--turmeric)" strokeWidth="1.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="29" y2="12" />
                <line x1="5" y1="22" x2="29" y2="22" />
              </g>
              <circle cx="17" cy="17" r="2.4" fill="var(--madder)" />
            </svg>
          </span>
          <span className="logo-word">
            Taana<span className="logo-dot">.</span>
          </span>
        </a>

        <nav className="site-nav">
          <a href="#shop">Shop</a>
          <a href="#weavers">Our Weavers</a>
          <a href="#how">How it works</a>
        </nav>

        <button className="cart-trigger" onClick={onCartClick} aria-label="Open cart">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 4h2l2.4 12.4A2 2 0 0 0 9.36 18H18a2 2 0 0 0 1.96-1.6L21.5 8H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9.5" cy="21" r="1.3" fill="currentColor" />
            <circle cx="17.5" cy="21" r="1.3" fill="currentColor" />
          </svg>
          <span>Cart</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
