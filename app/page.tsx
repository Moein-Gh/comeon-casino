"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlayer } from "@/lib/player-context";

export default function Home() {
  const { player, hydrated } = usePlayer();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;
    router.replace(player ? "/games" : "/login");
  }, [hydrated, player, router]);

  return null;
}
