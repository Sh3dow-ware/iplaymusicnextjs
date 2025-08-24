import styles from "@/styles/modules/StartScreen.module.sass";
import startLogo from "@/app/assets/logo/new_gradient_logo.svg";
import Image from "next/image";
export const StartScreen = () => {
  return (
      <>
        <header className={styles['start-screen']}>
          <Image alt={"logo"} src={startLogo}></Image>
          <h2 className={styles['start-screen__title']}>iPlayMusic</h2>
        </header>
      </>
  );
};