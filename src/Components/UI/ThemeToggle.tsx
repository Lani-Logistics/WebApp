import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    setIsDark(theme === "dark");
    document.documentElement.className = theme;
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  return (
    <button
      onClick={toggleTheme}
      className="h-10 w-10 center bg-background rounded-full"
    >
      {isDark ? (
        <Sun size={20} className="text-sub" />
      ) : (
        <Moon size={20} className="text-main" />
      )}
    </button>
  );
};

export default ThemeToggle; 