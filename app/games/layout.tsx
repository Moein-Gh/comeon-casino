import { GamesGuard } from "@/components/layout/GamesGuard";
import { GamesProvider } from "@/lib/games-context";

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
