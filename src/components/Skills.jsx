export default function Skills() {
  return (
    <section className="frame" data-name="Skills" id="skills">
      <span className="frame-label">Skills<em>1100 × Hug</em></span>
      <div className="head">
        <h2 className="sel" data-label="Heading 2" data-tool="text">Component library</h2>
        <p className="sel" data-label="Body text" data-tool="text">The tools I reach for, grouped the way I use them.</p>
      </div>
      <div className="skills">
        <div className="card skill sel" data-label="Group · Languages" data-tool="frame"><h3>Languages</h3><div className="chips"><span className="chip">Python</span><span className="chip">JavaScript</span><span className="chip">TypeScript</span><span className="chip">SQL</span><span className="chip">C</span><span className="chip">C++</span></div></div>
        <div className="card skill sel" data-label="Group · Frontend" data-tool="frame"><h3>Frontend</h3><div className="chips"><span className="chip">HTML</span><span className="chip">CSS</span><span className="chip">React</span><span className="chip">Next.js</span><span className="chip">PWA</span><span className="chip">Chrome Extensions MV3</span></div></div>
        <div className="card skill sel" data-label="Group · Backend" data-tool="frame"><h3>Backend</h3><div className="chips"><span className="chip">Node.js</span><span className="chip">Express</span><span className="chip">FastAPI</span><span className="chip">REST APIs</span><span className="chip">Server-Sent Events</span></div></div>
        <div className="card skill sel" data-label="Group · AI and ML" data-tool="frame"><h3>AI and ML</h3><div className="chips"><span className="chip">LLM API integration</span><span className="chip">Groq</span><span className="chip">LLaMA</span><span className="chip">Prompt engineering</span><span className="chip">LLM evaluation</span><span className="chip">RAG</span><span className="chip">LoRA fine-tuning</span></div></div>
        <div className="card skill sel" data-label="Group · Databases" data-tool="frame"><h3>Databases</h3><div className="chips"><span className="chip">PostgreSQL</span></div></div>
        <div className="card skill sel" data-label="Group · Tools" data-tool="frame"><h3>Tools and deployment</h3><div className="chips"><span className="chip">Git and GitHub</span><span className="chip">Vercel</span><span className="chip">Railway</span><span className="chip">VS Code</span><span className="chip">Jupyter</span><span className="chip">Agile sprints</span></div></div>
      </div>
    </section>
  );
}
