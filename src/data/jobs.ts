export type Job = {
  id: string;
  company: string;
  title: string;
  period: string;
  description: string;
  logo: string;
};

// Full career progression, oldest → newest. Shown as connected bubbles.
export const jobs: Job[] = [
  {
    id: "fk",
    company: "FK Distribution A/S",
    title: "Distributor",
    period: "May 2016 – Apr 2021",
    description:
      "My first part-time job, responsible for newspaper delivery. Where the work ethic started.",
    logo: "/images/jobs/fk.png",
  },
  {
    id: "bilka",
    company: "Bilka · Salling Group",
    title: "Customer Service Assistant",
    period: "Nov 2020 – Present",
    description:
      "Customer service representative at Bilka, balancing the role alongside my studies.",
    logo: "/images/jobs/bilka.png",
  },
  {
    id: "digitalheadhunter",
    company: "DIGITALHeadhunter ApS",
    title: "Webmaster",
    period: "Sep 2019 – Present",
    description:
      "Manage and enhance DIGITALHeadhunter.dk, transforming it into a professional, custom website with a seamless user experience.",
    logo: "/images/jobs/digitalheadhunter.png",
  },
  {
    id: "gain",
    company: "GAIN · UCPH / Hvidovre Hospital",
    title: "AI Researcher",
    period: "Apr 2024 – Present",
    description:
      "Research meets real-world gastroenterology at the Gastrointestinal Artificial Intelligence Network, focused on automated IBD assessment via multimodal models that integrate ultrasound, endoscopy, histology, and tabular data.",
    logo: "/images/jobs/gain.png",
  },
  {
    id: "ucph-ta",
    company: "University of Copenhagen",
    title: "Teaching Assistant (Grundlæggende Datalogi)",
    period: "Aug 2025 – Feb 2026\nAug 2026 – Feb 2027",
    description:
      "Supporting and guiding first-year students in foundational computer science: assisting exercise classes and assessing coursework throughout the course.",
    logo: "/images/jobs/ucph.png",
  },
];
