import { CategoriesResponseSchema, GamesResponseSchema } from "@/lib/types";
import { GamesProvider } from "@/lib/games-context";
import { GamesGuard } from "@/components/layout/GamesGuard";

const API_BASE = process.env.MOCK_API_URL ?? "http://localhost:3000";

async function getGames() {
  const res = await fetch(`${API_BASE}/games`, { cache: "no-store" });
  return GamesResponseSchema.parse(await res.json());
}

async function getCategories() {
  const res = await fetch(`${API_BASE}/categories`, { cache: "no-store" });
  return CategoriesResponseSchema.parse(await res.json());
}

export default async function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let games: Awaited<ReturnType<typeof getGames>> = [];
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let loadError = false;

  try {
    [games, categories] = await Promise.all([getGames(), getCategories()]);
  } catch {
    loadError = true;
  }

  return (
    <GamesGuard>
      <GamesProvider games={games} categories={categories} loadError={loadError}>
        {children}
      </GamesProvider>
    </GamesGuard>
  );
}
