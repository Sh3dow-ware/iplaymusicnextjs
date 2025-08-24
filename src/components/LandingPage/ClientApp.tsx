'use client'

import {StartScreen} from '@/components/LandingPage/StartScreen';
import {StartButton} from '@/components/LandingPage/StartButton';
import '@/styles/utils/_animation.sass';
import "@/styles/themes/MainTheme.sass"
import {ThemeProvider} from "@/components/providers/ThemeProvider";
import Link from "next/link";
export const ClientApp = () => {

  const handlePress = (): void => {
    console.log("Do nothing")
  }

  return (
      <>
      <ThemeProvider>
            <div className={`transition-wrapper`}>
              <StartScreen />
              <Link className={"w-[150px]"} href={"/walkthrough"}><StartButton onPress={handlePress}/></Link>
      </div>
      </ThemeProvider>
      </>
  );
};
