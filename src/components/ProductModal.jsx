import { useEffect, useState } from "react";
import Swatch from "./Swatch";
import { clusters, formatINR } from "../data/products";
import { GALLERY_VIEWS } from "../data/galleryViews";

export default function ProductModal({ product, onClose, onAdd, onAskAI }) {
  const [activeView, setActiveView] = useState("full");

  useEffect(() => {
    setActiveView("full");
  }, [product]);

  if (!product) return null;
  const cluster = clusters.find((c) => c.id === product.cluster);

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <Swatch {...cluster.swatch} seed={product.seed} view={activeView} className="modal-swatch" />

        <div className="modal-thumbs" role="tablist" aria-label="More views">
          {GALLERY_VIEWS.map((v) => (
            <button
              key={v.id}
              className={"modal-thumb" + (v.id === activeView ? " active" : "")}
              onClick={() => setActiveView(v.id)}
              aria-label={v.label}
              aria-selected={v.id === activeView}
              role="tab"
            >
              <Swatch {...cluster.swatch} seed={product.seed} view={v.id} />
            </button>
          ))}
        </div>

        <div className="modal-body">
          <span className="product-cluster">{cluster.name} · {cluster.state}</span>
          <h2>{product.name}</h2>
          <p className="modal-weaver">Woven by {product.weaver}</p>
          <p className="modal-note">{cluster.note}</p>

          {product.rating && (
            <span className="mc-rating" style={{ marginTop: 10 }}>
              <span className="mc-rating-badge">
                {product.rating}
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9L22 9.7l-5.5 4.9L18 22l-6-3.6L6 22l1.5-7.4L2 9.7l7.1-.8L12 2z" /></svg>
              </span>
              <span className="mc-rating-count">{product.reviews} ratings</span>
            </span>
          )}

          <div className="modal-price-row">
            <div>
              <span className="mc-price-row" style={{ marginTop: 0 }}>
                <span className="product-price">{formatINR(product.price)}</span>
                {product.mrp > product.price && (
                  <>
                    <span className="mc-mrp">{formatINR(product.mrp)}</span>
                    <span className="mc-discount">{product.discountPct}% off</span>
                  </>
                )}
              </span>
              <span className="product-unit">{product.unit}</span>
            </div>
            <button className="btn btn-primary" onClick={() => onAdd(product)}>Add to cart</button>
          </div>

          <button
            className="modal-ask-ai"
            onClick={() => onAskAI(`Tell me more about the ${product.name} — is it a good fit for a formal occasion?`)}
          >
            Ask the weaving guide about this piece →
          </button>
        </div>
      </div>
    </div>
  );
}
