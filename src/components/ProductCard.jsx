import Swatch from "./Swatch";
import { clusters, formatINR } from "../data/products";

export default function ProductCard({ product, onAdd, onOpen }) {
  const cluster = clusters.find((c) => c.id === product.cluster);

  return (
    <article className="product-card">
      <button className="product-open" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
        <div className="product-swatch-wrap">
          <Swatch {...cluster.swatch} className="product-swatch" />
          {product.tag && <span className="product-tag">{product.tag}</span>}
        </div>
        <div className="product-body">
          <span className="product-cluster">{cluster.name} · {cluster.state.split(",")[1]?.trim() || cluster.state}</span>
          <h3>{product.name}</h3>
          <p className="product-weaver">{product.weaver}</p>
        </div>
      </button>
      <div className="product-foot">
        <div>
          <span className="product-price">{formatINR(product.price)}</span>
          <span className="product-unit">{product.unit}</span>
        </div>
        <button className="add-btn" onClick={() => onAdd(product)}>Add</button>
      </div>
    </article>
  );
}
