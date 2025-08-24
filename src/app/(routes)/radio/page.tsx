'use client'

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { NavBarNavigation } from "@/components/Header/NavBarNavigation";
import { FooterBar } from "@/components/Footer/FooterBar";
import { Timeline } from "@/components/Player/Timeline";

export default function RadioPage() {
  return (
    <ThemeProvider>
      <NavBarNavigation 
        color="#fff" 
        returnToPreviousLink={true} 
        searchIcon={false} 
        titleForNavigation="Playing" 
        withAbsolute={false}
      />
      <Timeline />
      <FooterBar />
    </ThemeProvider>
  )
}
