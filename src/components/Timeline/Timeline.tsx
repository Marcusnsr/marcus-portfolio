import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { timeline } from "../../data/timeline";
import SectionHeading from "../shared/SectionHeading";
import "./Timeline.css";

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section id="timeline">
      <div className="container">
        <SectionHeading eyebrow="The Journey" title="Milestones" subtitle="" />

        <div className="timeline" ref={ref}>
          <div className="timeline__spine">
            <motion.div
              className="timeline__spine-fill"
              style={{ scaleY: progress }}
            />
          </div>

          {timeline.map((item, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            const Card = item.url ? "a" : "div";
            return (
              <motion.div
                key={item.id}
                className={`timeline__row timeline__row--${side}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="timeline__node" aria-hidden />
                <Card
                  className="timeline__card"
                  {...(item.url
                    ? { href: item.url, target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  <div className="timeline__img">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <span className="timeline__date">{item.date}</span>
                  </div>
                  <div className="timeline__body">
                    <h3>{item.title}</h3>
                    <p>{item.blurb}</p>
                    {item.url && <span className="timeline__link">View ↗</span>}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
