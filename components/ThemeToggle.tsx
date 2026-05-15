'use client';

import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="shrink-0"
    >
      {resolvedTheme === "light" ?
        <Moon className="h-5 w-5" />
        :
        <Sun className="h-5 w-5" />
      }
    </Button>
  )
}

export default ThemeToggle