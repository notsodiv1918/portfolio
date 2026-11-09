export default function Experience() {
  return (
    <section className="frame" data-name="Experience" id="experience">
      <span className="frame-label">Experience<em>1100 × Hug</em></span>
      <div className="head">
        <h2 className="sel" data-label="Heading 2" data-tool="text">Where I've worked</h2>
        <p className="sel" data-label="Body text" data-tool="text">Software, research and early-stage startup work, newest first.</p>
      </div>
      <div className="nowbuild card sel" data-label="Card · Now building" data-tool="frame" id="nowbuild">
        <div className="nbh"><span className="live" /><span className="mono">Now building</span><em>Iconic Styles</em></div>
        <div className="nbr"><span>Backend</span><i className="bar"><u /></i><b>Fixing</b></div>
        <div className="nbr"><span>Company app</span><i className="bar"><u /></i><b>In development</b></div>
      </div>
      <div className="timeline">
        <article className="card job sel" data-label="Card · Iconic Styles" data-tool="frame">
          <div className="when">Nov 2026<br />to Present</div>
          <div>
            <h3>SDE Intern</h3>
            <p className="org">Iconic Styles Pvt. Ltd.</p>
            <ul>
              <li>Support application and AI-agent development for the founding team, from feature work to API integrations and debugging.</li>
              <li>Build automation workflows and AI agents, including reports and dashboards on Google Sheets, Excel and internal APIs.</li>
              <li>Support ERP, inventory and order-management tooling, with technical documentation for the team.</li>
            </ul>
          </div>
        </article>
        <article className="card job sel" data-label="Card · FlowSet Hub" data-tool="frame">
          <div className="when">Sep to Oct 2026<br />Remote</div>
          <div>
            <h3>Founder's Office Intern</h3>
            <p className="org">FlowSet Hub (AI Services)</p>
            <ul>
              <li>Worked with the founding team on strategy, operations and tech across AI automation, web development and digital solutions.</li>
              <li>Drove research and execution in day-to-day startup operations while helping build and scale AI products.</li>
            </ul>
          </div>
        </article>
        <article className="card job sel" data-label="Card · IIT Jammu" data-tool="frame">
          <div className="when">Summer 2026</div>
          <div>
            <h3>Research Intern</h3>
            <p className="org">IIT Jammu, with Techible and I3C</p>
            <ul>
              <li>Ran applied ML research across the full pipeline, from data preparation and feature engineering to model evaluation on 3+ experimental datasets.</li>
              <li>Analyzed results and co-authored summaries for the research team, feeding into 2 candidate publications.</li>
            </ul>
          </div>
        </article>
        <article className="card job sel" data-label="Card · Rootvestors" data-tool="frame">
          <div className="when">Sep 2025<br />Remote</div>
          <div>
            <h3>Technical Intern</h3>
            <p className="org">Rootvestors (EduAnanta Pvt. Ltd.)</p>
            <ul>
              <li>Shipped features with a 5-person cross-functional team on a 2-week sprint cadence, iterating on user feedback.</li>
              <li>Gained hands-on exposure to production engineering workflows on an EdTech platform.</li>
            </ul>
          </div>
        </article>
      </div>
      <div className="codecard card sel" id="codecard" data-label="Code · journey.ts" data-tool="frame">
        <div className="chead"><span className="dots"><i /><i /><i /></span><span className="ctab">journey.ts</span><span className="cstat"><b className="live" />Under construction</span></div>
        <div className="cbody" aria-label="journey.ts source, building as you scroll"><pre><span className="ln"><span className="t"><i className="k">const</i> journey: Entry[] = [</span></span><span className="ln"><span className="t">{"  "}{"{"} <i className="p">year</i>: <i className="n">2024</i>, <i className="p">kind</i>: <i className="s">"education"</i>,</span></span><span className="ln"><span className="t">{"    "}<i className="p">name</i>: <i className="s">"B.Tech CSE, IIIT Naya Raipur"</i> {"}"},</span></span><span className="ln"><span className="t">{"  "}{"{"} <i className="p">kind</i>: <i className="s">"skills"</i>,</span></span><span className="ln"><span className="t">{"    "}<i className="p">name</i>: <i className="s">"C, C++, Python, JavaScript"</i> {"}"},</span></span><span className="ln"><span className="t">{"  "}{"{"} <i className="p">year</i>: <i className="n">2025</i>, <i className="p">kind</i>: <i className="s">"role"</i>,</span></span><span className="ln"><span className="t">{"    "}<i className="p">name</i>: <i className="s">"Technical Intern, Rootvestors"</i> {"}"},</span></span><span className="ln"><span className="t">{"  "}{"{"} <i className="p">kind</i>: <i className="s">"skills"</i>,</span></span><span className="ln"><span className="t">{"    "}<i className="p">name</i>: <i className="s">"React, Node.js, Express, PostgreSQL"</i> {"}"},</span></span><span className="ln"><span className="t">{"  "}{"{"} <i className="p">kind</i>: <i className="s">"project"</i>, <i className="p">name</i>: <i className="s">"Whale Tracker"</i> {"}"},</span></span><span className="ln"><span className="t">{"  "}{"{"} <i className="p">kind</i>: <i className="s">"project"</i>, <i className="p">name</i>: <i className="s">"EcoRoute"</i> {"}"},</span></span><span className="ln"><span className="t">{"  "}{"{"} <i className="p">kind</i>: <i className="s">"project"</i>, <i className="p">name</i>: <i className="s">"MeetMind"</i> {"}"},</span></span><span className="ln"><span className="t">{"  "}{"{"} <i className="p">kind</i>: <i className="s">"project"</i>, <i className="p">name</i>: <i className="s">"CMLRE Marine Intelligence"</i> {"}"},</span></span><span className="ln"><span className="t">{"  "}{"{"} <i className="p">kind</i>: <i className="s">"project"</i>, <i className="p">name</i>: <i className="s">"Prism"</i> {"}"},</span></span><span className="ln"><span className="t">{"  "}{"{"} <i className="p">year</i>: <i className="n">2026</i>, <i className="p">kind</i>: <i className="s">"research"</i>,</span></span><span className="ln"><span className="t">{"    "}<i className="p">name</i>: <i className="s">"Research Intern, IIT Jammu"</i> {"}"},</span></span><span className="ln"><span className="t">{"  "}{"{"} <i className="p">year</i>: <i className="n">2026</i>, <i className="p">kind</i>: <i className="s">"role"</i>,</span></span><span className="ln"><span className="t">{"    "}<i className="p">name</i>: <i className="s">"Founder's Office Intern, FlowSet Hub"</i> {"}"},</span></span><span className="ln"><span className="t">{"  "}{"{"} <i className="p">kind</i>: <i className="s">"skills"</i>,</span></span><span className="ln"><span className="t">{"    "}<i className="p">name</i>: <i className="s">"LLM evaluation, RAG, LoRA fine-tuning"</i> {"}"},</span></span><span className="ln"><span className="t">{"  "}{"{"} <i className="p">year</i>: <i className="n">2026</i>, <i className="p">kind</i>: <i className="s">"role"</i>,</span></span><span className="ln"><span className="t">{"    "}<i className="p">name</i>: <i className="s">"SDE Intern, Iconic Styles"</i> {"}"},</span></span><span className="ln"><span className="t">];</span></span><span className="ln"><span className="t">&nbsp;</span></span><span className="ln"><span className="t"><i className="k">export</i> <i className="k">const</i> status = <i className="s">"under construction"</i>;</span></span><span className="ln"><span className="t">&nbsp;</span></span><span className="ln"><span className="t"><i className="k">const</i> next = <button className="secret" type="button" aria-disabled="true"><i className="f">decrypt</i>("<span className="sv">▒▒▒▒▒▒▒▒▒▒</span>")</button>;</span><em className="hint">click to run</em></span></pre><span className="ccur" /></div>
        <div className="cout" aria-live="polite"><span className="pr">&gt;</span> <span className="ot" /></div>
        <div className="cfoot"><span className="mono">$ build journey</span><i className="cbar"><u /></i><span className="mono cpct">0%</span></div>
      </div>
    </section>
  );
}
