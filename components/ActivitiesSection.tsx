"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { activities } from "../data/portfolio";
import type { ActivityItem, ExperienceMediaItem } from "../data/portfolio";
import styles from "./ActivitiesSection.module.css";

const CAROUSEL_INTERVAL_MS = 4500;

function MediaPlaceholder({ label, hint = "No image" }: { label?: string; hint?: string }) {
  return (
    <div
      className={styles.mediaPlaceholder}
      role="img"
      aria-label={label?.trim() || hint}
    >
      <svg className={styles.mediaPlaceholderSvg} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.mediaPlaceholderHint}>{hint}</span>
    </div>
  );
}

/** Same 16:9 strip for every card: carousel or placeholder so the grid stays aligned. */
function ActivityMediaTop({ item }: { item: ActivityItem }) {
  const items = item.media;
  if (items && items.length > 0) {
    return <ActivityMediaCarousel items={items} />;
  }
  return (
    <div className={styles.mediaCarousel} aria-hidden>
      <div className={styles.mediaAspect}>
        <MediaPlaceholder label={item.title} hint="No photo" />
      </div>
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function ActivityMediaCarousel({ items }: { items: ExperienceMediaItem[] }) {
  const [index, setIndex] = useState(0);
  const [mediaFailed, setMediaFailed] = useState(false);
  const pausedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const len = items.length;
  const go = useCallback(
    (next: number) => {
      setIndex(((next % len) + len) % len);
    },
    [len],
  );

  useEffect(() => {
    if (len <= 1) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) {
        setIndex((i) => (i + 1) % len);
      }
    }, CAROUSEL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [len]);

  const current = items[index];
  const isVideo = current?.kind === "video";

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !isVideo) return;
    v.muted = true;
    const play = () => {
      v.play().catch(() => {});
    };
    play();
    return () => {
      v.pause();
    };
  }, [index, isVideo, current?.src]);

  useEffect(() => {
    setMediaFailed(false);
  }, [index, current?.src]);

  if (!current) return null;

  const srcOk = Boolean(current.src?.trim());
  const showMedia = srcOk && !mediaFailed;

  return (
    <div
      className={styles.mediaCarousel}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Activity photos"
    >
      <div className={styles.mediaAspect}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${index}-${current.src || "placeholder"}`}
            className={styles.mediaSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          >
            {showMedia && isVideo ? (
              <video
                ref={videoRef}
                className={styles.mediaVideo}
                src={current.src}
                muted
                playsInline
                loop
                preload="metadata"
                onError={() => setMediaFailed(true)}
              />
            ) : showMedia && !isVideo ? (
              <img
                className={styles.mediaImg}
                src={current.src}
                alt={current.alt}
                loading="lazy"
                onError={() => setMediaFailed(true)}
              />
            ) : (
              <MediaPlaceholder label={current.alt} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {len > 1 ? (
        <div className={styles.mediaChrome}>
          <div className={styles.mediaDots} role="tablist" aria-label="Slide">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1} of ${len}`}
                className={`${styles.mediaDot} ${i === index ? styles.mediaDotActive : ""}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function ActivitiesSection() {
  return (
    <section className={styles.section} id="activities">
      <div className="container">
        <motion.div {...fadeUp} className={styles.header}>
          <span className="accent-tag">Beyond work</span>
          <h2 className={styles.title}>Activities</h2>
          <p className={styles.subtitle}>
            Community, learning, and causes I invest time in outside the day job.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {activities.map((item, i) => (
              <motion.article
                key={`${item.title}-${i}`}
                className={`${styles.card} ${styles.cardHasMedia}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 1, 0.5, 1] }}
              >
                <ActivityMediaTop item={item} />
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    {item.emoji ? <span className={styles.emoji}>{item.emoji}</span> : null}
                    {item.period ? <span className={styles.period}>{item.period}</span> : null}
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  {item.organization ? (
                    <p className={styles.org}>{item.organization}</p>
                  ) : null}
                  <p className={styles.cardDesc}>{item.description}</p>
                  {item.link ? (
                    <a
                      href={item.link}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.linkLabel ?? "Learn more"}
                      <span className={styles.linkArrow} aria-hidden>
                        ↗
                      </span>
                    </a>
                  ) : null}
                </div>
              </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
