import { Player } from "./types";

const STORAGE_KEY = "comeon-player";

export function storePlayer(player: Player) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(player));
}

export function getStoredPlayer(): Player | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as Player;
}

export function clearStoredPlayer() {
  sessionStorage.removeItem(STORAGE_KEY);
}
