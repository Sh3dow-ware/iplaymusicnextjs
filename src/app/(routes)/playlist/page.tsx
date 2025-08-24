import { PlaylistSection } from "@/components/Playlist/PlaylistSection";
import { FooterBar } from "@/components/Footer/FooterBar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function PlaylistPage() {
  return (
    <ThemeProvider>
      <PlaylistSection />
      <FooterBar />
    </ThemeProvider>
  );
}