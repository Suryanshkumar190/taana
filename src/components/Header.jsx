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
          <svg width="30" height="30" viewBox="0 0 22 22" aria-hidden="true">
            <line x1="4" y1="0" x2="4" y2="22" stroke="var(--madder)" strokeWidth="1.8" />
            <line x1="11" y1="0" x2="11" y2="22" stroke="var(--indigo-deep)" strokeWidth="1.8" />
            <line x1="18" y1="0" x2="18" y2="22" stroke="var(--turmeric)" strokeWidth="1.8" />
          </svg>
          <span>Taana</span>
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
