"use client";

import { useEffect, useRef } from "react";
import styles from "./PixelCursor.module.css";

const BURST_MS = 480;
const BURST_RAYS = 8;
const BURST_MAX_TRAVEL = 22;
const BURST_STROKE_FALLBACK = "#1a1a1a";

type Burst = { cx: number; cy: number; t: number };

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export default function PixelCursor() {
  const burstCanvasRef = useRef<HTMLCanvasElement>(null);
  const burstsRef = useRef<Burst[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const burstCanvas = burstCanvasRef.current;
    if (!burstCanvas) return;
    const burstCtx = burstCanvas.getContext("2d");
    if (!burstCtx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      burstCanvas.width = w * dpr;
      burstCanvas.height = h * dpr;
      burstCanvas.style.width = `${w}px`;
      burstCanvas.style.height = `${h}px`;
      burstCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      burstsRef.current.push({
        cx: e.clientX,
        cy: e.clientY,
        t: performance.now(),
      });
      const cap = 8;
      if (burstsRef.current.length > cap) {
        burstsRef.current = burstsRef.current.slice(-cap);
      }
    };

    const draw = () => {
      const now = performance.now();

      burstCtx.clearRect(0, 0, w, h);
      burstsRef.current = burstsRef.current.filter((b) => now - b.t < BURST_MS);
      if (burstsRef.current.length === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const stroke =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--text-primary")
          .trim() || BURST_STROKE_FALLBACK;

      for (const b of burstsRef.current) {
        const elapsed = now - b.t;
        const T = Math.min(1, elapsed / BURST_MS);
        const travel = easeOutCubic(T) * BURST_MAX_TRAVEL;
        const segLen = Math.max(
          1.5,
          9 * Math.sin(T * Math.PI) * (1 - T * 0.18),
        );
        const opacity = (1 - T) * 0.92;

        burstCtx.save();
        burstCtx.lineCap = "round";
        burstCtx.lineJoin = "round";
        burstCtx.globalAlpha = opacity;
        burstCtx.strokeStyle = stroke;
        burstCtx.lineWidth = 1.65;

        for (let i = 0; i < BURST_RAYS; i++) {
          const ang = (Math.PI / 4) * i;
          let innerR = travel - segLen * 0.5;
          const outerR = travel + segLen * 0.5;
          innerR = Math.max(0, innerR);
          if (outerR <= innerR + 0.5) continue;

          const x1 = b.cx + Math.cos(ang) * innerR;
          const y1 = b.cy + Math.sin(ang) * innerR;
          const x2 = b.cx + Math.cos(ang) * outerR;
          const y2 = b.cy + Math.sin(ang) * outerR;

          burstCtx.beginPath();
          burstCtx.moveTo(x1, y1);
          burstCtx.lineTo(x2, y2);
          burstCtx.stroke();
        }
        burstCtx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onPointerDown);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={burstCanvasRef} className={styles.burst} aria-hidden />;
}
