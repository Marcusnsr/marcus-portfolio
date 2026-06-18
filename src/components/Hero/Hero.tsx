import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import SummoningCircle from "./SummoningCircle";
import "./Hero.css";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.7, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <header className="hero" id="top">
      <SummoningCircle />

      <div className="hero__content">
        <motion.p custom={0} variants={fadeUp} initial="hidden" animate="show" className="eyebrow">
          {profile.location}
        </motion.p>

        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show" className="hero__name">
          {profile.name}
        </motion.h1>

        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show" className="hero__headline">
          {profile.headline}
        </motion.p>

        <motion.p custom={3} variants={fadeUp} initial="hidden" animate="show" className="hero__tagline">
          {profile.tagline}
        </motion.p>

        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="hero__links">
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="hero__btn">
            GitHub
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hero__btn">
            LinkedIn
          </a>
          <a href="#contact" className="hero__btn hero__btn--ghost">
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#timeline"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-label="Scroll to timeline"
      >
        <span>the journey</span>
        <span className="hero__scroll-arrow">↓</span>
      </motion.a>
    </header>
  );
}
