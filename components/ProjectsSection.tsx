"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { projects } from "../data/portfolio";
import ProjectModal from "./ProjectModal";
import ProjectMediaCarousel from "./ProjectMediaCarousel";
import type { ProjectItem } from "../data/portfolio";
import styles from "./ProjectsSection.module.css";

function ProjectMediaTop({ item }: { item: ProjectItem }) {
  const items = item.media;
  if (items && items.length > 0) {
    return <ProjectMediaCarousel items={items} className={styles.mediaCarousel} showArrows={false} />;
  }
  return (
    <div className={styles.mediaCarousel} aria-hidden>
      <ProjectMediaCarousel items={[]} className={styles.mediaCarousel} />
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
};

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section className={styles.section} id="projects">
      <div className="container">
        <motion.div {...fadeUp} className={styles.header}>
          <span className="accent-tag">Portfolio</span>
          <h2 className={styles.title}>Selected Work</h2>
          <p className={styles.subtitle}>
            Side projects, tools, and experiments I&apos;ve shipped end to end.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              className={styles.card}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 1,
                delay: i * 0.08,
                ease: [0.25, 1, 0.5, 1],
              }}
              onClick={() => setSelectedProject(project)}
            >
              <ProjectMediaTop item={project} />
              
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  {project.logo ? (
                    <div className={styles.cardLogoWrap}>
                      <Image 
                        src={project.logo} 
                        alt={project.title} 
                        className={styles.cardLogo} 
                        width={44} 
                        height={44}
                      />
                    </div>
                  ) : (
                    <span className={styles.cardEmoji}>{project.emoji}</span>
                  )}
                  <span className={styles.cardArrow} aria-hidden>↗</span>
                </div>
                
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.oneliner}</p>
                
                <div className={styles.cardTags}>
                  {project.tech.map((t) => (
                    <span key={t} className={styles.cardTag}>{t}</span>
                  ))}
                </div>

                {project.links && project.links.length > 0 && (
                  <div className={styles.cardActions}>
                    {project.links.map((link) => {
                      const isGithub = link.label.toLowerCase().includes("github");
                      const isStore = link.label.toLowerCase().includes("store") || link.label.toLowerCase().includes("download");
                      const isDemo = link.label.toLowerCase().includes("demo");
                      
                      return (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.cardActionButton}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {isGithub ? (
                            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.cardActionIcon}>
                              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                          ) : isStore ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cardActionIcon}>
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                          ) : isDemo ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cardActionIcon}>
                              <circle cx="12" cy="12" r="10" />
                              <polygon points="10 8 16 12 10 16 10 8" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cardActionIcon}>
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          )}
                          <span>{link.label}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
