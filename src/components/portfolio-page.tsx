"use client";

import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Check,
  Cloud,
  Database,
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { navigation, principles, projects, skillGroups } from "@/data/portfolio";
import { credentialDocuments } from "@/data/credentials";
import OpenToRoles from "@/components/sections/OpenToRoles";
import InteractiveProfileCard from "@/components/sections/InteractiveProfileCard";

const email = "mdshaqibhussain5@gmail.com";
const linkedin = "https://linkedin.com/in/md-shaqib-hussain";
const github = "https://github.com/Shaqib27";
const primarySkills = new Set(["Python", "SQL", "Pandas", "Scikit-learn", "TensorFlow", "PySpark", "FastAPI"]);

function SectionHeading({
  eyebrow,
  title,
  number,
}: {
  eyebrow: string;
  title: string;
  number: string;
}) {
  return (
    <div className="section-heading">
      <span className="section-number">{number}</span>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

export default function PortfolioPage({ availableCredentialIds }: { availableCredentialIds: string[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const previousBodyOverflowRef = useRef("");
  const availableCredentials = credentialDocuments.filter((document) =>
    availableCredentialIds.includes(document.id),
  );
  const excelCredential = credentialDocuments.find((document) => document.id === "excel-certificate");

  function renderCredentialActions(educationId: "pg-dbda" | "btech" | "additional") {
    return availableCredentials
      .filter((document) => document.educationId === educationId)
      .map((document) => (
        <Link className="credential-link" href={`/credentials/${document.slug}`} key={document.id}>
          <FileText aria-hidden="true" size={13} />
          <span>{document.actionLabel}</span>
          <ArrowUpRight aria-hidden="true" size={12} />
        </Link>
      ));
  }

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    previousBodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.getElementById("primary-navigation")?.querySelector<HTMLAnchorElement>("a[href]")?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const nav = document.getElementById("primary-navigation");
        const links = Array.from(nav?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []);
        const currentIndex = links.findIndex((element) => element === document.activeElement);
        const nextIndex = event.shiftKey ? currentIndex - 1 : currentIndex + 1;

        if (currentIndex === -1 || nextIndex < 0 || nextIndex >= links.length) {
          event.preventDefault();
          links[event.shiftKey ? links.length - 1 : 0]?.focus();
        }
      }
    }

    function handleResize() {
      if (window.innerWidth > 900) setMenuOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      document.body.style.overflow = previousBodyOverflowRef.current;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  function closeMenu() {
    if (menuOpen) document.body.style.overflow = previousBodyOverflowRef.current;
    setMenuOpen(false);
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="nav-shell">
          <a className="wordmark" href="#home" aria-label="Md Shaqib Hussain, home" onClick={closeMenu}>
            <span className="wordmark-mark"><span className="wordmark-initial">S</span><span className="wordmark-dot">.</span></span>
            <span className="wordmark-name">MD SHAQIB HUSSAIN</span>
          </a>
          <nav className={`desktop-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation" id="primary-navigation">
            {navigation.map((item) => (
              <a
                className={activeSection === item.href.slice(1) ? "nav-link is-active" : "nav-link"}
                href={item.href}
                key={item.label}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a className="nav-cta" href="/files/Md_Shaqib_Hussain_Resume.pdf" download onClick={closeMenu}>
              Résumé <ArrowUpRight size={14} />
            </a>
          </nav>
          <button
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            ref={menuButtonRef}
            type="button"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="status-dot" /> DATA ANALYTICS · MACHINE LEARNING · ARTIFICIAL INTELLIGENCE</div>
            <h1>
              <span className="hero-line">I turn data</span>
              <span className="hero-line">into <span className="headline-accent">meaningful impact.</span></span>
            </h1>
            <p className="hero-description">
              I&apos;m Shaqib — a Data &amp; AI professional passionate about uncovering insights, building predictive models, and developing intelligent solutions to solve real-world problems.
            </p>
            <p className="hero-description">
              I enjoy exploring complex challenges, discovering patterns, experimenting with emerging technologies, and transforming ideas into practical solutions.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore my work <ArrowDownRight aria-hidden="true" size={17} /></a>
              <a className="button button-text" href="#contact">Let&apos;s connect <ArrowUpRight aria-hidden="true" size={16} /></a>
            </div>
            <div className="hero-location">BENGALURU, INDIA · OPEN TO DATA &amp; AI OPPORTUNITIES</div>
          </div>

          <InteractiveProfileCard />
        </section>

        <OpenToRoles />

        <section className="work-section section-wrap section-spacing" id="work">
          <SectionHeading eyebrow="01 / SELECTED WORK" title="Projects I've worked on." number="" />
          <p className="section-intro">A selection of projects in data science, machine learning, and AI.</p>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <div className="project-detail">
                  <div className="project-meta"><span>{project.number} / PROJECT</span><span>{project.category}</span></div>
                  <div className="project-main">
                    <div className="project-heading">
                      <h3>{project.name}</h3>
                      <p className="project-subtitle">{project.subtitle}</p>
                    </div>
                    <p className="project-description">{project.description}</p>
                  </div>
                  <div className="project-bottom">
                    <div className="project-results project-metrics">
                      {project.metrics.map((metric) => (
                        <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
                      ))}
                    </div>
                    <div className="project-tools">
                      <div className="tag-list project-tags" aria-label="Technologies used">
                        {project.tools.map((tool) => <span className="tag" key={tool}>{tool}</span>)}
                      </div>
                      <div className="project-links">
                        <a href={project.github} target="_blank" rel="noreferrer">
                          <Github size={14} /> {project.githubLabel} <ArrowUpRight size={13} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <a className="text-link" href={github} target="_blank" rel="noreferrer">
            More experiments on GitHub <ArrowUpRight size={16} />
          </a>
        </section>

        <section className="experience-section section-wrap section-spacing" id="experience">
          <SectionHeading eyebrow="Experience" title="Insight, in the real world." number="02" />
          <div className="experience-card">
            <div className="experience-timeline"><span className="timeline-dot" /><span className="timeline-line" /></div>
            <div className="experience-main">
              <div className="experience-top">
                <div>
                  <p className="eyebrow">MAR 2026 — AUG 2026 · MUMBAI, INDIA</p>
                  <h3>Graduate Engineer Trainee <span>— Data Analyst</span></h3>
                  <p className="company">SINCLUS Engineering &amp; Consulting Pvt. Ltd. <span>· BPCL Project</span></p>
                </div>
                <span className="experience-badge">ENERGY &amp; OPERATIONS</span>
              </div>
              <div className="experience-points">
                <div><Check size={16} /><p>Consolidated operational data with SQL, improving reporting efficiency and reducing turnaround by approximately <strong>30%</strong>.</p></div>
                <div><Check size={16} /><p>Built Power BI dashboards tracking <strong>10+ key operational metrics</strong> across three departments.</p></div>
                <div><Check size={16} /><p>Automated recurring data extraction and cleaning in Python and Excel to reduce manual work and reporting errors.</p></div>
                <div><Check size={16} /><p>Used statistical analysis and EDA to surface production trends and anomalies for weekly business reviews.</p></div>
              </div>
              <div className="experience-tools"><Database size={14} /> SQL <span>·</span> Power BI <span>·</span> Python <span>·</span> Excel</div>
            </div>
          </div>
        </section>

        <section className="skills-section section-wrap section-spacing" id="skills">
          <SectionHeading eyebrow="Technical capabilities" title="Skills & Toolkit" number="03" />
          <p className="section-intro">A practical toolkit, built around the work.</p>
          <div className="skills-grid">
            {skillGroups.map((group, index) => {
              const icons = [BarChart3, BrainCircuit, Cloud, Database];
              const SkillIcon = icons[index];
              return (
                <article className="skill-card" key={group.title}>
                  <div className="skill-card-top"><span>0{index + 1}</span><SkillIcon size={20} strokeWidth={1.5} /></div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <div className="tag-list skill-tags">
                    {group.skills.map((skill) => (
                      <span className={`tag skill-chip${primarySkills.has(skill) ? " is-primary" : ""}`} key={skill}>{skill}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="about-section section-wrap section-spacing" id="about">
          <SectionHeading eyebrow="About me" title="Curious by nature. Rigorous by practice." number="04" />
          <div className="about-content">
            <p className="about-lead">I like understanding the problem before deciding what to build.</p>
            <div className="about-copy">
              <p>I’m naturally curious about how things work and enjoy learning what a problem demands. Whether I’m exploring data, building a machine learning model, or working with an unfamiliar technology, I try to understand the problem deeply before jumping to a solution.</p>
              <p>Good work comes from curiosity, responsibility, and consistency. I take ownership of what I build, stay open to the learning curve of new challenges, and focus on solutions that are useful in practice—not just technically impressive.</p>
            </div>
          </div>
          <ol className="principles-list">
            {principles.map((principle, index) => (
              <li key={principle}><span>0{index + 1}</span><strong>{principle}</strong></li>
            ))}
          </ol>
        </section>

        <section className="education-section section-wrap section-spacing" id="education">
          <SectionHeading eyebrow="/ EDUCATION & CREDENTIALS" title="Education & Credentials." number="05" />
          <p className="section-intro">Academic foundations, achievements, and verified credentials.</p>
          <div className="education-list">
            <article className="education-item">
              <span className="education-year">2025 — 2026</span>
              <div className="education-detail">
                <h3>PG Diploma in Big Data Analytics (AI &amp; ML)</h3>
                <p>C-DAC Pune / Know-IT Pune</p>
                <div className="education-documents">{renderCredentialActions("pg-dbda")}</div>
              </div>
              <span className="education-result">GRADE A+ <strong>86.88%</strong></span>
            </article>
            <article className="education-item">
              <span className="education-year">2021 — 2025</span>
              <div className="education-detail">
                <h3>B.Tech in Computer Science &amp; Engineering</h3>
                <p>Heritage Institute of Technology, Kolkata</p>
                <div className="education-documents">{renderCredentialActions("btech")}</div>
              </div>
              <span className="education-result">CGPA <strong>7.69</strong></span>
            </article>
            <article className="education-item">
              <span className="education-year">2025</span>
              <div className="education-detail">
                <h3>GATE Computer Science &amp; Engineering</h3>
                <p>Graduate Aptitude Test in Engineering</p>
              </div>
              <span className="education-result"><strong>Qualified</strong></span>
            </article>
          </div>
          <div className="education-certifications">
            <p className="eyebrow">ADDITIONAL CERTIFICATIONS</p>
            <article className="education-certification">
              <div>
                <h3>Excel Certification</h3>
                {(excelCredential?.subtitle || excelCredential?.issuer) && (
                  <p>{[excelCredential.subtitle, excelCredential.issuer].filter(Boolean).join(" · ")}</p>
                )}
              </div>
              <div className="education-documents">{renderCredentialActions("additional")}</div>
            </article>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-orbit" aria-hidden="true"><div /><div /><div /></div>
          <div className="contact-content">
            <p className="eyebrow">Have a good problem?</p>
            <h2>Let’s make<br />something <span>intelligent.</span></h2>
            <p className="contact-description">Open to conversations about data, AI, and the ideas that connect them.</p>
            <a className="button button-light" href={`mailto:${email}`}>Start a conversation <ArrowUpRight size={17} /></a>
          </div>
          <a className="contact-email" href={`mailto:${email}`}><Mail size={17} /> {email}</a>
          <div className="contact-side-note">GOOD WORK<br />STARTS WITH<br />A QUESTION.</div>
          <div className="contact-links">
            <a href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn <ArrowUpRight size={12} /></a>
            <a href={github} target="_blank" rel="noreferrer"><Github size={14} /> GitHub <ArrowUpRight size={12} /></a>
            <a href="/files/Md_Shaqib_Hussain_Resume.pdf" download><ArrowDown size={14} /> Résumé</a>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="footer-signoff" href="#home">Made with intent <span>↗</span></a>
        <span className="footer-copy">© {new Date().getFullYear()} MD SHAQIB HUSSAIN · BENGALURU, INDIA</span>
        <div className="footer-links">
          <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={17} /></a>
          <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={17} /></a>
          <a href={`mailto:${email}`} aria-label="Email Shaqib"><Mail size={17} /></a>
        </div>
      </footer>
    </>
  );
}
