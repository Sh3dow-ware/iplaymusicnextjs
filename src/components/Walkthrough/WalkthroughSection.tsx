import styles from "@/styles/modules/Walkthrough.module.sass";
import badgeIcon from "@/app/assets/logo/badges.svg";
import {Heart, Music2, Radio} from "lucide-react";
import Link from "next/link";
import {useEffect, useState} from "react";
import Image from "next/image";

export const WalkthroughSection = () => {
  const [activeButton, setActiveButton] = useState<'radio' | 'liked' | 'playlist'>('radio')
  const [showIcon, setShowIcon] = useState(true)
  const [animateOut, setAnimateOut] = useState(false)


  const HeadingTitle: Record<string, string[]> = {
    "radio": ["Where Words Fail,", "Music Speaks"],
    "liked": ["No Music", "No Life"],
    "playlist": ["Peace Love", "Music"],
  }

  useEffect(() => {
    if (activeButton === 'radio') {
      setShowIcon(true)
      setAnimateOut(false)
    } else if (showIcon) {
      setAnimateOut(true)

      const timeout = setTimeout(() => {
        setShowIcon(false)
        setAnimateOut(false)
      },  1000)

      return () => clearTimeout(timeout)
    }
  }, [activeButton])

  return (
      <>
        <div className={styles.wrapper}>
          <section className={styles.home}>
            <h2 className={styles.home__title}>
              {HeadingTitle[activeButton].map((line, i) => (
                  <span key={i} className={styles.home__line}>
                {line}
                </span>
              ))}
            </h2>
            <p className={styles.home__description}>
              Vivamus auctor dui dignissim, sollicitudin nunc ac, aliquam justo.
              Vestibulum pellentesque lacinia eleifend.
            </p>
            {showIcon && (
               <Image className={`${styles.home__icon} ${animateOut ? styles.animateOut : ""}`} src={badgeIcon} alt="" width={368} height={479}/>
            )}
          </section>

          <section className={styles['shortcut-wrapper']} aria-label="Shortcut options">
            <button
                className={styles['shortcut-wrapper__radio']}
                aria-pressed={activeButton === 'radio'}
                aria-label="Select radio option"
                onClick={() => setActiveButton('radio')}
                type="button"
            >
              <Radio/>
            </button>
            <button
                className={styles['shortcut-wrapper__liked']}
                aria-pressed={activeButton === 'liked'}
                aria-label="Toggle liked"
                onClick={() => setActiveButton('liked')}
                type="button"
            >
              <Heart/>
            </button>
            <button
                className={styles['shortcut-wrapper__playlist']}
                aria-pressed={activeButton === 'playlist'}
                aria-label="Open playlist"
                onClick={() => setActiveButton('playlist')}
                type="button"
            >
              <Music2/>
            </button>
          </section>
          <Link className={activeButton === "playlist" ? styles.skip__continue : styles.skip}
                href="/playlist">{activeButton === "playlist" ? "Continue" : "Skip"}</Link>
        </div>
      </>
  );
};