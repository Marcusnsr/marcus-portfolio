import { Fragment } from "react";
import { motion } from "framer-motion";
import {
  aboutParagraphs,
  hobbyImages,
  characterStats,
  characterLevel,
} from "../../data/hobbies";
import SectionHeading from "../shared/SectionHeading";
import "./AboutMe.css";

// Modifier from a D&D ability score, for flavour.
const mod = (score: number) => {
  const m = Math.floor((score - 10) / 2);
  return m >= 0 ? `+${m}` : `${m}`;
};

export default function AboutMe() {
  return (
    <section id="about">
      <div className="container">
        <SectionHeading
          eyebrow="Off the Clock"
          title="About Me"
          subtitle="A builder at heart: dice, decks, soldering irons, and a mixing desk."
        />

        {/* Character sheet banner, above the prose */}
        <motion.aside
          className="charsheet"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="charsheet__head">
            <span className="charsheet__class">Maker · Researcher · Dungeon-delver</span>
            <h3>
              <span className="charsheet__lvl">Lv {characterLevel}</span> Character Sheet
            </h3>
          </div>
          <div className="charsheet__stats">
            {characterStats.map((s) => (
              <div key={s.stat} className="charsheet__stat" data-cursor>
                <span className="charsheet__abbr">{s.stat}</span>
                <span className="charsheet__score">{s.score}</span>
                <span className="charsheet__mod">{mod(s.score)}</span>
                <span className="charsheet__label">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.aside>

        {/* Prose and photos woven together in an alternating flow. Each photo
            clears the previous one and sits beside its own block of text, so the
            reading rhythm stays smooth instead of mapping one image per hobby. */}
        <div className="about__prose">
          {aboutParagraphs.map((p, i) => {
            const img = hobbyImages[i];
            return (
              <Fragment key={i}>
                {img && (
                  <figure className={`about__photo about__photo--${i} about__photo--${i % 2 === 0 ? "right" : "left"}`}>
                    <img src={img.src} alt={img.alt} loading="lazy" />
                    <figcaption>{img.caption}</figcaption>
                  </figure>
                )}
                <p className={i === 0 ? "about__lead" : undefined}>{p}</p>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
