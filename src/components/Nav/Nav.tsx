import { useEffect, useState } from "react";
import "./Nav.css";

const sections = [
  { id: "timeline", label: "Journey" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <a href="#top" className="nav__brand">
        <span className="nav__sigil" aria-hidden>
          ✦
        </span>
        MR
      </a>
      <ul className="nav__links">
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`}>{s.label}</a>
          </li>
        ))}
      </ul>

      {/* Mobile gets a single Contact CTA in place of the full link list. */}
      <a href="#contact" className="nav__cta">
        Contact
      </a>
    </nav>
  );
}
