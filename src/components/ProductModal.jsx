import { useEffect, useState } from "react";
import Swatch from "./Swatch";
import { clusters, formatINR } from "../data/products";

export default function ProductModal({ product, onClose, onAdd, onAskAI }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failed, setFailed] = useState({});
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setFailed({});
    setLightboxOpen(false);
  }, [product]);

  const images = product?.images || [];

  // Close the lightbox on Escape, and step through photos with arrow keys.
  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]);

  if (!product) return null;
  const cluster = clusters.find((c) => c.id === product.cluster);
  const activeSrc = images[activeIndex];
  const activeOk = activeSrc && !failed[activeIndex];

  return (
    <>
      <div className="modal-scrim" onClick={onClose}>
        <div
          className="modal-panel"
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

          <div className="modal-gallery">
            {activeOk ? (
              <button
                className="modal-photo-btn"
                onClick={() => setLightboxOpen(true)}
                aria-label="View full-size photo"
              >
                <img
                  src={activeSrc}
                  alt={product.name}
                  className="modal-swatch modal-photo"
                  onError={() => setFailed((f) => ({ ...f, [activeIndex]: true }))}
                />
                <span className="modal-expand-hint">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  View full-size
                </span>
              </button>
            ) : (
              <Swatch {...cluster.swatch} className="modal-swatch" />
            )}

            {images.length > 1 && (
              <div className="modal-thumbs" role="tablist" aria-label="More photos">
                {images.map((src, i) => (
                  <button
                    key={i}
                    className={"modal-thumb" + (i === activeIndex ? " active" : "")}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Photo ${i + 1} of ${images.length}`}
                    aria-selected={i === activeIndex}
                    role="tab"
                  >
                    {!failed[i] ? (
                      <img
                        src={src}
                        alt=""
                        onError={() => setFailed((f) => ({ ...f, [i]: true }))}
                      />
                    ) : (
                      <Swatch {...cluster.swatch} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="modal-body">
            <span className="product-cluster">{cluster.name} · {cluster.state}</span>
            <h2>{product.name}</h2>
            <p className="modal-weaver">Woven by {product.weaver}</p>
            <p className="modal-note">{cluster.note}</p>

            <div className="modal-price-row">
              <div>
                <span className="product-price">{formatINR(product.price)}</span>
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

      {lightboxOpen && activeOk && (
        <div className="lightbox" onClick={() => setLightboxOpen(false)}>
          <button className="lightbox-close" onClick={() => setLightboxOpen(false)} aria-label="Close full-size photo">✕</button>

          {images.length > 1 && (
            <button
              className="lightbox-nav lightbox-prev"
              onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => (i - 1 + images.length) % images.length); }}
              aria-label="Previous photo"
            >
              ‹
            </button>
          )}

          <img
            src={activeSrc}
            alt={product.name}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              className="lightbox-nav lightbox-next"
              onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => (i + 1) % images.length); }}
              aria-label="Next photo"
            >
              ›
            </button>
          )}

          {images.length > 1 && (
            <span className="lightbox-counter">{activeIndex + 1} / {images.length}</span>
          )}
        </div>
      )}
    </>
  );
}
