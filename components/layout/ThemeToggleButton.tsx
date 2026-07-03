"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const sunIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    className="size-5"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-6.66 1.41-1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M4.93 4.93 6.34 6.34" />
  </svg>
);

const moonIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1Z" />
  </svg>
);

export function ThemeToggleButton() {
  // Starts false to match the server-rendered markup; synced to the real
  // (script-set) DOM class post-mount so hydration never has to compare
  // against browser-only state.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- bridges SSR (no DOM) with the real class the theme-init script already set
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={toggleTheme}
      className="relative flex size-10 items-center justify-center overflow-hidden rounded-full border border-border bg-surface text-muted transition-colors hover:text-foreground"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {isDark ? moonIcon : sunIcon}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
