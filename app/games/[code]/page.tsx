"use client";

import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useGamesData } from "@/lib/games-context";
import { ProfileMenu } from "@/components/layout/ProfileMenu";
import { ThemeToggleButton } from "@/components/layout/ThemeToggleButton";

export default function GamePage() {
  const { code } = useParams<{ code: string }>();
  const { games, categories, loadError } = useGamesData();
  const game = games.find((candidate) => candidate.code === code) ?? null;

  const backLink = (
    <Link
      href="/games"
      className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      </svg>
      Back to games
    </Link>
  );

  if (loadError) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {backLink}
          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            <ProfileMenu />
          </div>
        </div>
        <p className="rounded-(--radius) border border-border bg-surface p-6 text-center text-muted shadow-sm">
          We couldn&apos;t reach the games service. Make sure the mock API
          server is running and try again.
        </p>
      </div>
    );
  }

  if (!game) {
    notFound();
  }

  const gameCategories = categories.filter(
    (category) => category.id !== 0 && game.categoryIds.includes(category.id),
  );

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        {backLink}
        <div className="flex items-center gap-3">
          <ThemeToggleButton />
          <ProfileMenu />
        </div>
      </div>
      <div className="relative -mx-4 aspect-video overflow-hidden bg-surface-sunken sm:mx-0 sm:rounded-(--radius)">
        <ViewTransition name={`game-icon-${game.code}`} share="morph">
          <Image
            src={`/${game.icon}`}
            alt={game.name}
            fill
            unoptimized
            className="object-contain p-10"
          />
        </ViewTransition>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="flex flex-col gap-3">
        <ViewTransition name={`game-title-${game.code}`} share="morph">
          <h1 className="text-3xl font-semibold tracking-tight">
            {game.name}
          </h1>
        </ViewTransition>
        {gameCategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {gameCategories.map((category) => (
              <span
                key={category.id}
                className="text-xs font-semibold tracking-wide text-accent uppercase"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          {game.description}
        </p>
      </div>
    </div>
  );
}
