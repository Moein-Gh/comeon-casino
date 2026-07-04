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
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-(--radius) border border-border bg-black [&_iframe]:size-full">
      <Script
        src="/comeon.game-1.1.min.js"
        strategy="afterInteractive"
        onReady={() => {
          setScriptReady(true);
          window.comeon.game.launch(code);
        }}
      />
      {/* Left empty on purpose: comeon.game.launch() mutates this node's
          innerHTML directly, outside React. It must never have React-rendered
          children, or React's reconciler will crash trying to remove nodes
          the vendor script already replaced. */}
      <div id="game-launch" className="size-full" />
      {!scriptReady && (
        <div className="absolute inset-0 flex items-center justify-center text-muted">
          Loading game…
        </div>
      )}
    </div>
  );
}
