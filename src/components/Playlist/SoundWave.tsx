'use client'
import {ReactSVG} from "react-svg";
import soundWaveStyle from "@/styles/modules/SoundWave.module.sass";
import soundWave from "@/app/assets/logo/sound-wave.svg";

export const SoundWave = () => {
  return (
      <>
        <ReactSVG className={soundWaveStyle["sound-wave"]} src={soundWave} />
      </>
  );
};