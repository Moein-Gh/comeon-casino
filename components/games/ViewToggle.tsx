"use client";

import { motion } from "motion/react";

type ViewToggleProps = {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
};

const options = [
  {
    value: "grid",
    label: "Grid view",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" />
      </svg>
    ),
  },
  {
    value: "list",
    label: "List view",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M4 5h16v2H4V5Zm0 6h16v2H4v-2Zm0 6h16v2H4v-2Z" />
      </svg>
    ),
  },
] as const;

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex h-9 shrink-0 items-center gap-0.5 rounded-(--radius) border border-border bg-surface p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-label={option.label}
          aria-pressed={view === option.value}
          onClick={() => onChange(option.value)}
          className="relative flex size-7 items-center justify-center rounded-[calc(var(--radius)-3px)]"
        >
          {view === option.value && (
            <motion.span
              layoutId="view-toggle-active"
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className="absolute inset-0 rounded-[calc(var(--radius)-3px)] bg-accent"
            />
          )}
          <span
            className={`relative z-10 ${
              view === option.value ? "text-white" : "text-muted"
            }`}
          >
            {option.icon}
          </span>
        </button>
      ))}
    </div>
  );
}
