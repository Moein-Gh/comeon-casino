"use client";

import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    comeon: { game: { launch: (code: string) => void } };
  }
}

type GameLaunchProps = {
  code: string;
};

export function GameLaunch({ code }: GameLaunchProps) {
  const [scriptReady, setScriptReady] = useState(false);

  return (
    <>
      <Script
        src="/comeon.game-1.1.min.js"
        strategy="afterInteractive"
        onReady={() => {
          setScriptReady(true);
          window.comeon.game.launch(code);
        }}
      />
      <div
        id="game-launch"
        className="relative aspect-4/3 w-full overflow-hidden rounded-(--radius) border border-border bg-black [&_iframe]:size-full"
      >
        {!scriptReady && (
          <div className="flex h-full items-center justify-center text-muted">
            Loading game…
          </div>
        )}
      </div>
    </>
  );
}
