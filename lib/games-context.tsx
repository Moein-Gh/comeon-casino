"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCategories, getGames } from "./api";
import { Category, Game } from "./types";

type GamesDataValue = {
  games: Game[];
  categories: Category[];
  loading: boolean;
  loadError: boolean;
};

const GamesDataContext = createContext<GamesDataValue | null>(null);

export function GamesProvider({ children }: { children: React.ReactNode }) {
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all([getGames(), getCategories()])
      .then(([gamesResult, categoriesResult]) => {
        if (cancelled) return;
        setGames(gamesResult);
        setCategories(categoriesResult);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <GamesDataContext.Provider value={{ games, categories, loading, loadError }}>
      {children}
    </GamesDataContext.Provider>
  );
}

export function useGamesData() {
  const context = useContext(GamesDataContext);
  if (!context) {
    throw new Error("useGamesData must be used within a GamesProvider");
  }
  return context;
}
