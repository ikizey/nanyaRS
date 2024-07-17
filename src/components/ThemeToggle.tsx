import useTheme from "../hooks/useTheme";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.themeToggle}>
      <button onClick={toggleTheme} className={styles.themeToggleButton}>
        {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}
