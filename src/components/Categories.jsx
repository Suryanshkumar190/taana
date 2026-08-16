import Swatch from "./Swatch";
import { clusters } from "../data/products";

function goToShop() {
  document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
}

export default function Categories({ activeCluster, onSelect }) {
  function selectAndScroll(id) {
    onSelect(id);
    goToShop();
  }

  return (
    <section className="section cat-section" id="weavers">
      <div className="cat-motif" aria-hidden="true">
        <span className="motif-line" />
        <span className="motif-dot" />
        <span className="motif-diamond">❖</span>
        <span className="motif-dot" />
        <span className="motif-line" />
      </div>

      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">The weaves, up close</span>
            <h2>Six weaves, six districts,<br />no two looms alike.</h2>
          </div>
          <p className="desc">
            Every cluster on Taana is a real weaving community. Filter the
            shop above, or read what makes each weave technically distinct.
          </p>
        </div>

        <div className="cat-scroll">
          <button
            className={"cat-pill" + (activeCluster === null ? " active" : "")}
            onClick={() => selectAndScroll(null)}
          >
            <span className="cat-avatar cat-avatar-all">All</span>
            <span className="cat-label">All weaves</span>
          </button>

          {clusters.map((c) => (
            <button
              key={c.id}
              className={"cat-pill" + (activeCluster === c.id ? " active" : "")}
              onClick={() => selectAndScroll(c.id)}
            >
              <span className="cat-avatar">
                <Swatch {...c.swatch} />
              </span>
              <span className="cat-label">{c.name}</span>
            </button>
          ))}
        </div>

        <dl className="cat-stats">
          <div>
            <dt>Weave clusters</dt>
            <dd>6 states</dd>
          </div>
          <div>
            <dt>Weavers onboarded</dt>
            <dd>140+</dd>
          </div>
          <div>
            <dt>Cut to weaver</dt>
            <dd>No commission on first sale</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
