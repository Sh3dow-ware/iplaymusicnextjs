import {ChevronLeft, SearchIcon} from "lucide-react";
import styles from "@/styles/modules/NavBarNavigation.module.sass"

interface NavBarNavigationProps {
  titleForNavigation: string;
  returnToPreviousLink: boolean;
  searchIcon: boolean;
  withAbsolute: boolean;
  color: string;
}



export const NavBarNavigation = ({returnToPreviousLink = false, titleForNavigation = "", searchIcon = false, withAbsolute = false, color = "#agaf"} : NavBarNavigationProps ) => {
  return (
      <>
        <nav className={styles.navigation} style={{position: `${withAbsolute ? "absolute" : "static"}`, color: color}}>
          {returnToPreviousLink ? <ChevronLeft/> : null}
          <h2 className={styles.navigation__title}>{titleForNavigation}</h2>
          {searchIcon ? <SearchIcon/> : null}
        </nav>
      </>
  );
};