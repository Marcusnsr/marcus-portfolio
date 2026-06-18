// About-Me content. Prose flows freely; images are woven through as a collage
// rather than rigidly mapped one-to-one to a hobby.

export const characterLevel = 24; // Marcus's age, in D&D terms.

export const hobbyImages: { src: string; alt: string; caption: string }[] = [
  { src: "/images/hobbies/dnd.webp", alt: "Dungeons & Dragons session", caption: "Roll for initiative" },
  { src: "/images/hobbies/boardgame.webp", alt: "Board game night", caption: "Game night" },
  { src: "/images/hobbies/dj.webp", alt: "DJing at an event", caption: "Behind the decks" },
  { src: "/images/hobbies/lego.webp", alt: "A building and making project", caption: "Always building" },
];

export const aboutParagraphs: string[] = [
  "Beyond the screen, I'm a builder at heart. I design and 3D print on both FDM and resin machines, paint miniatures for tabletop games, and happily lose whole weekends to woodworking, sewing, leatherworking, and electronics. There is something deeply satisfying about taking a rough idea, sketching it out, and slowly turning it into a real object I can hold. Most of my projects start as a small problem I want to solve and quietly grow into something far more elaborate than I first planned.",
  "Tabletops are where I unwind and create at the same time. I play Dungeons & Dragons regularly, and I love the storytelling and collaborative world-building just as much as rolling the dice. Building characters, sketching maps, and improvising a scene with friends scratches the same creative itch that drew me to engineering in the first place. It is equal parts imagination, problem-solving, and good company gathered around a table.",
  "That same instinct pulls me toward strategy-heavy and cooperative board games, the kind that reward careful planning, reading the situation, and working well as a team. I am drawn to games with real depth, where every decision matters and a clever plan can turn the whole thing around. Video games fill the gaps in between, a mix of competitive matches and slower, narrative-driven worlds that I lean on to switch off and recharge after a long day.",
  "And I make noise, too. I DJ with friends in our own music collective, mixing tracks and chasing that moment when a room locks into the same rhythm. Together we have hosted and played a one-day festival for upcoming artists at Ungdomsøen, Bass Rave at Culture Box, Future Rave at Basement, and plenty of events large and small in between. Whether I'm behind a soldering iron, a set of dice, or a mixing desk, it always comes back to the same thing: making something and sharing it with the people around me.",
];

// A D&D-style character sheet flourish: playful, not literal.
export const characterStats: { stat: string; score: number; label: string }[] = [
  { stat: "INT", score: 18, label: "Machine Learning" },
  { stat: "WIS", score: 16, label: "Research & Rigor" },
  { stat: "DEX", score: 15, label: "Making & 3D Printing" },
  { stat: "CHA", score: 15, label: "DJing & Storytelling" },
  { stat: "CON", score: 14, label: "Long Debug Sessions" },
  { stat: "STR", score: 12, label: "Carrying the Party" },
];
