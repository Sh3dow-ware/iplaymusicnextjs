'use client'

import { WalkthroughSection } from "@/components/Walkthrough/WalkthroughSection"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { useEffect } from "react"

const Page = () => {
  useEffect(() => {
    const body = document.body
    if (body.classList.contains('dark') && !body.classList.contains('dark-pink')) {
      body.classList.add('dark-pink')
    }

    return () => {
      body.classList.remove('dark-pink')
    }
  }, [])

  return (
      <ThemeProvider>
        <WalkthroughSection />
      </ThemeProvider>
  )
}


export default Page
