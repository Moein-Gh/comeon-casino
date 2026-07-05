import { GamesProvider } from "@/lib/games-context";
import { GamesGuard } from "@/components/layout/GamesGuard";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GamesGuard>
      <GamesProvider>{children}</GamesProvider>
    </GamesGuard>
  );
}
