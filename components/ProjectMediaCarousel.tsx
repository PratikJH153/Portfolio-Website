"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ExperienceMediaItem } from "../data/portfolio";
import styles from "./ProjectMediaCarousel.module.css";

const CAROUSEL_INTERVAL_MS = 8000;

export function MediaPlaceholder({ label, hint = "Project Blueprint" }: { label?: string; hint?: string }) {
  return (
    <div
      className={`${styles.mediaPlaceholder} ${styles.mediaPlaceholderBlueprint}`}
      role="img"
      aria-label={label?.trim() || hint}
    >
      <svg className={styles.mediaPlaceholderSvg} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v10M9 3v18m0 0h10a2 2 0 002-2M9 21H5a2 2 0 01-2-2v-4m0-6h6m0 6h6m-6 0v-6"
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

interface ProjectMediaCarouselProps {
  items: ExperienceMediaItem[];
  className?: string;
  aspectRatio?: string;
  imageObjectFit?: "cover" | "contain";
  autoPlay?: boolean;
  showArrows?: boolean;
}

export default function ProjectMediaCarousel({ 
  items, 
  className, 
  aspectRatio,
  imageObjectFit = "cover",
  autoPlay = true,
  showArrows = true
}: ProjectMediaCarouselProps) {
  const [index, setIndex] = useState(0);
  const [mediaFailed, setMediaFailed] = useState(false);
  const pausedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const len = items.length;
  const go = useCallback(
    (next: number) => {
      setMediaFailed(false);
      setIndex(((next % len) + len) % len);
    },
    [len],
  );

  useEffect(() => {
    if (!autoPlay || len <= 1) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) {
        setMediaFailed(false);
        setIndex((i) => (i + 1) % len);
      }
    }, CAROUSEL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [len, autoPlay]);

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


  if (!current) {
    return (
      <div className={`${styles.mediaCarousel} ${className || ""}`}>
        <div className={styles.mediaAspect} style={aspectRatio ? { aspectRatio } : undefined}>
          <MediaPlaceholder />
        </div>
      </div>
    );
  }

  const srcOk = Boolean(current.src?.trim());
  const showMedia = srcOk && !mediaFailed;

  return (
    <div
      className={`${styles.mediaCarousel} ${className || ""}`}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Project media"
    >
      <div className={styles.mediaAspect} style={aspectRatio ? { aspectRatio } : undefined}>
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
                onCanPlay={() => {
                  if (videoRef.current) videoRef.current.play().catch(() => {});
                }}
                onError={() => setMediaFailed(true)}
              />
            ) : showMedia && !isVideo ? (
              <Image
                className={styles.mediaImg}
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
                style={{ objectFit: imageObjectFit, objectPosition: 'top' }}
                onError={() => setMediaFailed(true)}
              />
            ) : (
              <MediaPlaceholder label={current.alt} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {len > 1 ? (
        <>
          {showArrows && (
            <div className={styles.mediaArrows}>
              <button
                className={`${styles.mediaArrow} ${styles.mediaArrowPrev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  go(index - 1);
                }}
                aria-label="Previous image"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className={`${styles.mediaArrow} ${styles.mediaArrowNext}`}
                onClick={(e) => {
                  e.stopPropagation();
                  go(index + 1);
                }}
                aria-label="Next image"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    go(i);
                  }}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
