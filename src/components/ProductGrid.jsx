import ProductCard from "./ProductCard";
import { products, clusters } from "../data/products";

export default function ProductGrid({ activeCluster, onAdd, onOpen, wishlist, onToggleWishlist }) {
  const list = activeCluster ? products.filter((p) => p.cluster === activeCluster) : products;
  const clusterName = activeCluster ? clusters.find((c) => c.id === activeCluster)?.name : null;

  return (
    <section className="section shop" id="shop">
      <div className="wrap">
        <div className="section-head">
          <h2>{clusterName ? `${clusterName} pieces` : "From the loom this week"}</h2>
          <p className="desc">
            {list.length} piece{list.length === 1 ? "" : "s"} available.
            Prices are set by the weaver, not marked up by Taana.
          </p>
        </div>

        <div className="pc-grid">
          {list.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={onAdd}
              onOpen={onOpen}
              wishlisted={wishlist?.includes(p.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>

        {list.length === 0 && (
          <p className="empty-state">No pieces listed under this weave right now — check back soon.</p>
        )}
      </div>
    </section>
  );
}
