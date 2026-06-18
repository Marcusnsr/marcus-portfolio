import { motion } from "framer-motion";
import "./SummoningCircle.css";

// Ambient animated summoning circle behind the hero: a neural network framed
// as arcane geometry. Pure SVG so it's crisp and cheap.
export default function SummoningCircle() {
  const nodes = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return { x: 250 + Math.cos(a) * 150, y: 250 + Math.sin(a) * 150 };
  });
  const inner = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 + 0.5;
    return { x: 250 + Math.cos(a) * 80, y: 250 + Math.sin(a) * 80 };
  });

  return (
    <div className="summon" aria-hidden>
      <motion.svg
        viewBox="0 0 500 500"
        className="summon__svg"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        {/* Rotating outer rings */}
        <g className="summon__spin-slow">
          <circle cx="250" cy="250" r="230" className="ring gold faint" />
          <circle cx="250" cy="250" r="205" className="ring arcane" />
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i / 36) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={250 + Math.cos(a) * 205}
                y1={250 + Math.sin(a) * 205}
                x2={250 + Math.cos(a) * 218}
                y2={250 + Math.sin(a) * 218}
                className="ring gold faint"
              />
            );
          })}
        </g>

        <g className="summon__spin-rev">
          <circle cx="250" cy="250" r="175" className="ring gold" />
          {/* summoning triangle + inverse */}
          <polygon points="250,90 393,332 107,332" className="ring arcane" />
          <polygon points="250,410 107,168 393,168" className="ring gold faint" />
        </g>

        {/* Neural edges */}
        <g>
          {nodes.map((n, i) =>
            inner.map((m, j) => (
              <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} className="net-edge" />
            ))
          )}
        </g>

        {/* Nodes */}
        {nodes.map((n, i) => (
          <circle key={`o${i}`} cx={n.x} cy={n.y} r="4" className="net-node">
            <animate
              attributeName="r"
              values="3;5.5;3"
              dur={`${2 + (i % 4) * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        {inner.map((m, i) => (
          <circle key={`i${i}`} cx={m.x} cy={m.y} r="3.5" className="net-node arcane-node" />
        ))}
        <circle cx="250" cy="250" r="6" className="net-core" />
      </motion.svg>
    </div>
  );
}
