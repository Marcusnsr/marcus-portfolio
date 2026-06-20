import { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import NeuralLoader from "./components/NeuralLoader/NeuralLoader";
import CustomCursor from "./components/shared/CustomCursor";
import Nav from "./components/Nav/Nav";
import Hero from "./components/Hero/Hero";
import Timeline from "./components/Timeline/Timeline";
import JobExperience from "./components/JobExperience/JobExperience";
import Education from "./components/Education/Education";
import Projects from "./components/Projects/Projects";
import AboutMe from "./components/AboutMe/AboutMe";
import Contact from "./components/Contact/Contact";
import DiceRoller from "./components/DiceRoller/DiceRoller";
import RuneDivider from "./components/shared/RuneDivider";

// Allow deep-links to skip the intro animation (e.g. /?skipintro).
const skipIntro =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("skipintro");

// Phones get no loader and no Lenis: the canvas intro is too heavy for mobile
// GPUs, and Lenis fights native momentum scrolling (a source of scroll jank).
const isMobile =
  typeof window !== "undefined" &&
  (window.matchMedia("(max-width: 760px)").matches ||
    window.matchMedia("(pointer: coarse)").matches);

export default function App() {
  const [loading, setLoading] = useState(!skipIntro && !isMobile);

  // Smooth, weighted scrolling (skipped on mobile and when reduced motion is requested;
  // on those, native scroll + CSS scroll-behavior handle anchor jumps).
  useEffect(() => {
    if (isMobile) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Route in-page anchor clicks through Lenis for smooth jumps.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!;
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -70 });
        }
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  // Lock scroll while the loader is visible.
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {loading && <NeuralLoader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Nav />
      <main>
        <Hero />
        <Timeline />
        <RuneDivider />
        <JobExperience />
        <RuneDivider />
        <Education />
        <RuneDivider />
        <Projects />
        <RuneDivider />
        <AboutMe />
        <Contact />
      </main>
      <DiceRoller />
    </>
  );
}
