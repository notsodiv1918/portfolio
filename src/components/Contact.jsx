export default function Contact() {
  return (
    <section className="frame contact" data-name="Contact" id="contact">
      <span className="frame-label">Contact<em>1100 × Hug</em></span>
      <h2 className="big sel" data-label="Heading 1" data-tool="text">Let's talk</h2>
      <p className="lede sel" data-label="Body text" data-tool="text">Open to SDE and AI developer roles. The fastest way to reach me is email.</p>
      <div className="mailrow">
        <span className="mail sel" id="email" data-label="Email" data-tool="text">divyanshrangari1918@gmail.com</span>
        <button className="btn solid late" id="copy" type="button">Copy</button>
      </div>
      <div className="links">
        <a className="btn sel" data-label="Link · GitHub" data-tool="frame" href="https://github.com/notsodiv1918" target="_blank" rel="noopener">GitHub</a>
        <a className="btn sel" data-label="Link · LinkedIn" data-tool="frame" href="https://linkedin.com/in/divyansh-rangari-2b2196326" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </section>
  );
}
