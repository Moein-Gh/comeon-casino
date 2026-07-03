"use client";

import { motion } from "motion/react";
import { Category } from "@/lib/types";

type CategoryFilterProps = {
  categories: Category[];
  activeId: number | null;
  onChange: (id: number | null) => void;
};

export function CategoryFilter({
  categories,
  activeId,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
      {categories.map((category) => {
        const isActive = activeId === category.id;
        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(isActive ? null : category.id)}
            className="relative shrink-0 rounded-(--radius) px-4 py-1.5 text-sm font-medium"
          >
            {isActive && (
              <motion.span
                layoutId="category-filter-active"
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="absolute inset-0 rounded-(--radius) bg-accent"
              />
            )}
            <span
              className={`relative z-10 transition-colors ${
                isActive ? "text-white" : "text-muted hover:text-foreground"
              }`}
            >
              {category.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
