import Swatch from "./Swatch";
import { clusters } from "../data/products";

export default function Categories({ activeCluster, onSelect }) {
  return (
    <section className="section cat-section" id="weavers">
      <div className="wrap">
        <div className="section-head">
          <h2>Six weaves, six districts, no two looms alike.</h2>
          <p className="desc">
            Every cluster on Taana is a real weaving community. Filter the
            shop below, or read what makes each weave technically distinct.
          </p>
        </div>

        <div className="cat-scroll">
          <button
            className={"cat-pill" + (activeCluster === null ? " active" : "")}
            onClick={() => onSelect(null)}
          >
            <span className="cat-avatar cat-avatar-all">All</span>
            <span className="cat-label">All weaves</span>
          </button>

          {clusters.map((c) => (
            <button
              key={c.id}
              className={"cat-pill" + (activeCluster === c.id ? " active" : "")}
              onClick={() => onSelect(c.id)}
            >
              <span className="cat-avatar">
                <Swatch {...c.swatch} />
              </span>
              <span className="cat-label">{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
