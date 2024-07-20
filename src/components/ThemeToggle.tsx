import useTheme from "../hooks/useTheme";
import { getNextTheme } from "../lib/theme/getNextTheme";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.themeToggle}>
      <button onClick={toggleTheme} className={styles.themeToggleButton}>
        {getNextTheme(theme)} mode
      </button>
    </div>
  );
}
