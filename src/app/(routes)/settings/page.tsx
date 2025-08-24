'use client'

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Settings } from "@/components/Configurations/Settings";
import { FooterBar } from "@/components/Footer/FooterBar";

export default function SettingsPage() {
  return (
    <ThemeProvider>
      <Settings />
      <FooterBar />
    </ThemeProvider>
  )
}
