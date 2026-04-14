"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { skills, process, hero, education } from "../data/portfolio";
import styles from "./BentoGrid.module.css";
import { useLayoutEffect, useRef, useState } from "react";

function EduDescriptionBlock({
  lines,
  onExpandedChange,
}: {
  lines: string[];
  onExpandedChange?: (expanded: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef(expanded);
  const [showToggle, setShowToggle] = useState(false);
  expandedRef.current = expanded;

  useLayoutEffect(() => {
    const wrap = contentRef.current;
    if (!wrap) return;

    const lineHeightPx = (root: HTMLElement): number => {
      const firstP = root.querySelector("p");
      if (!firstP) return 22;
      const cs = getComputedStyle(firstP);
      const lhRaw = cs.lineHeight;
      if (lhRaw === "normal") {
        const fs = parseFloat(cs.fontSize);
        return Number.isFinite(fs) && fs > 0 ? fs * 1.55 : 22;
      }
      const n = parseFloat(lhRaw);
      return Number.isFinite(n) && n > 0 ? n : 22;
    };

    const applyCollapsedClamp = (root: HTMLElement) => {
      const lh = lineHeightPx(root);
      root.style.overflow = "hidden";
      root.style.maxHeight = `${Math.max(1, Math.floor(lh * 3))}px`;
      void root.offsetHeight;
    };

    const measure = () => {
      const root = contentRef.current;
      if (!root) return;

      if (expandedRef.current) {
        root.style.maxHeight = "";
        root.style.overflow = "";
        setShowToggle(true);
        return;
      }

      // Unclamp first so scrollHeight reflects full content (reliable vs overflow:hidden quirks)
      root.style.overflow = "visible";
      root.style.maxHeight = "none";
      void root.offsetHeight;
      const fullHeight = root.scrollHeight;

      applyCollapsedClamp(root);
      void root.offsetHeight;
      setShowToggle(fullHeight > root.clientHeight + 2);
    };

    measure();

    let raf = 0;
    raf = requestAnimationFrame(() => measure());

    const ro = new ResizeObserver(() => measure());
    ro.observe(wrap);
    for (const el of wrap.querySelectorAll(":scope > p")) {
      ro.observe(el);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.style.maxHeight = "";
      wrap.style.overflow = "";
    };
  }, [expanded, lines]);

  const showFade = !expanded && showToggle;

  return (
    <div className={styles.eduDescription}>
      <p className={styles.eduDescriptionLabel}>Description</p>
      <div
        ref={contentRef}
        className={`${styles.eduDescriptionClampWrap}${showFade ? ` ${styles.eduDescriptionMaskFade}` : ""}`}
      >
        {lines.map((line, j) => (
          <p key={j} className={styles.eduDescPoint}>
            <strong className={styles.eduDescNum}>{j + 1}.</strong> {line}
          </p>
        ))}
      </div>
      {(expanded || showToggle) && (
        <div className={styles.eduDescToggleRow}>
          <button
            type="button"
            className={styles.eduDescToggle}
            onClick={() => {
              setExpanded((v) => {
                const next = !v;
                onExpandedChange?.(next);
                return next;
              });
            }}
            aria-expanded={expanded}
          >
            {expanded ? "Less" : "More"}
          </button>
        </div>
      )}
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
};

export default function BentoGrid() {
  const [activeStep, setActiveStep] = useState(0);
  const cardEduRef = useRef<HTMLDivElement>(null);
  const [sidebarLockPx, setSidebarLockPx] = useState<number | null>(null);
  const [descExpanded, setDescExpanded] = useState<Record<number, boolean>>({});

  /** Read inside ResizeObserver — avoids stale closure overwriting the lock when “More” expands the left card. */
  const anyDescExpandedRef = useRef(false);
  anyDescExpandedRef.current = education.some((_, i) => descExpanded[i] === true);

  useLayoutEffect(() => {
    const el = cardEduRef.current;
    if (!el) return;

    const syncSidebar = () => {
      if (anyDescExpandedRef.current) return;
      // Native open state — works even if ResizeObserver runs before toggle handlers fire
      if (el.querySelector("details[open]")) return;
      setSidebarLockPx(el.offsetHeight);
    };

    syncSidebar();
    const ro = new ResizeObserver(syncSidebar);
    ro.observe(el);
    return () => ro.disconnect();
  }, [education]);

  return (
    <section className={styles.grid} id="overview">
      <div className="container">
        <div className={styles.bentoGrid}>


          {/* ── Skills Mini Card ── */}
          <motion.div className={`${styles.card} ${styles.cardSkills}`} {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
          >
            <p className={styles.cardLabel}>Tech Stack</p>
            <div className={styles.skillsWrap}>
              {skills.map((cat) => (
                <div key={cat.name} className={styles.skillGroup}>
                  <p className={styles.skillGroupName}>{cat.name}</p>
                  <div className={styles.skillTags}>
                    {cat.skills.map((s) => (
                      <span key={s} className={styles.skillTag}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Education Card ── */}
          <motion.div
            ref={cardEduRef}
            className={`${styles.card} ${styles.cardEdu}`}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
          >
            <p className={styles.cardLabel}>Education</p>
            <div className={styles.eduList}>
              {education.map((e, i) => (
                <div key={i} className={styles.eduItem}>
                  <div className={styles.eduHeader}>
                    <div className={styles.eduLogoWrap}>
                      <Image
                        src={e.logo}
                        alt={e.logoAlt}
                        width={56}
                        height={56}
                        className={styles.eduLogo}
                        sizes="56px"
                      />
                    </div>
                    <div className={styles.eduHeaderText}>
                      <p className={styles.eduSchool}>{e.school}</p>
                      <p className={styles.eduDegree}>{e.degree}</p>
                      <p className={styles.eduTimeline}>{e.timeline}</p>
                      {e.grade && (
                        <p className={styles.eduGrade}>Grade: {e.grade}</p>
                      )}
                    </div>
                  </div>

                  {e.description && e.description.length > 0 && (
                    <EduDescriptionBlock
                      lines={e.description}
                      onExpandedChange={(exp) =>
                        setDescExpanded((prev) => ({ ...prev, [i]: exp }))
                      }
                    />
                  )}

                  {e.activities && e.activities.length > 0 && (
                    <details className={styles.eduActivitiesDetails}>
                      <summary className={styles.eduActivitiesSummary}>
                        Activities and societies
                        <span className={styles.eduActivitiesHint} aria-hidden>
                          {e.activities.length} items
                        </span>
                      </summary>
                      <div className={styles.eduActivitiesBody}>
                        {e.activities.map((para, j) => (
                          <p key={j} className={styles.eduActivityPara}>
                            {para}
                          </p>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right column: height only updates when education is fully “collapsed” (no More, no open activities) ── */}
          <div
            className={styles.bentoRightColumn}
            style={
              sidebarLockPx != null
                ? {
                    height: sidebarLockPx,
                    minHeight: sidebarLockPx,
                    maxHeight: sidebarLockPx,
                  }
                : undefined
            }
          >
            <motion.div
              className={`${styles.card} ${styles.cardLocation} ${styles.cardLocationFill}`}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.08 }}
            >
              <p className={styles.cardLabel}>Based in</p>
              <div className={`${styles.locationContent} ${styles.locationContentFill}`}>
                <div className={`${styles.locationMapPlaceholder} ${styles.locationMapGrow}`}>
                  <Image
                    src="/sanfrancisco.jpg"
                    alt=""
                    fill
                    className={styles.mapImage}
                    sizes="(max-width: 900px) 100vw, 420px"
                    priority={false}
                  />
                  <div className={styles.mapPin} aria-hidden>
                    📍
                  </div>
                </div>
                <p className={styles.locationCity}>{hero.location}</p>
              </div>
            </motion.div>

            <motion.div
              className={`${styles.card} ${styles.cardProcess} ${styles.cardProcessFill}`}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.12 }}
            >
              <p className={styles.cardLabel}>How I work</p>
              <div className={styles.processBodyFill}>
                <div className={styles.processContent}>
                  <h3 className={styles.processTitle}>
                    {process[activeStep].number} {process[activeStep].title}
                  </h3>
                  <p className={styles.processDesc}>{process[activeStep].description}</p>
                </div>
                <div className={styles.processTabs}>
                  {process.map((step, i) => (
                    <button
                      key={i}
                      className={`${styles.processTab} ${i === activeStep ? styles.processTabActive : ""}`}
                      onClick={() => setActiveStep(i)}
                    >
                      Step {step.number}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
