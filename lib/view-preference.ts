const STORAGE_KEY = "comeon-games-view";

export type GamesView = "grid" | "list";

export function getStoredView(): GamesView | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw === "grid" || raw === "list" ? raw : null;
}

export function storeView(view: GamesView) {
  localStorage.setItem(STORAGE_KEY, view);
}
