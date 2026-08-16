import Swatch from "./Swatch";
import { clusters, formatINR } from "../data/products";

export default function ProductCard({ product, onAdd, onOpen, wishlisted, onToggleWishlist }) {
  const cluster = clusters.find((c) => c.id === product.cluster);
  const brand = product.weaver.split(",")[0];

  return (
    <article className="mc-card">
      <div className="mc-media">
        <button className="mc-open" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
          <Swatch {...cluster.swatch} seed={product.seed} className="mc-img" />
        </button>

        {product.tag && <span className="mc-tag">{product.tag}</span>}

        <button
          className={"mc-heart" + (wishlisted ? " active" : "")}
          onClick={() => onToggleWishlist(product.id)}
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={wishlisted}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"}>
            <path d="M12 21s-7.5-4.7-10.2-9.2C.2 8.6 1.6 5 5.1 4.2c2-.5 4 .3 5.2 2 .3.4.9.4 1.2 0 1.2-1.7 3.2-2.5 5.2-2 3.5.8 4.9 4.4 3.3 7.6C19.5 16.3 12 21 12 21Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          </svg>
        </button>

        <button className="mc-quickadd" onClick={() => onAdd(product)}>Add to bag</button>
      </div>

      <button className="mc-info" onClick={() => onOpen(product)}>
        <span className="mc-brand">{brand}</span>
        <span className="mc-title">{product.name}</span>

        <span className="mc-price-row">
          <span className="mc-price">{formatINR(product.price)}</span>
          {product.mrp > product.price && (
            <>
              <span className="mc-mrp">{formatINR(product.mrp)}</span>
              <span className="mc-discount">{product.discountPct}% off</span>
            </>
          )}
        </span>

        {product.rating && (
          <span className="mc-rating">
            <span className="mc-rating-badge">
              {product.rating}
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9L22 9.7l-5.5 4.9L18 22l-6-3.6L6 22l1.5-7.4L2 9.7l7.1-.8L12 2z" /></svg>
            </span>
            <span className="mc-rating-count">{product.reviews}</span>
          </span>
        )}

        <span className="mc-unit">{product.unit} · {cluster.name}</span>
      </button>
    </article>
  );
}
