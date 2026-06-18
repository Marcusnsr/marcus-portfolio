import { useState } from "react";
import { motion } from "framer-motion";
import { projects, type Project } from "../../data/projects";
import SectionHeading from "../shared/SectionHeading";
import "./Projects.css";

type Media =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string; caption: string };

function ProjectCard({ project }: { project: Project }) {
  // Unify images + videos into one gallery (thumbnails on a line, click to view).
  const media: Media[] = [
    ...project.images.map((src) => ({ type: "image" as const, src })),
    ...(project.videos ?? []).map((v) => ({ type: "video" as const, ...v })),
  ];
  const [active, setActive] = useState(0);
  const current = media[active];
  const hasGallery = media.length > 1;

  return (
    <motion.article
      className="project"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="project__media">
        <div className="project__stage">
          {current.type === "video" ? (
            <video
              key={current.src}
              src={current.src}
              poster={current.poster}
              controls
              loop
              autoPlay
              muted
              playsInline
            />
          ) : (
            <img src={current.src} alt={project.title} loading="lazy" />
          )}
        </div>

        {hasGallery && (
          <div className="project__thumbs">
            {media.map((m, i) => (
              <button
                key={m.src}
                className={`project__thumb${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`${project.title} ${m.type} ${i + 1}`}
              >
                <img src={m.type === "video" ? m.poster : m.src} alt="" loading="lazy" />
                {m.type === "video" && <span className="project__play" aria-hidden>▶</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="project__body">
        <h3>{project.title}</h3>
        <p className="project__tagline">{project.tagline}</p>
        <p className="project__desc">{project.description}</p>

        <div className="project__tags">
          {project.tags.map((t) => (
            <span key={t} className="project__tag">
              {t}
            </span>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="project__links">
            {project.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="project__link">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="The Work"
          title="Projects"
          subtitle="Where the research meets the real world: computer vision, clinical AI, and science communication."
        />
        <div className="projects">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
