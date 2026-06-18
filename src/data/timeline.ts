export type TimelineItem = {
  id: string;
  date: string; // display label
  sortKey: number; // for ordering (YYYYMM)
  title: string;
  blurb: string;
  image: string;
  url?: string;
};

// Dated milestones only. Early jobs (FK, Bilka) are intentionally excluded;
// they live in the Job Experience section instead.
export const timeline: TimelineItem[] = [
  {
    id: "podcast",
    date: "2023",
    sortKey: 202301,
    title: "UCPH Study Life Podcast",
    blurb:
      "Featured on the University of Copenhagen Study Life podcast, talking about machine learning & data science.",
    image: "/images/timeline/podcast.webp",
    url: "https://www.linkedin.com/posts/marcus-rasmussen-a8b5a9151_machine-learning-og-datavidenskab-activity-7051102186600034305-5t2d",
  },
  {
    id: "digital-tech-summit",
    date: "2023",
    sortKey: 202311,
    title: "Pitch @ Digital Tech Summit",
    blurb:
      "TrafficPulse selected to pitch in front of investors at the Digital Tech Summit.",
    image: "/images/timeline/digital-tech-summit.webp",
    url: "https://www.linkedin.com/posts/marcus-rasmussen-a8b5a9151_pitching-our-startup-at-digital-tech-summit-activity-7128041838040510464-bEbn",
  },
  {
    id: "bachelor-defence",
    date: "2024",
    sortKey: 202406,
    title: "Defended my Bachelor's Thesis",
    blurb:
      "Cellular Cartography: navigating the histological terrain of IBD with machine learning. Grade: 12.",
    image: "/images/timeline/bachelor-defence.webp",
    url: "https://github.com/Marcusnsr/Bachelor",
  },
  {
    id: "light-festival",
    date: "2025",
    sortKey: 202502,
    title: "Copenhagen Light Festival '25",
    blurb:
      "Selected for exhibition at the Copenhagen Light Festival 2025, part of 'The Building Bubble' programme.",
    image: "/images/timeline/light-festival.webp",
    url: "https://copenhagenlightfestival.org/en-the-building-bubble-programme-2025/",
  },
  {
    id: "fitng",
    date: "2026",
    sortKey: 202601,
    title: "Poster @ FIT'NG, Panama City",
    blurb:
      "Poster presentation at the FIT'NG Annual Conference: a computationally efficient baseline for infant brain-age prediction.",
    image: "/images/timeline/fitng-poster.webp",
  },
  {
    id: "ddsa-grant",
    date: "2026",
    sortKey: 202602,
    title: "DDSA Travel Grant",
    blurb:
      "Awarded a 15,000 DKK travel grant by the Danish Data Science Academy to present at FIT'NG in Panama City.",
    image: "/images/timeline/ddsa-grant.webp",
  },
  {
    id: "master-defence",
    date: "2026",
    sortKey: 202603,
    title: "Defended my Master's Thesis",
    blurb:
      "Predicting Infant Brain Age from Structural MRI: a normative baseline for atypical development. Grade: 12.",
    image: "/images/timeline/master-defence.webp",
  },
];
