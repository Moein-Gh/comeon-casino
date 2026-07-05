"use client";

import { ViewTransition, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Category, Game } from "@/lib/types";

type GameCardProps = {
  game: Game;
  categories: Category[];
  layout?: "grid" | "list";
};

const playIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const chevronIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
  </svg>
);

export function GameCard({ game, categories, layout = "grid" }: GameCardProps) {
  const [expanded, setExpanded] = useState(false);
  const gameCategories = categories.filter(
    (category) => category.id !== 0 && game.categoryIds.includes(category.id),
  );

  const categoryTags = gameCategories.length > 0 && (
    <div className="flex flex-wrap gap-1.5">
      {gameCategories.map((category) => (
        <span
          key={category.id}
          className="rounded-(--radius) bg-background px-2 py-0.5 text-xs font-medium text-muted"
        >
          {category.name}
        </span>
      ))}
    </div>
  );

  if (layout === "list") {
    return (
      <div className="rounded-(--radius) border border-border bg-surface shadow-md">
        <div className="flex items-center gap-3 p-3">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="flex min-w-0 flex-1 items-center gap-3 text-left"
          >
            <div className="relative size-14 shrink-0 overflow-hidden rounded-(--radius) bg-surface-sunken">
              <ViewTransition name={`game-icon-${game.code}`} share="morph">
                <Image
                  src={`/${game.icon}`}
                  alt={game.name}
                  fill
                  unoptimized
                  className="object-contain p-2"
                />
              </ViewTransition>
            </div>
            <div className="min-w-0 flex-1">
              <ViewTransition name={`game-title-${game.code}`} share="morph">
                <h3 className="truncate font-semibold leading-tight tracking-tight">
                  {game.name}
                </h3>
              </ViewTransition>
              <div className="mt-1">{categoryTags}</div>
            </div>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.15 }}
              className="shrink-0 text-muted"
            >
              {chevronIcon}
            </motion.span>
          </button>
          <Link
            href={`/games/${game.code}`}
            aria-label={`Play ${game.name}`}
            className="flex size-9 shrink-0 items-center justify-center rounded-(--radius) bg-accent text-white transition-colors hover:bg-accent-hover"
          >
            {playIcon}
          </Link>
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="px-3 pb-3 pl-17 text-sm leading-relaxed text-muted">
                {game.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-(--radius) border border-border bg-surface shadow-md">
      <Link
        href={`/games/${game.code}`}
        aria-label={`Play ${game.name}`}
        className="block"
      >
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative aspect-4/3 w-full overflow-hidden bg-surface-sunken"
        >
          <ViewTransition name={`game-icon-${game.code}`} share="morph">
            <Image
              src={`/${game.icon}`}
              alt={game.name}
              fill
              unoptimized
              className="object-contain p-6"
            />
          </ViewTransition>
        </motion.div>
      </Link>
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <ViewTransition name={`game-title-${game.code}`} share="morph">
          <h3 className="font-semibold leading-tight tracking-tight">
            {game.name}
          </h3>
        </ViewTransition>
        {categoryTags}
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {game.description}
        </p>
        <div className="mt-auto flex justify-end pt-2">
          <Link
            href={`/games/${game.code}`}
            className="flex items-center gap-1.5 rounded-(--radius) bg-accent px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            {playIcon}
            Play
          </Link>
        </div>
      </div>
    </div>
  );
}
