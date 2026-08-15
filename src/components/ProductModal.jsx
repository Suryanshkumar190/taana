import Swatch from "./Swatch";
import { clusters, formatINR } from "../data/products";

export default function ProductModal({ product, onClose, onAdd, onAskAI }) {
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

        <Swatch {...cluster.swatch} className="modal-swatch" />

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
  );
}
