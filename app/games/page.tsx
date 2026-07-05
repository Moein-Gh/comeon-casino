"use client";

import { useGamesData } from "@/lib/games-context";
import { GamesBrowser } from "@/components/games/GamesBrowser";
import { ProfileMenu } from "@/components/layout/ProfileMenu";
import { ThemeToggleButton } from "@/components/layout/ThemeToggleButton";

export default function GamesPage() {
  const { games, categories, loading, loadError } = useGamesData();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Games</h1>
        <div className="flex items-center gap-3">
          <ThemeToggleButton />
          <ProfileMenu />
        </div>
      </header>
      {loadError ? (
        <p className="rounded-(--radius) border border-border bg-surface p-6 text-center text-muted shadow-sm">
          We couldn&apos;t load the games right now. Make sure the API
          server is running and try refreshing the page.
        </p>
      ) : loading ? (
        <p className="py-16 text-center text-muted">Loading games…</p>
      ) : (
        <GamesBrowser games={games} categories={categories} />
      )}
    </div>
  );
}
