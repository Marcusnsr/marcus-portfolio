import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./NeuralLoader.css";

type Props = { onComplete: () => void };

const RUNES = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ";

// A "summoning circle" that boots up a small neural network node-by-node,
// then dissolves into the page.
export default function NeuralLoader({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    setLeaving(true);
    setTimeout(onComplete, 750);
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPct(100);
      finish();
      return;
    }

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Neural net laid out as concentric rings of nodes (organic, circle-friendly).
    type Node = { x: number; y: number; r: number; layer: number };
    const layers = [1, 6, 10, 6];
    const nodes: Node[] = [];
    const cx = () => w / 2;
    const cy = () => h / 2;
    const baseR = () => Math.min(w, h) * 0.26;

    const build = () => {
      nodes.length = 0;
      layers.forEach((count, li) => {
        const radius = li === 0 ? 0 : (baseR() * li) / (layers.length - 1);
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2 + li * 0.4;
          nodes.push({
            x: cx() + Math.cos(a) * radius,
            y: cy() + Math.sin(a) * radius,
            r: 2.5 + Math.random() * 2,
            layer: li,
          });
        }
      });
    };
    build();

    const edges: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.abs(nodes[i].layer - nodes[j].layer) === 1) edges.push([i, j]);
      }
    }

    const DURATION = 2400;
    const start = performance.now();
    let raf = 0;

    const draw = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = t * t * (3 - 2 * t);
      setPct(Math.round(eased * 100));

      ctx.clearRect(0, 0, w, h);
      build();
      const R = baseR();
      const cX = cx();
      const cY = cy();
      const rot = now * 0.0002;

      // Magic circle rings
      ctx.save();
      ctx.translate(cX, cY);
      ctx.rotate(rot);
      const rings = [R * 1.5, R * 1.32, R * 1.18];
      rings.forEach((rr, idx) => {
        ctx.beginPath();
        ctx.arc(0, 0, rr, 0, Math.PI * 2);
        ctx.strokeStyle = idx % 2 ? "rgba(124,58,237,0.35)" : "rgba(212,175,55,0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      // Runic ticks
      const ticks = 24;
      for (let i = 0; i < ticks; i++) {
        const a = (i / ticks) * Math.PI * 2;
        const r1 = R * 1.32;
        const r2 = R * 1.4;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
        ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
        ctx.strokeStyle = "rgba(212,175,55,0.5)";
        ctx.stroke();
      }
      // Inner triangle (the "summon")
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(a) * R * 1.05;
        const py = Math.sin(a) * R * 1.05;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(124,58,237,0.5)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // Edges light up progressively
      edges.forEach(([a, b], i) => {
        const reveal = i / edges.length;
        const on = eased > reveal;
        const A = nodes[a];
        const B = nodes[b];
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.strokeStyle = on
          ? "rgba(212,175,55,0.55)"
          : "rgba(212,175,55,0.07)";
        ctx.lineWidth = on ? 1 : 0.5;
        ctx.stroke();
      });

      // Nodes pulse on
      nodes.forEach((n, i) => {
        const reveal = i / nodes.length;
        const on = eased > reveal * 0.8;
        const pulse = 1 + (on ? Math.sin(now * 0.006 + i) * 0.25 : 0);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        if (on) {
          ctx.fillStyle = "#f5b942";
          ctx.shadowColor = "rgba(245,185,66,0.9)";
          ctx.shadowBlur = 12;
        } else {
          ctx.fillStyle = "rgba(125,115,99,0.5)";
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (t < 1) {
        raf = requestAnimationFrame(draw);
      } else {
        setTimeout(finish, 350);
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="loader"
      animate={leaving ? { opacity: 0, scale: 1.06 } : {}}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      role="status"
      aria-label="Loading"
    >
      <div className="loader__runes" aria-hidden>
        {RUNES}
      </div>
      <canvas ref={canvasRef} className="loader__canvas" />
      <div className="loader__hud">
        <span className="loader__title">Summoning</span>
        <span className="loader__pct">{pct}%</span>
      </div>
      <button className="loader__skip" onClick={finish}>
        skip ✦
      </button>
    </motion.div>
  );
}
