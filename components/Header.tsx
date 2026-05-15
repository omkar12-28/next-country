import Link from "next/link";
import { Globe, Search, X } from "lucide-react";
import { Input } from "./ui/input";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

interface HeaderProps {
  search: string;
  setSearch?: (value: string) => void;
  showSearch?: boolean;
  }

const Header = ({ search, setSearch, showSearch = true }: HeaderProps) => {

  const onSearchChange = (value: string) => {
    setSearch?.(value);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Globe className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground tracking-tight">
              WorldExplorer
            </span>
          </Link>

          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search countries..."
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-9 pr-9 bg-background"
                />
                {search && (
                  <button
                    onClick={() => onSearchChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          <ThemeToggle />
        </div>

        {showSearch && (
          <div className="md:hidden pb-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search countries..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 pr-9 bg-background"
              />
              {search && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
