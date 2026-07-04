import { Player } from "./types";

const STORAGE_KEY = "comeon-session";

export type StoredSession = {
  username: string;
  player: Player;
};

export function storeSession(session: StoredSession) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function getStoredSession(): StoredSession | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as StoredSession;
}

export function clearStoredSession() {
  sessionStorage.removeItem(STORAGE_KEY);
}
