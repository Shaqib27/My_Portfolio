export const navigation = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export type ProjectVisualKind = "scan" | "air";

type PortfolioProject = {
  number: string;
  category: string;
  name: string;
  subtitle: string;
  description: string;
  metrics: { value: string; label: string }[];
  tools: string[];
  github: string;
  githubLabel: string;
  visual: ProjectVisualKind;
};

export const projects: PortfolioProject[] = [
  {
    number: "01",
    category: "Deep learning · Healthcare",
    name: "IntelliScan",
    subtitle: "AI-Assisted Cancer Screening System",
    description:
      "CNN-based binary screening across 5+ cancer categories, using transfer learning and distributed image preprocessing.",
    metrics: [
      { value: "91%", label: "validation accuracy" },
      { value: "0.93", label: "AUC–ROC" },
    ],
    tools: ["PySpark", "TensorFlow", "Keras", "CNN", "Scikit-learn", "Transfer learning"],
    github: "https://github.com/Shaqib27",
    githubLabel: "GitHub profile",
    visual: "scan",
  },
  {
    number: "02",
    category: "Time series · Environmental data",
    name: "Air Quality Forecasting System",
    subtitle: "Multi-horizon air quality prediction",
    description:
      "Analyzed five pollutant types and engineered time-series features for multi-horizon prediction, from preparation through model evaluation.",
    metrics: [
      { value: "0.89", label: "R² score" },
      { value: "12.4", label: "RMSE" },
    ],
    tools: ["Python", "Pandas", "Scikit-learn", "Random Forest", "Data analysis"],
    github: "https://github.com/Shaqib27/Air_Quality_Forcasting",
    githubLabel: "Repository",
    visual: "air",
  },
];

export const skillGroups = [
  {
    title: "Data & Analytics",
    description: "From raw data to useful decisions.",
    skills: ["Python", "SQL", "Pandas", "NumPy", "EDA", "Statistics", "Power BI", "Tableau", "Excel"],
  },
  {
    title: "Machine Learning",
    description: "Models built to generalize.",
    skills: ["Scikit-learn", "Regression", "Classification", "Random Forest", "XGBoost", "Feature engineering", "Model evaluation", "Time series"],
  },
  {
    title: "AI & Deep Learning",
    description: "Modern AI, grounded in practice.",
    skills: ["TensorFlow", "Keras", "CNNs", "Transformers", "LLMs", "RAG", "LangChain", "NLP"],
  },
  {
    title: "Engineering & Scale",
    description: "Making solutions usable and scalable.",
    skills: ["PySpark", "FastAPI", "Docker", "Git", "AWS", "MySQL", "Linux", "Streamlit"],
  },
];

export const principles = [
  "Stay curious",
  "Learn deeply",
  "Take ownership",
  "Build useful things",
];
