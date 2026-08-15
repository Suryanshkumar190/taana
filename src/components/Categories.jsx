import Swatch from "./Swatch";
import { clusters } from "../data/products";

export default function Categories({ activeCluster, onSelect }) {
  return (
    <section className="section clusters" id="weavers">
      <div className="wrap">
        <div className="section-head">
          <h2>Six weaves, six districts, no two looms alike.</h2>
          <p className="desc">
            Every cluster on Taana is a real weaving community. Filter the
            shop below, or read what makes each weave technically distinct.
          </p>
        </div>

        <div className="cluster-row">
          <button
            className={"cluster-card cluster-all" + (activeCluster === null ? " active" : "")}
            onClick={() => onSelect(null)}
          >
            <span className="cluster-all-label">All weaves</span>
          </button>

          {clusters.map((c) => (
            <button
              key={c.id}
              className={"cluster-card" + (activeCluster === c.id ? " active" : "")}
              onClick={() => onSelect(c.id)}
            >
              <Swatch {...c.swatch} className="cluster-swatch" />
              <span className="cluster-meta">
                <strong>{c.name}</strong>
                <em>{c.state}</em>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
