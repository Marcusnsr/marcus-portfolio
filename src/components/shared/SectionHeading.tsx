import { motion } from "framer-motion";
import "./SectionHeading.css";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {eyebrow && (
        <div className="section-heading__eyebrow">
          <span className="rune" aria-hidden>
            ✦
          </span>
          <span className="eyebrow">{eyebrow}</span>
          <span className="rune" aria-hidden>
            ✦
          </span>
        </div>
      )}
      <h2 className="section-heading__title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </motion.div>
  );
}
