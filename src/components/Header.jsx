export default function Header() {
  return (
    <header className="top">
      <div className="top-l">
        <span className="logo" />
        <span className="file">divyansh-portfolio</span>
        <span className="crumb" id="crumb">/ Hero</span>
        <span className="draft">Draft</span>
      </div>
      <div className="top-r">
        <div className="avs" aria-hidden="true">
          <i style={{'--c': 'var(--yellow)'}}>L</i><i style={{'--c': 'var(--red)'}}>C</i><i style={{'--c': 'var(--orange)'}}>R</i>
        </div>
        <span className="mono">3 agents editing</span>
        <button className="btn ib" id="bsearch" type="button" aria-label="Search"><svg viewBox="0 0 24 24"><circle cx={11} cy={11} r={6} /><path d="M20 20l-4-4" /></svg><span className="lbl">Search</span><kbd id="kbdhint">Ctrl K</kbd></button>
        <button className="btn ib" id="bver" type="button" aria-label="Version history" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" /><path d="M12 7v5l3 2" /></svg><span className="lbl">Versions</span></button>
        <button className="btn ib" id="breplay" type="button" aria-label="Replay build"><svg viewBox="0 0 24 24"><path d="M7 4l12 8-12 8z" /></svg><span className="lbl">Replay</span></button>
        <button className="btn ib" id="bexport" type="button" aria-label="Export resume" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg><span className="lbl">Export</span></button>
        <button className="btn ib" id="bpresent" type="button" aria-label="Present"><svg viewBox="0 0 24 24"><rect x={3} y={4} width={18} height={12} rx={2} /><path d="M8 20h8M12 16v4" /></svg><span className="lbl">Present</span></button>
        <button className="btn ib" id="theme" type="button" aria-label="Toggle theme"><svg viewBox="0 0 24 24"><circle cx={12} cy={12} r={8} /><path d="M12 4v16" /></svg><span className="lbl">Theme</span></button>
        <a className="btn solid" href="#contact">Contact</a>
      </div>
    </header>
  );
}
