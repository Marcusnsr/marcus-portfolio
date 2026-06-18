export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  images: string[];
  videos?: { src: string; poster: string; caption: string }[];
  links: { label: string; url: string }[];
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "trafficpulse",
    title: "TrafficPulse",
    tagline: "Automated traffic monitoring with computer vision",
    description:
      "A software system for automated traffic monitoring using computer vision and AI, offering a scalable alternative to manual traffic counting. It detects and classifies vehicles from video footage and collects real-time data, helping cities understand traffic patterns and support data-driven urban planning.",
    images: ["/images/projects/trafficpulse.webp"],
    videos: [
      {
        src: "/videos/trafficpulse-2.mp4",
        poster: "/videos/trafficpulse-2-poster.webp",
        caption: "Retraining test v1",
      },
      {
        src: "/videos/trafficpulse-1.mp4",
        poster: "/videos/trafficpulse-1-poster.webp",
        caption: "Retraining test v2",
      },
    ],
    links: [{ label: "GitHub", url: "https://github.com/Marcusnsr/TrafficPulse" }],
    tags: ["Computer Vision", "Object Detection", "Smart City"],
  },
  {
    id: "hector",
    title: "Hector",
    tagline: "Real-time AI for ulcerative colitis severity assessment",
    description:
      "An AI system that automatically assesses disease severity from endoscopic images and videos in ulcerative colitis. The model is trained and validated on real clinical data, and the project now focuses on integrating the tool into everyday clinical workflows. The aim is a real-time interface embedded in the hospital's electronic health record system to improve documentation and support clinicians during procedures.",
    images: [
      "/images/projects/hector-1.webp",
      "/images/projects/hector-2.webp",
      "/images/projects/hector-3.webp",
      "/images/projects/hector-4.webp",
      "/images/projects/hector-5.webp",
    ],
    links: [],
    tags: ["Medical AI", "Endoscopy", "Clinical Deployment"],
  },
  {
    id: "orion-webinar",
    title: "Orion Pharma Webinar",
    tagline: "AI in Medicine: Hype, Harm, and How to Get It Right",
    description:
      "A webinar for medical professionals on the use of AI in medicine: what AI is, how it works, and how to critically evaluate research papers. The session gave participants practical tools to interpret and assess scientific articles on AI applications in healthcare.",
    images: ["/images/projects/orion-webinar.webp"],
    links: [
      {
        label: "Watch the webinar",
        url: "https://www.orionpharma.dk/for-sundhedspersoner/colitis-ulcerosa/webinar/optaget-webinar/",
      },
    ],
    tags: ["Science Communication", "Medical AI"],
  },
];
