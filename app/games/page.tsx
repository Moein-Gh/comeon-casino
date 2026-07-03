import { CategoriesResponseSchema, GamesResponseSchema } from "@/lib/types";
import { GamesBrowser } from "@/components/games/GamesBrowser";
import { ProfileMenu } from "@/components/layout/ProfileMenu";
import { ThemeToggleButton } from "@/components/layout/ThemeToggleButton";

const API_BASE = process.env.MOCK_API_URL ?? "http://localhost:3000";

async function getGames() {
  const res = await fetch(`${API_BASE}/games`, { cache: "no-store" });
  return GamesResponseSchema.parse(await res.json());
}

async function getCategories() {
  const res = await fetch(`${API_BASE}/categories`, { cache: "no-store" });
  return CategoriesResponseSchema.parse(await res.json());
}

export default async function GamesPage() {
  const [games, categories] = await Promise.all([
    getGames(),
    getCategories(),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Games</h1>
        <div className="flex items-center gap-3">
          <ThemeToggleButton />
          <ProfileMenu />
        </div>
      </header>
      <GamesBrowser games={games} categories={categories} />
    </div>
  );
}
