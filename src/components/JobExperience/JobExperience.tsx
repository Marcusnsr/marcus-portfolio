import { motion } from "framer-motion";
import { jobs } from "../../data/jobs";
import SectionHeading from "../shared/SectionHeading";
import Medallion from "../shared/Medallion";
import "./JobExperience.css";

export default function JobExperience() {
  return (
    <section id="experience">
      <div className="container">
        <SectionHeading
          eyebrow="Working Life"
          title="Experience"
          subtitle="A progression of roles, from my first part-time job to AI research and teaching at the University of Copenhagen."
        />

        <div className="jobs">
          <div className="jobs__line" aria-hidden />
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              className="jobs__bubble"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <Medallion src={job.logo} alt={`${job.company} logo`} size={92} />
              <div className="jobs__card">
                <span className="jobs__period">{job.period}</span>
                <h3>{job.title}</h3>
                <p className="jobs__company">{job.company}</p>
                <p className="jobs__desc">{job.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
