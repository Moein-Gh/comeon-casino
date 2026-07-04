"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlayer } from "@/lib/player-context";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { player, hydrated } = usePlayer();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && player) {
      router.replace("/games");
    }
  }, [hydrated, player, router]);

  return <>{children}</>;
}
