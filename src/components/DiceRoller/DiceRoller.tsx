import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./DiceRoller.css";

type Mode = "idle" | "rolling" | "result" | "crit" | "broken" | "healing";

const flavor: Record<string, string> = {
  nat20: "Critical hit!",
  high: "Nicely rolled.",
  mid: "Not bad.",
  low: "Could be better.",
  nat1: "Critical fail.",
};

function tier(n: number) {
  if (n === 20) return "nat20";
  if (n === 1) return "nat1";
  if (n >= 14) return "high";
  if (n >= 7) return "mid";
  return "low";
}

const rnd = () => Math.floor(Math.random() * 20) + 1;
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// DEV-only: ?roll=1 / ?roll=20 (or keys 1 / 2) force an outcome for testing.
// Production always rolls randomly.
const devForced = (): number | null => {
  if (!import.meta.env.DEV) return null;
  const v = new URLSearchParams(window.location.search).get("roll");
  const n = v ? parseInt(v, 10) : NaN;
  return n >= 1 && n <= 20 ? n : null;
};

// Crit particle burst (gold/ember sparks radiating from the dice).
const SPARKS = Array.from({ length: 26 }, (_, i) => {
  const a = (i / 26) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
  const dist = 90 + Math.random() * 160;
  return {
    tx: Math.cos(a) * dist,
    ty: Math.sin(a) * dist,
    d: Math.random() * 0.18,
    s: 0.6 + Math.random() * 1,
    arcane: Math.random() > 0.6,
  };
});

export default function DiceRoller() {
  const [mode, setMode] = useState<Mode>("idle");
  const [roll, setRoll] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  const interval = useRef<number | null>(null);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  // Reflect mode on <body> so global CSS can dim / crack / heal the page.
  useEffect(() => {
    const b = document.body.classList;
    b.toggle("is-broken", mode === "broken");
    b.toggle("is-healing", mode === "healing");
    b.toggle("is-crit", mode === "crit");
  }, [mode]);

  useEffect(() => {
    return () => {
      clearTimers();
      document.body.classList.remove("is-broken", "is-healing", "is-crit");
    };
  }, []);

  const finish = (n: number) => {
    setRoll(n);
    const t = tier(n);
    if (t === "nat20") {
      setMode("crit");
      later(() => setMode("idle"), 2600);
    } else if (t === "nat1") {
      setMode("broken");
      // Failsafe so the user is never stuck if they ignore the button.
      later(() => {
        setMode((m) => (m === "broken" ? "healing" : m));
        later(() => setMode((m) => (m === "healing" ? "idle" : m)), 1600);
      }, 12000);
    } else {
      setMode("result");
      later(() => setMode((m) => (m === "result" ? "idle" : m)), 2500);
    }
  };

  const doRoll = (forcedFinal?: number) => {
    if (mode === "rolling" || mode === "broken" || mode === "healing") return;
    clearTimers();
    const final = forcedFinal ?? devForced() ?? rnd();
    setMode("rolling");
    setRoll(null);
    if (reduceMotion()) {
      finish(final);
      return;
    }
    let ticks = 0;
    interval.current = window.setInterval(() => {
      setRoll(rnd());
      if (++ticks > 10) {
        if (interval.current) clearInterval(interval.current);
        interval.current = null;
        finish(final);
      }
    }, 70);
  };

  const castResurrection = () => {
    clearTimers();
    setMode("healing");
    later(() => setMode("idle"), 1600);
  };

  // DEV-only keyboard shortcuts for testing the set-pieces.
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "1") doRoll(1);
      if (e.key === "2") doRoll(20);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const t = roll ? tier(roll) : null;

  return (
    <>
      {/* Catastrophe: lights out, cracks, the page crumbles */}
      <AnimatePresence>
        {(mode === "broken" || mode === "healing") && (
          <motion.div
            className={`fx-break${mode === "healing" ? " is-healing" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            aria-hidden
          >
            <div className="fx-break__veil" />
            <svg
              className="fx-break__cracks"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <g>
                <path d="M50 40 L46 8 L42 0" />
                <path d="M50 40 L70 14 L78 2" />
                <path d="M50 40 L88 30 L100 26" />
                <path d="M50 40 L84 64 L100 74" />
                <path d="M50 40 L58 82 L62 100" />
                <path d="M50 40 L34 78 L28 100" />
                <path d="M50 40 L14 60 L0 66" />
                <path d="M50 40 L16 26 L0 18" />
                <path d="M70 14 L74 22 M84 64 L76 62 M58 82 L64 76 M34 78 L40 70 M16 26 L24 32" />
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Critical hit celebration */}
      <AnimatePresence>
        {mode === "crit" && (
          <motion.div
            className="fx-crit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-hidden
          >
            <span className="fx-crit__glow" />
            <span className="fx-crit__ring" />
            <span className="fx-crit__ring fx-crit__ring--2" />
            <div className="fx-crit__sparks">
              {SPARKS.map((p, i) => (
                <span
                  key={i}
                  className={`fx-crit__spark${p.arcane ? " is-arcane" : ""}`}
                  style={
                    {
                      "--tx": `${p.tx}px`,
                      "--ty": `${p.ty}px`,
                      "--d": `${p.d}s`,
                      "--s": p.s,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
            <span className="fx-crit__label">Critical Hit</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="dice">
        <AnimatePresence>
          {mode === "result" && t && (
            <motion.div
              className={`dice__readout dice__readout--${t}`}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {flavor[t]}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mode === "broken" && (
            <motion.button
              className="dice__resurrect"
              onClick={castResurrection}
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, delay: 0.5 }}
              data-cursor
            >
              <span className="dice__resurrect-rune" aria-hidden>
                ✦
              </span>
              Cast True Resurrection
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          className={`dice__d20${mode === "crit" ? " is-crit" : ""}${
            mode === "broken" || mode === "healing" ? " is-dead" : ""
          }`}
          onClick={() => doRoll()}
          whileTap={{ scale: 0.9 }}
          animate={mode === "rolling" ? { rotate: [0, 360] } : { rotate: 0 }}
          transition={mode === "rolling" ? { duration: 0.7, repeat: Infinity, ease: "linear" } : {}}
          aria-label="Roll a d20"
          data-cursor
        >
          <svg viewBox="0 0 100 100" width="44" height="44">
            <polygon
              points="50,5 90,30 90,70 50,95 10,70 10,30"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <polygon points="50,5 90,30 50,45 10,30" fill="rgba(124,58,237,0.25)" />
            <polygon points="50,95 90,70 50,45 10,70" fill="rgba(212,175,55,0.18)" />
            <line x1="50" y1="45" x2="50" y2="95" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10" y1="30" x2="50" y2="45" stroke="currentColor" strokeWidth="1.5" />
            <line x1="90" y1="30" x2="50" y2="45" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="dice__num">{roll ?? 20}</span>
        </motion.button>
      </div>
    </>
  );
}
