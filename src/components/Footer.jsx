export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <span className="logo-text">Taana</span>
          <p>Handloom textiles, bought straight from the weaver.</p>
        </div>

        <div className="footer-cols">
          <div>
            <h4>Shop</h4>
            <a href="#shop">All weaves</a>
            <a href="#weavers">Our weavers</a>
            <a href="#how">How it works</a>
          </div>
          <div>
            <h4>Taana</h4>
            <a href="#top">About</a>
            <a href="#top">For weavers</a>
            <a href="#top">Contact</a>
          </div>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Taana. A student project — not a live marketplace.</span>
      </div>
    </footer>
  );
}
