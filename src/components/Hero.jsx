export default function Hero() {
  return (
    <section className="frame" data-name="Hero" id="top">
      <span className="frame-label">Hero<em>1100 × Hug</em></span>
      <h1 className="outline sel" data-label="Heading 1" data-tool="text">PORTFOLIO</h1>
      <div className="hero-grid">
        <div className="intro">
          <span className="script sel" data-label="Text · Instrument Serif" data-tool="text">Hello, I'm</span>
          <div className="tag sel" data-label="Name tag" data-tool="frame">DIVYANSH.</div>
          <span className="pill sel" data-label="Role label" data-tool="text">Full-stack developer</span>
          <p className="lede sel" data-label="Body text" data-tool="text">I build and deploy web apps and APIs with React, Node.js and Python, and I like projects where the model, the backend and the interface all have to work together.</p>
          <div className="cta">
            <a className="btn solid sel" data-label="Button" data-tool="frame" href="#projects">View projects</a>
            <a className="btn sel" data-label="Button" data-tool="frame" href="#experience">Experience</a>
          </div>
        </div>
        <div className="photo sel" id="photo" data-label="Image · Portrait" data-tool="frame" role="button" tabIndex={0} aria-label="Portrait of Divyansh. Activate to flip to the other photo.">
          <div className="flip" id="flip">
            <div className="face front">
              <img src="/assets/photo-2.jpg" alt="Divyansh smiling indoors in a white striped shirt" width={780} height={1040} decoding="async" />
              <div className="blank" id="blank">
                <svg viewBox="0 0 24 24"><rect x={3} y={4} width={18} height={16} rx={2} /><circle cx={9} cy={10} r="1.8" /><path d="M21 16l-5-5-8 8" /></svg>
                <span>Image fill</span>
              </div>
            </div>
            <div className="face back">
              <img src="/assets/photo-1.jpg" alt="Divyansh smiling outdoors in a black waistcoat and cream kurta" width={780} height={1040} decoding="async" />
            </div>
          </div>
        </div>
      </div>
      <div className="now sel" data-label="Card · Now" data-tool="frame">
        <h4>Now</h4>
        <div className="now-row"><span className="dot" /><div><b>SDE Intern, Iconic Styles</b><span>Automation workflows and AI agents for the founding team</span></div></div>
        <div className="now-row"><span className="dot quiet" /><div><b>B.Tech CSE, IIIT Naya Raipur</b><span>2024 to 2028</span></div></div>
      </div>
      <div className="stats">
        <div className="stat sel" data-label="Stat" data-tool="frame"><b>3,500+</b><span>species records unified in one queryable platform</span></div>
        <div className="stat sel" data-label="Stat" data-tool="frame"><b>0.90</b><span>Pearson r of the LLM judge on support tasks</span></div>
        <div className="stat sel" data-label="Stat" data-tool="frame"><b>22%</b><span>projected cut in rural collection route distance</span></div>
        <div className="stat sel" data-label="Stat" data-tool="frame"><b>4</b><span>internships across software, research and startups</span></div>
      </div>
    </section>
  );
}
