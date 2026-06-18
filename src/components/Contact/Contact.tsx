import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import "./Contact.css";

const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
  "Hello Marcus, let's talk"
)}&body=${encodeURIComponent("Hi Marcus,\n\nI came across your portfolio and ")}`;

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container contact__inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Roll for Initiative</p>
          <h2 className="contact__title">Let's build something</h2>
          <p className="contact__text">
            Open to roles and collaborations in machine learning, computer vision, and medical AI,
            or just a good conversation about D&D, DJing, or 3D printing.
          </p>

          <a href={mailto} className="contact__cta" data-cursor>
            <span className="contact__cta-icon" aria-hidden>
              ✉
            </span>
            {profile.email}
          </a>

          <div className="contact__socials">
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span aria-hidden>·</span>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>

      <footer className="footer">
        <span>
          {profile.name} · {profile.location}
        </span>
        <span className="footer__sigil" aria-hidden>
          ✦
        </span>
        <span>Forged in React · {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}
