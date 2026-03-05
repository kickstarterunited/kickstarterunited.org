import { useState, useEffect } from "preact/hooks";
import "./ThemeToggle.css";

type Theme = "system" | "light" | "dark";
const STORAGE_KEY = "ksru-theme";
const STAR_STEPS = 12;

/** Resolve the effective theme from the OS preference. */
function systemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Build a rounded star polygon centered at (cx, cy) with optional rotation.
 * Uses quadratic bezier approximation at each vertex for smooth tips.
 */
function starPolygon(
  cx: number,
  cy: number,
  outerR: number,
  rotation = 0,
): string {
  const innerR = outerR * 0.38;
  const n = 5;
  const totalVerts = n * 2;
  const angleStep = Math.PI / n;
  const start = -Math.PI / 2 + rotation;
  const arcPts = 3;
  const rnd = 0.08;

  const points: string[] = [];

  for (let i = 0; i < totalVerts; i++) {
    const angle = start + i * angleStep;
    const r = i % 2 === 0 ? outerR : innerR;

    const prevAngle = start + ((i - 1 + totalVerts) % totalVerts) * angleStep;
    const nextAngle = start + ((i + 1) % totalVerts) * angleStep;
    const prevR = (i - 1 + totalVerts) % 2 === 0 ? outerR : innerR;
    const nextR = (i + 1) % 2 === 0 ? outerR : innerR;

    const vx = cx + r * Math.cos(angle);
    const vy = cy + r * Math.sin(angle);
    const pvx = cx + prevR * Math.cos(prevAngle);
    const pvy = cy + prevR * Math.sin(prevAngle);
    const nvx = cx + nextR * Math.cos(nextAngle);
    const nvy = cy + nextR * Math.sin(nextAngle);

    const sx = vx + (pvx - vx) * rnd;
    const sy = vy + (pvy - vy) * rnd;
    const ex = vx + (nvx - vx) * rnd;
    const ey = vy + (nvy - vy) * rnd;

    for (let j = 0; j <= arcPts; j++) {
      const t = j / arcPts;
      const u = 1 - t;
      const bx = u * u * sx + 2 * u * t * vx + t * t * ex;
      const by = u * u * sy + 2 * u * t * vy + t * t * ey;
      points.push(`${bx}px ${by}px`);
    }
  }

  return `polygon(${points.join(", ")})`;
}

function applyTheme(next: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem(STORAGE_KEY, next);
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<Theme>("system");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === "light" || saved === "dark") {
      setMode(saved);
    }
  }, []);

  const effective = mode === "system" ? systemTheme() : mode;

  function cycle(e: MouseEvent) {
    const next: "light" | "dark" = effective === "dark" ? "light" : "dark";

    if (!("startViewTransition" in document)) {
      setMode(next);
      applyTheme(next);
      return;
    }

    const cx = e.clientX;
    const cy = e.clientY;
    // Use 200vmax equivalent to guarantee full coverage even with rotation
    const vmax = Math.max(window.innerWidth, window.innerHeight);
    const maxR = vmax * 2;

    const root = document.documentElement;
    root.classList.add("theme-star");

    // Generate intermediate steps with progressive rotation (2 full turns)
    for (let i = 0; i <= STAR_STEPS; i++) {
      const t = i / STAR_STEPS;
      const easedR = t * t * maxR; // quadratic ease-in for radius
      const rotation = t * Math.PI; // half turn (180deg)
      root.style.setProperty(`--_star-${i}`, starPolygon(cx, cy, easedR, rotation));
    }

    const transition = (document as any).startViewTransition(() => {
      setMode(next);
      applyTheme(next);
    });

    transition.finished.then(() => {
      root.classList.remove("theme-star");
      for (let i = 0; i <= STAR_STEPS; i++) {
        root.style.removeProperty(`--_star-${i}`);
      }
    });
  }

  const label = effective === "dark" ? "Dark theme" : "Light theme";

  return (
    <button
      type="button"
      class="btn btn--ghost btn--sm theme-toggle"
      onClick={cycle}
      aria-label={label}
      title={label}
    >
      {effective === "light" && (
        <svg
          class="theme-toggle__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
      {effective === "dark" && (
        <svg
          class="theme-toggle__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
