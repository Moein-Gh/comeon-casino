"use client";

import { createContext, useContext } from "react";
import { Category, Game } from "./types";

type GamesDataValue = {
  games: Game[];
  categories: Category[];
  loadError: boolean;
};

const GamesDataContext = createContext<GamesDataValue | null>(null);

export function GamesProvider({
  games,
  categories,
  loadError,
  children,
}: GamesDataValue & { children: React.ReactNode }) {
  return (
    <GamesDataContext.Provider value={{ games, categories, loadError }}>
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
