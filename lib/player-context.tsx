"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { logout as apiLogout } from "./api";
import { Player } from "./types";
import {
  clearStoredSession,
  getStoredSession,
  storeSession,
  StoredSession,
} from "./player-storage";

type PlayerContextValue = {
  player: Player | null;
  // False until the sessionStorage read on mount has completed; lets
  // consumers (like the games auth guard) avoid redirecting on the very
  // first client render, before we know whether a session exists.
  hydrated: boolean;
  login: (username: string, player: Player) => void;
  logout: () => Promise<void>;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<StoredSession | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- bridges SSR (no sessionStorage) with the real client-only value
    setSession(getStoredSession());
    setHydrated(true);
  }, []);

  function login(username: string, player: Player) {
    const next = { username, player };
    storeSession(next);
    setSession(next);
  }

  async function logout() {
    if (session) {
      await apiLogout(session.username).catch(() => {});
    }
    clearStoredSession();
    setSession(null);
  }

  return (
    <PlayerContext.Provider
      value={{ player: session?.player ?? null, hydrated, login, logout }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
