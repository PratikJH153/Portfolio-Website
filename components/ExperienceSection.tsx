"use client";

import MediaLightbox from "./MediaLightbox";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { experience } from "../data/portfolio";
import type { ExperienceItem, ExperienceMediaItem } from "../data/portfolio";
import styles from "./ExperienceSection.module.css";

const BULLET_PREVIEW = 3;

function experiencePillLabel(exp: ExperienceItem): string | undefined {
  const parts = [exp.employment, exp.workMode].filter(Boolean);
  if (parts.length > 0) return parts.join(" · ");
  return exp.type;
}

function ExperienceDetailsList({ details }: { details: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = details.length > BULLET_PREVIEW;
  const shown = expanded || !hasMore ? details : details.slice(0, BULLET_PREVIEW);

  return (
    <div className={styles.detailsSection}>
      <ul className={styles.details}>
        {shown.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
      {hasMore ? (
        <div className={styles.detailsToggleRow}>
          <button
            type="button"
            className={styles.detailsToggle}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? "Less" : "More"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ExperienceCardArticle({ exp }: { exp: ExperienceItem }) {
  const pillLabel = experiencePillLabel(exp);

  return (
    <article className={styles.content}>
      <div className={styles.expHeader}>
        <div className={styles.expHeaderMain}>
          <div className={styles.expHeaderIntro}>
            <h3 className={styles.role}>{exp.role}</h3>
            <div className={styles.expCompanyRow}>
              {exp.logo ? (
                <div className={styles.expLogoWrap}>
                  <Image
                    src={exp.logo}
                    alt={exp.logoAlt ?? `${exp.company} logo`}
                    width={56}
                    height={56}
                    className={styles.expLogo}
                    sizes="56px"
                  />
                </div>
              ) : null}
              <div className={styles.expCompanyStack}>
                <p className={styles.companyName}>{exp.company}</p>
                {exp.description ? <p className={styles.companyTagline}>{exp.description}</p> : null}
              </div>
            </div>
          </div>
        </div>
        {exp.location || pillLabel ? (
          <div className={styles.expMetaTags}>
            {exp.location ? (
              <span className={styles.typeTag}>
                <span className={styles.typeTagIcon} aria-hidden>
                  📍
                </span>
                {exp.location}
              </span>
            ) : null}
            {pillLabel ? <span className={styles.typeTag}>{pillLabel}</span> : null}
          </div>
        ) : null}
      </div>

      {exp.details && exp.details.length > 0 ? <ExperienceDetailsList details={exp.details} /> : null}

      {exp.media && exp.media.length > 0 ? (
        <ExperienceMediaPreview items={exp.media} />
      ) : null}

      {(exp.website || exp.linkedin) ? (
        <div className={styles.expLinkRow}>
          {exp.website && (
            <a
              href={exp.website}
              className={styles.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {exp.websiteLabel ?? "Company site"}
              <span className={styles.websiteArrow} aria-hidden>
                ↗
              </span>
            </a>
          )}
          {exp.linkedin && (
            <a
              href={exp.linkedin}
              className={styles.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn Page
              <span className={styles.websiteArrow} aria-hidden>
                ↗
              </span>
            </a>
          )}
        </div>
      ) : null}
    </article>
  );
}

function ExperienceMediaPreview({ items }: { items: ExperienceMediaItem[] }) {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const openAt = (i: number) => {
    setStartIndex(i);
    setOpen(true);
  };

  const maxThumbs = 4;
  const thumbs = items.slice(0, maxThumbs);
  const overflow = Math.max(0, items.length - maxThumbs);

  return (
    <>
      <div className={styles.mediaPreview}>
        <p className={styles.mediaPreviewLabel}>Media</p>
        <div className={styles.mediaThumbRow}>
          {thumbs.map((m, i) => (
            <button
              key={`${m.src}-${i}`}
              type="button"
              className={styles.mediaMiniThumb}
              onClick={() => openAt(i)}
              aria-label={
                items.length > 1
                  ? `Open gallery, item ${i + 1} of ${items.length}`
                  : "Open media preview"
              }
            >
              {m.kind === "video" ? (
                <span className={styles.mediaMiniVideo}>
                  <span className={styles.mediaPlay} aria-hidden>
                    ▶
                  </span>
                </span>
              ) : (
                <img src={m.src} alt="" className={styles.mediaMiniImg} loading="lazy" />
              )}
              {i === maxThumbs - 1 && overflow > 0 ? (
                <span className={styles.mediaMore}>+{overflow}</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <MediaLightbox
        items={items.map((m) => ({
          src: m.src,
          alt: m.alt ?? "",
          kind: m.kind === "video" ? "video" : "image",
          caption: m.caption,
        }))}
        isOpen={open}
        initialIndex={startIndex}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const TIMELINE_NODE_SEL = "[data-timeline-node]";

export default function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [connectorGeom, setConnectorGeom] = useState<{
    w: number;
    h: number;
    segments: { x1: number; y1: number; x2: number; y2: number }[];
  }>({ w: 0, h: 0, segments: [] });

  useLayoutEffect(() => {
    const root = timelineRef.current;
    if (!root) return;

    const measure = () => {
      const nodes = root.querySelectorAll<HTMLElement>(TIMELINE_NODE_SEL);
      const w = root.offsetWidth;
      const h = root.offsetHeight;
      if (nodes.length < 2 || w === 0 || h === 0) {
        setConnectorGeom({ w, h, segments: [] });
        return;
      }
      const rect = root.getBoundingClientRect();
      const pts: { x: number; y: number }[] = [];
      nodes.forEach((el) => {
        const r = el.getBoundingClientRect();
        pts.push({
          x: r.left + r.width / 2 - rect.left,
          y: r.top + r.height / 2 - rect.top,
        });
      });
      const segments: { x1: number; y1: number; x2: number; y2: number }[] = [];
      for (let i = 0; i < pts.length - 1; i++) {
        segments.push({
          x1: pts[i].x,
          y1: pts[i].y,
          x2: pts[i + 1].x,
          y2: pts[i + 1].y,
        });
      }
      setConnectorGeom({ w, h, segments });
    };

    measure();
    requestAnimationFrame(() => {
      requestAnimationFrame(measure);
    });
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section className={styles.experience} id="experience">
      <div className="container">
        <motion.div {...fadeUp} className={styles.header}>
          <span className="accent-tag">Expertise</span>
          <h2 className={styles.title}>Professional Journey</h2>
          <p className={styles.subtitle}>
            A timeline of my professional growth and the companies I&apos;ve helped grow.
          </p>
        </motion.div>

        <div ref={timelineRef} className={styles.timeline}>
          {connectorGeom.segments.length > 0 ? (
            <svg
              className={styles.timelineConnectors}
              width={connectorGeom.w}
              height={connectorGeom.h}
              aria-hidden
            >
              {connectorGeom.segments.map((s, i) => (
                <line
                  key={i}
                  x1={s.x1}
                  y1={s.y1}
                  x2={s.x2}
                  y2={s.y2}
                  className={styles.timelineConnectorLine}
                />
              ))}
            </svg>
          ) : null}
          {experience.map((exp, i) => {
            const staggerEven = i % 2 === 1;
            return (
              <div key={`${exp.company}-${exp.timeline}-${i}`} className={styles.block}>
                <motion.div
                  className={styles.itemRow}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
                >
                  {staggerEven ? (
                    <div className={styles.itemRowCluster}>
                      <div className={styles.rail}>
                        <span className={styles.node} data-timeline-node />
                        <p className={styles.timelineDate}>{exp.timeline}</p>
                      </div>
                      <div className={`${styles.cardCol} ${styles.cardColCluster}`}>
                        <ExperienceCardArticle exp={exp} />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={styles.rail}>
                        <span className={styles.node} data-timeline-node />
                        <p className={styles.timelineDate}>{exp.timeline}</p>
                      </div>
                      <div className={`${styles.cardCol} ${styles.cardColOdd}`}>
                        <ExperienceCardArticle exp={exp} />
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
