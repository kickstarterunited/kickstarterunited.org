import { useState, useEffect } from "preact/hooks";
import "./ThemeToggle.css";

type Theme = "system" | "light" | "dark";
const STORAGE_KEY = "ksru-theme";
const CYCLE: Theme[] = ["system", "light", "dark"];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved && CYCLE.includes(saved)) {
      setTheme(saved);
    }
  }, []);

  function cycle() {
    const next = CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length] ?? "system";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    if (next === "system") {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, next);
    }
  }

  const label =
    theme === "system" ? "System theme" :
    theme === "light" ? "Light theme" : "Dark theme";

  return (
    <button
      type="button"
      class="btn btn--ghost btn--sm theme-toggle"
      onClick={cycle}
      aria-label={label}
      title={label}
    >
      {theme === "system" && (
        <svg class="theme-toggle__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8m-4-4v4" />
        </svg>
      )}
      {theme === "light" && (
        <svg class="theme-toggle__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
      {theme === "dark" && (
        <svg class="theme-toggle__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
