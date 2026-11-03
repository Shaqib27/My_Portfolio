"use client";

import { ArrowUpRight, BarChart3, Cpu, Layers3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const roles = [
  {
    number: "01",
    title: "Data Analyst",
    description: "ANALYZE · VISUALIZE · DRIVE INSIGHTS",
    Icon: BarChart3,
  },
  {
    number: "02",
    title: "Data Scientist",
    description: "MODEL · EXPERIMENT · SOLVE PROBLEMS",
    Icon: Layers3,
  },
  {
    number: "03",
    title: "AI/ML Engineer",
    description: "BUILD · DEPLOY · SCALE AI SYSTEMS",
    Icon: Cpu,
  },
];

export default function OpenToRoles() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="open-roles-heading"
      className={`open-roles${isVisible ? " is-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="open-roles-inner">
        <div className="open-roles-intro">
          <p className="open-roles-label">
            <span className="status-dot" aria-hidden="true" />
            Currently open to
          </p>
          <h2 id="open-roles-heading">
            Roles I’m <span>looking for.</span>
          </h2>
        </div>

        <ul className="open-roles-list">
          {roles.map(({ number, title, description, Icon }) => (
            <li key={number}>
              <article className="open-role-card">
                <Icon className="open-role-icon" size={27} strokeWidth={1.6} aria-hidden="true" />
                <div className="open-role-copy">
                  <span className="open-role-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <ArrowUpRight className="open-role-arrow" size={18} strokeWidth={1.7} aria-hidden="true" />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
