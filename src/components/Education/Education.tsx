import { motion } from "framer-motion";
import { degrees, theses, coursework } from "../../data/education";
import SectionHeading from "../shared/SectionHeading";
import "./Education.css";

export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <SectionHeading
          eyebrow="Scholarship"
          title="Education"
          subtitle="Two theses graded 12, a guest stint at ITU, and a foundation in machine learning, vision, and systems."
        />

        <div className="edu__degrees">
          {degrees.map((d, i) => (
            <motion.div
              key={d.level + d.institution}
              className="edu__degree"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="edu__level">{d.level}</span>
              <h3>{d.field}</h3>
              <p className="edu__inst">{d.institution}</p>
              <p className="edu__years">{d.years}</p>
              <p className="edu__focus">{d.focus}</p>
            </motion.div>
          ))}
        </div>

        <div className="edu__theses">
          {theses.map((t) => (
            <motion.article
              key={t.title}
              className="edu__thesis"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="edu__thesis-img">
                <img src={t.image} alt={t.title} loading="lazy" />
              </div>
              <div className="edu__thesis-body">
                <div className="edu__thesis-head">
                  <span className="edu__tag">{t.level}</span>
                  <span className="edu__grade">Grade {t.grade}</span>
                </div>
                <h3>{t.title}</h3>
                <p className="edu__subtitle">{t.subtitle}</p>
                <p className="edu__summary">{t.summary}</p>
                {t.repo && (
                  <a href={t.repo.url} target="_blank" rel="noreferrer" className="edu__repo">
                    {t.repo.label} ↗
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="edu__courses">
          <h4 className="edu__courses-title">Selected Coursework</h4>
          <div className="edu__courses-grid">
            {coursework.map((g) => (
              <div key={g.group} className="edu__course-group">
                <h5>{g.group}</h5>
                <ul>
                  {g.courses.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
