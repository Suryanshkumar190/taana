import { useState } from "react";
import Swatch from "./Swatch";
import { clusters, formatINR } from "../data/products";

export default function ProductCard({ product, onAdd, onOpen, wishlisted, onToggleWishlist }) {
  const cluster = clusters.find((c) => c.id === product.cluster);
  const [failed, setFailed] = useState({});
  const photo = product.images?.[0];
  const hoverPhoto = product.images?.[1];
  const photoOk = photo && !failed[0];

  return (
    <article className="pc-card">
      <div className="pc-media">
        <button className="pc-open" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
          {photoOk ? (
            <>
              <img
                src={photo}
                alt={product.name}
                className="pc-img"
                loading="lazy"
                onError={() => setFailed((f) => ({ ...f, 0: true }))}
              />
              {hoverPhoto && !failed[1] && (
                <img
                  src={hoverPhoto}
                  alt=""
                  className="pc-img pc-img-hover"
                  loading="lazy"
                  onError={() => setFailed((f) => ({ ...f, 1: true }))}
                />
              )}
            </>
          ) : (
            <Swatch {...cluster.swatch} className="pc-img" />
          )}
        </button>

        {product.tag && <span className="pc-tag">{product.tag}</span>}

        <button
          className={"pc-heart" + (wishlisted ? " active" : "")}
          onClick={() => onToggleWishlist(product.id)}
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={wishlisted}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"}>
            <path d="M12 21s-7.5-4.7-10.2-9.2C.2 8.6 1.6 5 5.1 4.2c2-.5 4 .3 5.2 2 .3.4.9.4 1.2 0 1.2-1.7 3.2-2.5 5.2-2 3.5.8 4.9 4.4 3.3 7.6C19.5 16.3 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <button className="pc-info" onClick={() => onOpen(product)}>
        <div className="pc-info-top">
          <span className="pc-cluster">{cluster.name}</span>
          <span className="pc-district">{cluster.state.split(",")[1]?.trim() || cluster.state}</span>
        </div>
        <h3 className="pc-title">{product.name}</h3>
        <p className="pc-weaver">by {product.weaver}</p>
      </button>

      <div className="pc-foot">
        <div className="pc-price-block">
          <span className="pc-price">{formatINR(product.price)}</span>
          <span className="pc-unit">{product.unit}</span>
        </div>
        <button className="pc-add" onClick={() => onAdd(product)}>Add</button>
      </div>
    </article>
  );
}
