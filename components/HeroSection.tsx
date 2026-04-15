"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { hero } from "../data/portfolio";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} id="about">
      <div className={`container ${styles.layout}`}>
        <div className={styles.mainColumn}>
          <motion.div
            className={styles.textBlock}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          >
            <span className={styles.statusBadge}>
              <span className={styles.greenDot} />
              Open to work
            </span>
            <h1 className={styles.headline}>
              Hi, I&apos;m{" "}
              <span className={styles.name}>{hero.name}!</span>
              <br />
              <span className={styles.faded}>I&apos;m a </span>
              <span className={styles.bold}>{hero.role}</span>
              <span className={styles.faded}> focused on</span>
              <br />
              <span className={styles.accent}>{hero.company}.</span>
            </h1>
          </motion.div>

          <motion.div
            className={styles.bottom}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
          >
            <a href="#contact" className={styles.cta}>
              Get in touch
            </a>
            <a
              href={hero.resumeUrl}
              className={styles.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.25, 1, 0.5, 1] }}
        >
          <Image
            src="/me.png"
            alt={`Pixel art portrait of ${hero.name}`}
            width={500}
            height={500}
            sizes="(max-width: 768px) 100vw, 36vw"
            className={styles.portrait}
            priority
            unoptimized
          />
        </motion.div>
      </div>
    </section>
  );
}
