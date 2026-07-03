import Link from "next/link";
import { notFound } from "next/navigation";
import { GamesResponseSchema } from "@/lib/types";
import { GameLaunch } from "@/components/games/GameLaunch";
import { ProfileMenu } from "@/components/layout/ProfileMenu";
import { ThemeToggleButton } from "@/components/layout/ThemeToggleButton";

const API_BASE = process.env.MOCK_API_URL ?? "http://localhost:3000";

async function getGame(code: string) {
  const res = await fetch(`${API_BASE}/games`, { cache: "no-store" });
  const games = GamesResponseSchema.parse(await res.json());
  return games.find((game) => game.code === code) ?? null;
}

type GamePageProps = {
  params: Promise<{ code: string }>;
};

export default async function GamePage({ params }: GamePageProps) {
  const { code } = await params;
  const game = await getGame(code);

  if (!game) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <Link
          href="/games"
          className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          Back to games
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggleButton />
          <ProfileMenu />
        </div>
      </div>
      <h1 className="text-2xl font-semibold">{game.name}</h1>
      <GameLaunch code={game.code} />
    </div>
  );
}
