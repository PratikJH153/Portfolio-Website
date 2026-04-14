"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { CSSProperties } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./JourneySection.module.css";
import MediaLightbox from "./MediaLightbox";
import type { LightboxMediaItem } from "./MediaLightbox";

const journeyBlocks = [
  {
    id: 1,
    title: "Chicago Master's",
    description: "Started new journey pursuing master's in Chicago, fresh beginning",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/1.jpg",
    color: "#7C9EB2",
  },
  {
    id: 2,
    title: "Undergraduate Milestone",
    description: "Attended my undergraduate graduation in India virtually from Chicago",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/2.JPG",
    color: "#E8A598",
  },
  {
    id: 3,
    title: "Vibeo Launch",
    description: "Co-founded Vibeo by launching nightlife app with early users",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/3.JPG",
    color: "#C4B8D4",
  },
  {
    id: 4,
    title: "Team Expansion",
    description: "Expanded founding team of four passionate and driven individuals",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/4.jpg",
    color: "#9BC4BC",
  },
  {
    id: 5,
    title: "Diwali in Chicago",
    description: "Celebrated Diwali in Chicago, played chess in traditional attire",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/5.JPG",
    color: "#E8613C",
  },
  {
    id: 6,
    title: "Halloween",
    description: "Celebrated Halloween in Chicago with friends and costumes",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/6.JPG",
    color: "#6B8E9F",
  },
  {
    id: 7,
    title: "Founders Friday",
    description: "Attended Google Founders Friday event, meeting inspiring startup builders",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/7.jpg",
    color: "#D4A574",
  },
  {
    id: 8,
    title: "Marketing Campaign",
    description: "Ran Billie Eilish concert ticket giveaway marketing campaign",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/8.jpg",
    color: "#8B7BA8",
  },
  {
    id: 9,
    title: "Joy District",
    description: "Threw high energy party at Joy District Chicago night",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/9.jpg",
    color: "#5C8F7B",
  },
  {
    id: 10,
    title: "YC Application",
    description: "Applied to Y Combinator from bar club setting, early partner venue",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/10.png",
    color: "#C17F59",
  },
  {
    id: 11,
    title: "New York Trip",
    description: "Traveled to New York, exploring city, meeting people, enjoying experiences",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/11.jpg",
    color: "#6B7C93",
  },
  {
    id: 12,
    title: "Steelcase Research",
    description: "Took MDI course at Institute of Design collaborating with Steelcase research project discussions",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/12.JPG",
    color: "#A89F91",
  },
  {
    id: 13,
    title: "Stakeholders Review",
    description: "Showcased project outcomes directly to Steelcase stakeholders and team",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/13.JPG",
    color: "#7D8E76",
  },
  {
    id: 14,
    title: "ShapeShift Summit",
    description: "Attended and presented at ShapeShift Summit 2025",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/14.jpg",
    color: "#4B5563",
  },
  {
    id: 15,
    title: "IIT Graduation",
    description: "Graduated from Illinois Institute of Technology completing master's degree program",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/15.png",
    color: "#EF4444",
  },
  {
    id: 16,
    title: "Vibeo Pivot",
    description: "Pivoted Vibeo into qualitative research platform focused on insights",
    media: "https://storage.googleapis.com/personal-website-pratikjh/journey/16.jpeg",
    color: "#1A1A1A",
  },
];

/** Stable pseudo-random tilts (deg) so layout doesn’t jitter on re-render */
const TILTS = [-4, 3, -5, 2, -3, 5, -2, 4, -4, 3, -5, 2, -3, 5, -2, 4];

/**
 * Curved dotted path in the gap — start/end stay near the same height (~mid card) so it reads clean.
 */
