export default function Projects() {
  return (
    <section className="frame" data-name="Projects" id="projects">
      <span className="frame-label">Projects<em>1100 × Hug</em></span>
      <div className="head">
        <h2 className="sel" data-label="Heading 2" data-tool="text">Things I've built</h2>
        <p className="sel" data-label="Body text" data-tool="text">Five projects on a barrel. Drag it, use the arrows, or press the arrow keys to roll through them.</p>
      </div>
      <div className="barrel-wrap sel" id="barrel" data-label="Component · Project barrel" data-tool="frame" data-action="roll" tabIndex={0} role="group" aria-roledescription="carousel" aria-label="Projects">
        <div className="ring" id="ring">
          <article className="bcard" data-title="Prism">
            <span className="kind">LLM evaluation</span>
            <h3>Prism</h3>
            <div className="chips"><span className="chip">React</span><span className="chip">TypeScript</span><span className="chip">Node/Express</span><span className="chip">FastAPI</span><span className="chip">SSE</span></div>
            <ul>
              <li>Compares outputs from concurrent LLM providers in real time, with SSE streaming and per-model failure isolation.</li>
              <li>LLM-judge scoring harness validated on 93 hand-rated responses across 5 task types.</li>
              <li>IEEE-style report, now extended with a LoRA versus full fine-tune cost study.</li>
            </ul>
            <div className="metric">r = 0.88 / 0.90<small>factual and support tasks. 0.16 on open-ended content.</small></div>
          </article>
          <article className="bcard" data-title="CMLRE Marine Intelligence">
            <span className="kind">Marine data platform</span>
            <h3>CMLRE Marine Intelligence</h3>
            <div className="chips"><span className="chip">React</span><span className="chip">FastAPI</span><span className="chip">PostgreSQL</span><span className="chip">LLaMA 3.3 70B</span></div>
            <ul>
              <li>Deployed on Vercel and Railway. Unifies 3,500+ species records, 698 ocean stations and 1,172 eDNA sequences.</li>
              <li>k-mer sequence matching and a natural-language query engine on Groq LLaMA 3.3 70B.</li>
              <li>AI PDF digitizer for scanned cruise reports and a voice interface in 6 Indian languages.</li>
            </ul>
            <div className="metric">1,172 eDNA sequences<small>queryable through one interface</small></div>
          </article>
          <article className="bcard" data-title="EcoRoute">
            <span className="kind">Rural logistics</span>
            <h3>EcoRoute</h3>
            <div className="chips"><span className="chip">React</span><span className="chip">Python</span><span className="chip">Optimization</span><span className="chip">PWA</span></div>
            <ul>
              <li>Offline-first PWA with a bilingual voice interface for 5,000+ low-connectivity rural households.</li>
              <li>CVRP dispatch engine for waste collection in Chhattisgarh, across a 40-vehicle fleet.</li>
              <li>LGD hierarchy standardization for 600+ villages and wards, plus polymer-level plastic segregation logic.</li>
            </ul>
            <div className="metric">22% shorter routes<small>projected, across 40 vehicles</small></div>
          </article>
          <article className="bcard" data-title="MeetMind">
            <span className="kind">AI meeting summarizer</span>
            <h3>MeetMind</h3>
            <div className="chips"><span className="chip">Next.js</span><span className="chip">TypeScript</span><span className="chip">LLaMA 3.3 70B</span><span className="chip">Chrome MV3</span></div>
            <ul>
              <li>Chrome MV3 extension for live capture from Google Meet, Zoom and Teams.</li>
              <li>Generates structured minutes with speaker detection.</li>
              <li>0 to 100 sentiment score across Hindi, Tamil and English.</li>
            </ul>
            <div className="metric">3 languages<small>Hindi, Tamil and English</small></div>
          </article>
          <article className="bcard" data-title="Whale Tracker">
            <span className="kind">On-chain analytics</span>
            <h3>Whale Tracker</h3>
            <div className="chips"><span className="chip">React</span><span className="chip">FastAPI</span><span className="chip">Etherscan API</span></div>
            <ul>
              <li>Dashboard tracking 5 Ethereum whale wallets around 4 major market events.</li>
              <li>Found pre-event transaction spikes of 2 to 5x baseline in 3 of the 4 events.</li>
            </ul>
            <div className="metric">2 to 5x baseline<small>pre-event spikes in 3 of 4 events</small></div>
          </article>
        </div>
      </div>
      <div className="bbar late">
        <button className="btn" id="bprev" type="button">Previous</button>
        <span className="mono" id="bcount">Prism · 1 / 5</span>
        <button className="btn solid" id="bnext" type="button">Next</button>
      </div>
    </section>
  );
}
