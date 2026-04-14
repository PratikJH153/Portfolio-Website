"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./MediaLightbox.module.css";

export interface LightboxMediaItem {
  src: string;
  alt: string;
  kind?: "image" | "video";
  caption?: string;
}

interface MediaLightboxProps {
  items: LightboxMediaItem[];
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
}

export default function MediaLightbox({
  items,
  isOpen,
  initialIndex,
  onClose,
}: MediaLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  /** After metadata/load: wide stage (16:9) vs tall stage (9:16). Unknown defaults to landscape. */
  const [orientation, setOrientation] = useState<"landscape" | "portrait">("landscape");

  const current = items[index];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setOrientation("landscape");
  }, [isOpen, index, current?.src]);

  useEffect(() => {
    if (isOpen) {
      setIndex(Math.min(Math.max(0, initialIndex), items.length - 1));
    }
  }, [isOpen, initialIndex, items.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex((i) => (i > 0 ? i - 1 : items.length - 1));
      if (e.key === "ArrowRight") setIndex((i) => (i < items.length - 1 ? i + 1 : 0));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, items.length]);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => {
        const next = i + dir;
        if (next < 0) return items.length - 1;
        if (next >= items.length) return 0;
        return next;
      });
    },
    [items.length],
  );

  const applyDimensions = useCallback((w: number, h: number) => {
    if (w <= 0 || h <= 0) return;
    setOrientation(w >= h ? "landscape" : "portrait");
  }, []);

  if (!mounted) return null;

  const node = (
    <AnimatePresence>
      {isOpen && current ? (
        <div className={styles.lbOverlay}>
          <motion.button
            type="button"
            className={styles.lbBackdrop}
            aria-label="Close gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.lbModal}
            role="dialog"
            aria-modal="true"
            aria-label="Media gallery"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`${styles.lbView} ${
                orientation === "portrait" ? styles.lbViewPortrait : styles.lbViewLandscape
              }`}
            >
              <div className={styles.lbMedia}>
                {current.kind === "video" ? (
                  <video
                    key={current.src}
                    className={styles.lbVideo}
                    src={current.src}
                    controls
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={(e) => {
                      const v = e.currentTarget;
                      applyDimensions(v.videoWidth, v.videoHeight);
                    }}
                  />
                ) : (
                  <img
                    className={styles.lbImg}
                    src={current.src}
                    alt={current.alt}
                    onLoad={(e) => {
                      const el = e.currentTarget;
                      applyDimensions(el.naturalWidth, el.naturalHeight);
                    }}
                  />
                )}
              </div>

              <div className={styles.lbTopBar}>
                <span className={styles.lbCounter}>
                  {index + 1} / {items.length}
                </span>
                <button type="button" className={styles.lbClose} onClick={onClose} aria-label="Close">
                  ✕
                </button>
              </div>

              {items.length > 1 ? (
                <>
                  <button
                    type="button"
                    className={`${styles.lbArrow} ${styles.lbArrowPrev}`}
                    aria-label="Previous"
                    onClick={() => go(-1)}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className={`${styles.lbArrow} ${styles.lbArrowNext}`}
                    aria-label="Next"
                    onClick={() => go(1)}
                  >
                    ›
                  </button>
                </>
              ) : null}

              {current.caption || items.length > 1 ? (
                <div className={styles.lbBottom}>
                  {current.caption ? <p className={styles.lbCaption}>{current.caption}</p> : null}
                  {items.length > 1 ? (
                    <div className={styles.lbDots}>
                      {items.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`${styles.lbDot} ${i === index ? styles.lbDotActive : ""}`}
                          aria-label={`Go to slide ${i + 1}`}
                          aria-current={i === index ? "true" : undefined}
                          onClick={() => setIndex(i)}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );

  return createPortal(node, document.body);
}
