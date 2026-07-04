"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Player } from "@/lib/types";
import { usePlayer } from "@/lib/player-context";

const placeholderPlayer: Player = {
  name: "Guest",
  avatar: "",
  event: "Log in to see your player info here.",
};

const personIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-3/5">
    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.76-3.58-5-8-5Z" />
  </svg>
);

function Avatar({ player, className }: { player: Player; className: string }) {
  if (player.avatar) {
    return (
      <span className={`relative block shrink-0 overflow-hidden rounded-full bg-surface-sunken ${className}`}>
        <Image
          src={`/${player.avatar}`}
          alt={player.name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </span>
    );
  }
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent ${className}`}
    >
      {personIcon}
    </span>
  );
}

export function ProfileMenu() {
  const router = useRouter();
  const { player, logout } = usePlayer();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    setLoggingOut(true);
    await logout();
    router.push("/login");
  }

  const displayPlayer = player ?? placeholderPlayer;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="Open profile menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="rounded-full transition-transform hover:scale-105"
      >
        <Avatar player={displayPlayer} className="size-10" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full z-20 mt-2 w-64 overflow-hidden rounded-(--radius) border border-border bg-surface shadow-xl"
          >
            <div className="flex flex-col items-center gap-2 bg-background px-5 py-6 text-center">
              <Avatar player={displayPlayer} className="size-14" />
              <div className="min-w-0">
                <p className="truncate font-semibold">{displayPlayer.name}</p>
                <p className="mt-0.5 truncate text-xs text-muted">
                  {displayPlayer.event}
                </p>
              </div>
            </div>

            <div className="p-2">
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center gap-2 rounded-(--radius) px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-60"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m6 14 5-5-5-5m5 5H9"
                  />
                </svg>
                {loggingOut ? "Logging out…" : "Log out"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
