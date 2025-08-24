import styles from "@/styles/modules/ShowNextButton.module.sass"
import {ArrowBigRight} from "lucide-react";

interface StartScreenProps {
  onPress: () => void;
}

export const StartButton = ({onPress}: StartScreenProps) => {
  return (
      <>
        <ArrowBigRight onClick={onPress} className={styles.button}></ArrowBigRight>
      </>
  );
};