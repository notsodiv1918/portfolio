import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Background from "./components/Background.jsx";
import Skills from "./components/Skills.jsx";
import Contact from "./components/Contact.jsx";
import Foot from "./components/Foot.jsx";
import Overlays from "./components/Overlays.jsx";
import { initEditor } from "./engine.js";

export default function App() {
  useEffect(() => {
    initEditor();
  }, []);

  return (
    <>
      <Header />
      <main className="stage">
        <Hero />
        <Experience />
        <Projects />
        <Background />
        <Skills />
        <Contact />
        <Foot />
      </main>
      <Overlays />
    </>
  );
}
