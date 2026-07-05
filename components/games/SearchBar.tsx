"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
};

const searchIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4 shrink-0">
    <circle cx="11" cy="11" r="7" />
    <path strokeLinecap="round" d="m20 20-3-3" />
  </svg>
);

const closeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4 shrink-0">
    <path strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export function SearchBar({
  value,
  onChange,
  placeholder = "Search games…",
  debounceMs = 250,
}: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => onChange(draft), debounceMs);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft, debounceMs]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        !draft &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [draft]);

  function closeSearch() {
    setDraft("");
    setOpen(false);
  }

  return (
    <motion.div
      ref={containerRef}
      initial={false}
      animate={{ width: open ? 240 : 36 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="flex h-9 shrink-0 items-center overflow-hidden rounded-(--radius) border border-border bg-surface"
    >
      <button
        type="button"
        aria-label={open ? "Close search" : "Open search"}
        onClick={() => (open ? closeSearch() : setOpen(true))}
        className="flex size-9 shrink-0 items-center justify-center text-muted transition-colors hover:text-foreground"
      >
        {open ? closeIcon : searchIcon}
      </button>
      <input
        ref={inputRef}
        type="search"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder={placeholder}
        aria-label="Search games"
        tabIndex={open ? 0 : -1}
        className={`min-w-0 flex-1 bg-transparent pr-3 text-sm text-foreground placeholder:text-muted focus:outline-none transition-opacity duration-150 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.div>
  );
}