function CurvedPathConnector({ index }: { index: number }) {
  /** Both anchors hug the horizontal midline (viewBox 0–100). Tiny ±1 so the curve isn’t perfectly flat. */
  const y = 50;
  const midX = 50;
  const bulge = index % 2 === 0 ? -6 : 6;
  const d = `M 0 ${y} Q ${midX} ${y + bulge} 100 ${y}`;

  return (
    <>
      <div className={styles.pathSlot} aria-hidden>
        <svg className={styles.pathSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={d}
            fill="none"
            stroke="var(--border-hover)"
            strokeWidth={2}
            strokeDasharray="3 14"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity={0.72}
          />
        </svg>
      </div>
      <div className={styles.pathSlotMobile} aria-hidden>
        <svg className={styles.pathSvg} viewBox="0 0 56 100" preserveAspectRatio="none">
          <path
            d={index % 2 === 0 ? "M 28 4 Q 32 50 28 96" : "M 28 4 Q 24 50 28 96"}
            fill="none"
            stroke="var(--border-hover)"
            strokeWidth={2}
            strokeDasharray="3 14"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity={0.72}
          />
        </svg>
      </div>
    </>
  );
}

function viewportWidth() {
  return typeof window !== "undefined" ? document.documentElement.clientWidth : 0;
}

export default function JourneySection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRowRef = useRef<HTMLDivElement>(null);
  const [scrollEnd, setScrollEnd] = useState(0);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const lightboxItems: LightboxMediaItem[] = journeyBlocks.map((block) => ({
    src: block.media,
    alt: block.title,
    caption: block.description,
  }));

  const openLightbox = (index: number) => {
    setActiveMediaIndex(index);
    setLightboxOpen(true);
  };
  const [edgePad, setEdgePad] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  useLayoutEffect(() => {
    const row = scrollRowRef.current;
    if (!row) return;

    const updatePad = () => {
      const polaroid = row.querySelector<HTMLElement>("[data-journey-card]");
      const cardW = polaroid?.getBoundingClientRect().width ?? 0;
      const vw = viewportWidth();
      setEdgePad(cardW > 0 ? Math.max(0, (vw - cardW) / 2) : 0);
    };

    updatePad();
    window.addEventListener("resize", updatePad);
    const ro = new ResizeObserver(updatePad);
    ro.observe(row);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updatePad);
    };
  }, []);

  useLayoutEffect(() => {
    const row = scrollRowRef.current;
    if (!row) return;

    const measureScroll = () => {
      const vw = viewportWidth();
      const first = row.querySelector<HTMLElement>("[data-journey-card]");
      const last = row.querySelector<HTMLElement>("[data-journey-card-last]");
      if (!first || !last) {
        setScrollEnd(Math.max(0, row.scrollWidth - vw));
        return;
      }

      const a = first.getBoundingClientRect();
      const b = last.getBoundingClientRect();
      /** Horizontal distance between card centers (stable under row translate). */
      const span = b.left + b.width / 2 - (a.left + a.width / 2);
      setScrollEnd(Math.max(0, span));
    };

    measureScroll();
    const ro = new ResizeObserver(measureScroll);
    ro.observe(row);
    window.addEventListener("resize", measureScroll);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureScroll);
    };
  }, [edgePad]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollEnd]);

  const n = journeyBlocks.length;

  return (
    <section ref={targetRef} className={styles.journeyContainer} id="journey">
      <div className={styles.stickyWrapper}>
        <div className={styles.header}>
          <div className="container">
            <span className="accent-tag">Memories</span>
            <h2 className={styles.titleCursive}>My Journey</h2>
          </div>
        </div>

        <motion.div
          ref={scrollRowRef}
          style={{
            x,
            paddingLeft: edgePad,
            paddingRight: edgePad,
          }}
          className={styles.horizontalScroll}
        >
          {journeyBlocks.map((block, i) => (
            <div key={block.id} className={styles.cardGroup}>
              <div
                className={styles.polaroidWrap}
                style={{ "--tilt": `${TILTS[i % TILTS.length]}deg` } as CSSProperties}
                onClick={() => openLightbox(i)}
              >
                <article
                  className={styles.polaroid}
                  data-journey-card={i === 0 ? true : undefined}
                  data-journey-card-last={i === n - 1 ? true : undefined}
                >
                  <div className={styles.polaroidPhoto}>
                    {block.media ? (
                      <Image
                        src={block.media}
                        alt={block.title}
                        fill
                        className={styles.photoImg}
                        sizes="(max-width: 768px) 360px, 400px"
                      />
                    ) : (
                      <div
                        className={styles.photoGradient}
                        style={{
                          background: `linear-gradient(145deg, ${block.color}33 0%, ${block.color}66 48%, ${block.color} 100%)`,
                        }}
                      />
                    )}
                    <span className={styles.polaroidNumber} aria-hidden>
                      {String(block.id).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={styles.polaroidCaption}>
                    <h3 className={styles.polaroidTitle}>{block.title}</h3>
                    <p className={styles.polaroidDesc}>{block.description}</p>
                  </div>
                </article>
              </div>
              {i < n - 1 ? <CurvedPathConnector index={i} /> : null}
            </div>
          ))}
        </motion.div>

        <p className={styles.footerNote}>
          Each frame is a chapter — the full picture is still developing.
        </p>

        <MediaLightbox
          items={lightboxItems}
          isOpen={lightboxOpen}
          initialIndex={activeMediaIndex}
          onClose={() => setLightboxOpen(false)}
        />
      </div>
    </section>
  );
}
