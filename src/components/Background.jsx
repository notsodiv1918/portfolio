export default function Background() {
  return (
    <section className="frame" data-name="Background" id="background">
      <span className="frame-label">Background<em>1100 × Hug</em></span>
      <div className="head">
        <h2 className="sel" data-label="Heading 2" data-tool="text">Study, research, people</h2>
      </div>
      <div className="bg-grid">
        <article className="card sel" data-label="Card · Education" data-tool="frame">
          <span className="when">Aug 2024 to Aug 2028</span>
          <h3>B.Tech, Computer Science and Engineering</h3>
          <p>International Institute of Information Technology, Naya Raipur</p>
        </article>
        <article className="card sel" data-label="Card · Research" data-tool="frame">
          <span className="when">Research</span>
          <h3>Pollution source identification</h3>
          <p>Co-authored an ML pipeline using K-Means, DBSCAN and PCA on 10,000+ Raipur air quality readings, formatted to IEEE conference standards.</p>
        </article>
        <article className="card sel" data-label="Card · MUN" data-tool="frame">
          <span className="when">2025 to Present</span>
          <h3>Club Head, Model United Nations</h3>
          <p>IIIT Naya Raipur</p>
        </article>
        <article className="card sel" data-label="Card · E-Cell" data-tool="frame">
          <span className="when">2025 to Present</span>
          <h3>Events and PR Head, E-Cell</h3>
          <p>IIIT Naya Raipur</p>
        </article>
      </div>
    </section>
  );
}
