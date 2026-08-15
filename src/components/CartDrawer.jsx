import { formatINR } from "../data/products";

export default function CartDrawer({ open, items, onClose, onRemove, onQty }) {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      <div className={"cart-scrim" + (open ? " open" : "")} onClick={onClose} />
      <aside className={"cart-drawer" + (open ? " open" : "")} aria-hidden={!open}>
        <div className="cart-head">
          <h3>Your cart</h3>
          <button onClick={onClose} aria-label="Close cart" className="cart-close">✕</button>
        </div>

        {items.length === 0 ? (
          <p className="cart-empty">Nothing here yet. Add a piece from the shop to start.</p>
        ) : (
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <span className="cart-item-price">{formatINR(item.price)}</span>
                </div>
                <div className="cart-item-controls">
                  <div className="qty-stepper">
                    <button onClick={() => onQty(item.id, item.qty - 1)} aria-label="Decrease quantity">−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => onQty(item.id, item.qty + 1)} aria-label="Increase quantity">+</button>
                  </div>
                  <button className="cart-remove" onClick={() => onRemove(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-foot">
          <div className="cart-total">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>
          <button className="btn btn-primary cart-checkout" disabled={items.length === 0}>
            Checkout
          </button>
          <p className="cart-note">Demo storefront — checkout is not wired to payments.</p>
        </div>
      </aside>
    </>
  );
}
