'use client'

import { Accordion } from "@/components/Accordion/Accordion";
import { NavBarNavigation } from "@/components/Header/NavBarNavigation";
import { COLORS } from "@/lib/colors";
import { FooterBar } from "@/components/Footer/FooterBar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function CategoriesPage() {
  return (
    <ThemeProvider>
      <NavBarNavigation 
        returnToPreviousLink={true} 
        searchIcon={true} 
        titleForNavigation="Categories" 
        withAbsolute={false} 
        color={COLORS.black}
      />
      <Accordion />
      <FooterBar />
    </ThemeProvider>
  )
}