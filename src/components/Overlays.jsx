export default function Overlays() {
  return (
    <>
      <div className="xpanel" id="xpanel" role="dialog" aria-label="Export">
        <h4>Export</h4>
        <img className="xthumb" src="/assets/resume.png" alt="Resume preview" width={935} height={1210} />
        <p className="xname">Divyansh_Rangari_SDE_Resume</p>
        <div className="xrow">
          <a className="btn solid" href="/assets/resume.pdf" download="Divyansh_Rangari_SDE_Resume.pdf">Export PDF</a>
          <a className="btn" href="/assets/resume.png" download="Divyansh_Rangari_SDE_Resume.png">Export PNG</a>
        </div>
      </div>
      <div className="thread" id="thread" aria-live="polite"><h4>Bug hunt</h4></div>
      <aside className="panel" id="panel" aria-label="Properties">
        <h5>Properties</h5>
        <div className="pt" id="ptitle">Hero</div>
        <div id="prows" />
        <h5>Layers</h5>
        <div className="layers" id="layers" />
        <h5>Fill styles</h5>
        <div className="sw"><i style={{background: 'var(--orange)'}} /><i style={{background: 'var(--red)'}} /><i style={{background: 'var(--yellow)'}} /><i style={{background: 'var(--bg2)'}} /></div>
        <div className="selline" id="selline">Waiting for an agent to select something.</div>
      </aside>
      <nav className="dock" aria-label="Toolbar">
        <span className="tool on" data-t="move" title="Move"><svg viewBox="0 0 24 24"><path d="M5 3l14 8-6 2-2 6z" /></svg></span>
        <span className="tool" data-t="frame" title="Frame"><svg viewBox="0 0 24 24"><path d="M7 3v18M17 3v18M3 7h18M3 17h18" /></svg></span>
        <span className="tool" data-t="text" title="Text"><svg viewBox="0 0 24 24"><path d="M5 6V4h14v2M12 4v16M9 20h6" /></svg></span>
        <span className="tool" data-t="pen" title="Pen"><svg viewBox="0 0 24 24"><path d="M4 20l4-1L19 8l-3-3L5 16z" /></svg></span>
        <button className="tool" id="tinspect" data-t="inspect" type="button" title="Inspect spacing (or hold Alt)" aria-label="Inspect spacing" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M3 17L17 3l4 4L7 21z" /><path d="M8 12l2 2M11 9l2 2M14 6l2 2" /></svg></button>
        <span className="sep" />
        <span className="mono zoom">100%</span>
        <span className="sep" />
        <span className="mono crumb" id="dockcrumb">Hero</span>
      </nav>
      <div id="layer" aria-hidden="true" />
      <div id="inspect" aria-hidden="true" />
      <div className="me" id="me" aria-hidden="true">you · visitor</div>
      <button className="btn solid exit" id="exitp" type="button">Exit present</button>
      <aside className="drawer" id="drawer" aria-label="Version history">
        <div className="dh"><h5>Version history</h5><button className="btn" id="dclose" type="button">Close</button></div>
        <div id="vers" />
      </aside>
      <div className="pal-back" id="palback">
        <div className="pal" role="dialog" aria-modal="true" aria-label="Command palette">
          <input id="palin" type="text" placeholder="Search sections, projects, roles and actions" autoComplete="off" role="combobox" aria-expanded="true" aria-controls="pallist" aria-autocomplete="list" />
          <div id="pallist" role="listbox" />
        </div>
      </div>
    </>
  );
}
