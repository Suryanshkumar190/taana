const steps = [
  {
    n: "01",
    title: "A weaver lists a piece",
    body: "The weaver or their cooperative photographs and prices the piece themselves. Taana doesn't set prices or minimum order quantities.",
  },
  {
    n: "02",
    title: "You browse by weave, not by brand",
    body: "Filter by cluster and district. Every listing shows the technique, the loom time, and who made it.",
  },
  {
    n: "03",
    title: "Payment goes to the weaver, direct",
    body: "Taana takes a flat listing fee, not a cut of the sale price — so the price you pay is closer to what the weaver actually asked for.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section how" id="how">
      <div className="wrap">
        <div className="section-head">
          <h2>How a piece gets from loom to your door.</h2>
        </div>
        <ol className="steps">
          {steps.map((s) => (
            <li key={s.n} className="step">
              <span className="step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
