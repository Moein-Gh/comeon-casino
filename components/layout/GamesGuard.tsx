"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlayer } from "@/lib/player-context";

export function GamesGuard({ children }: { children: React.ReactNode }) {
  const { player, hydrated } = usePlayer();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !player) {
      router.replace("/login");
    }
  }, [hydrated, player, router]);

  if (!hydrated || !player) {
    return null;
  }

  return <>{children}</>;
}
