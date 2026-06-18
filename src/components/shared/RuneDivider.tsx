import "./RuneDivider.css";

// A decorative arcane separator between sections.
export default function RuneDivider() {
  return (
    <div className="rune-divider" aria-hidden>
      <span className="rune-divider__line" />
      <svg viewBox="0 0 24 24" width="22" height="22" className="rune-divider__glyph">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M12 3 L20 18 L4 18 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      </svg>
      <span className="rune-divider__line" />
    </div>
  );
}
