"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Category, Game } from "@/lib/types";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { GameCard } from "./GameCard";
import { ViewToggle } from "./ViewToggle";

type GamesBrowserProps = {
  games: Game[];
  categories: Category[];
};

export function GamesBrowser({ games, categories }: GamesBrowserProps) {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredGames = useMemo(() => {
    const query = search.trim().toLowerCase();
    return games.filter((game) => {
      const matchesSearch = !query || game.name.toLowerCase().includes(query);
      const matchesCategory =
        categoryId === null || game.categoryIds.includes(categoryId);
      return matchesSearch && matchesCategory;
    });
  }, [games, search, categoryId]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilter
          categories={categories}
          activeId={categoryId}
          onChange={setCategoryId}
        />
        <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-end">
          <SearchBar value={search} onChange={setSearch} />
          <ViewToggle view={view} onChange={setView} />
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <p className="py-16 text-center text-muted">
          No games match your search.
        </p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={
              view === "grid"
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "flex flex-col gap-3"
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game) => (
                <motion.div
                  key={game.code}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <GameCard game={game} categories={categories} layout={view} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
