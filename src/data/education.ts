export type Thesis = {
  level: string;
  title: string;
  subtitle: string;
  grade: string;
  summary: string;
  image: string;
  repo?: { label: string; url: string };
};

export type Degree = {
  level: string;
  field: string;
  institution: string;
  years: string;
  focus: string;
};

export const degrees: Degree[] = [
  {
    level: "MSc",
    field: "Computer Science",
    institution: "University of Copenhagen",
    years: "2024 – 2026",
    focus: "Medical AI · Computer Vision",
  },
  {
    level: "BSc",
    field: "Machine Learning & Data Science",
    institution: "University of Copenhagen",
    years: "2021 – 2024",
    focus: "General ML · Data Processing · Computer Vision",
  },
  {
    level: "Guest",
    field: "Guest Student",
    institution: "IT University of Copenhagen",
    years: "2023 – 2024",
    focus: "Software Engineering · Cybersecurity",
  },
];

export const theses: Thesis[] = [
  {
    level: "Master's Thesis",
    title: "Predicting Infant Brain Age from Structural MRI",
    subtitle:
      "Developing a Normative Baseline for Detecting Atypical Developmental Trajectories in Early Infancy",
    grade: "12",
    summary:
      "Explores AI for assessing early brain development from infant MRI. The goal: a lightweight, efficient model that estimates brain age with far fewer compute resources than existing approaches. The work also probes how the model makes predictions and tests it on a clinical cohort at high risk of Cerebral Palsy, achieving competitive performance while being substantially smaller than state-of-the-art alternatives.",
    image: "/images/education/master-overview.webp",
  },
  {
    level: "Bachelor's Thesis",
    title: "Cellular Cartography",
    subtitle:
      "Navigating the Histological Terrain of IBD with Machine Learning",
    grade: "12",
    summary:
      "An ML framework (leveraging models such as StarDist) for precise segmentation, identification, and classification of inflammatory cells in histological images from IBD patients. It predicts disease severity by correlating it with segmentation maps, generating heatmaps of inflammation across whole-slide images as a faster, more reliable alternative to manual histological analysis.",
    image: "/images/education/bachelor-cells.webp",
    repo: {
      label: "github.com/Marcusnsr/Bachelor",
      url: "https://github.com/Marcusnsr/Bachelor",
    },
  },
];

// A curated selection of the ML / AI / vision highlights, not the full transcript.
export const coursework: { group: string; courses: string[] }[] = [
  {
    group: "Machine Learning & AI",
    courses: [
      "Machine Learning A",
      "Machine Learning B",
      "Advanced Deep Learning",
      "Data Science",
      "Models for Complex Systems",
    ],
  },
  {
    group: "Computer Vision & Medical AI",
    courses: [
      "Vision and Image Processing",
      "Medical Image Analysis",
      "Specialeforberedende projekt (pre-thesis)",
    ],
  },
  {
    group: "Systems & Algorithms",
    courses: [
      "Advanced Algorithms and Data Structures",
      "Advanced Programming",
      "Advanced Computer Systems",
      "High Performance Programming & Systems",
    ],
  },
  {
    group: "Foundations & Guest Study (ITU)",
    courses: [
      "Linear Algebra · Mathematical Analysis · Probability & Statistics",
      "Security and Privacy (ITU)",
      "Software Development & Software Engineering (ITU)",
    ],
  },
];
