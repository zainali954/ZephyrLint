import { Moon02Icon, Sun02Icon } from 'hugeicons-react';
import { useCallback, useEffect, useState } from 'react'

const ThemeToggler = () => {
  const [isDark, setIsDark] = useState(false)

  // Sync with localStorage for persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  }, []);
  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer text-sm p-2 rounded-lg border dark:border-neutral-600 border-neutral-300 bg-white hover:bg-neutral-100 dark:bg-neutral-800 hover:dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 flex gap-2 items-center"
    >
      {isDark ? <Moon02Icon size={16} /> : <Sun02Icon size={16} />}

    </button>
  )
}

export default ThemeToggler
