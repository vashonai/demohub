import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Plus } from "lucide-react";

interface CategoryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
  placeholder?: string;
}

export function CategoryCombobox({
  value,
  onChange,
  categories,
  placeholder = "Select or type a category...",
}: CategoryComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = categories.filter((cat) =>
    cat.toLowerCase().includes(search.toLowerCase())
  );

  const showCreateOption =
    search.trim() !== "" &&
    !categories.some((c) => c.toLowerCase() === search.trim().toLowerCase());

  const handleSelect = (cat: string) => {
    onChange(cat);
    setSearch("");
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (!open) setOpen(true);
  };

  const handleClear = () => {
    onChange("");
    setSearch("");
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input area */}
      <div
        className="flex items-center gap-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring cursor-text"
        onClick={() => {
          inputRef.current?.focus();
          setOpen(true);
        }}
      >
        <input
          ref={inputRef}
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground text-sm"
          placeholder={value || placeholder}
          value={open ? search : value ? "" : ""}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
        />
        {value && !open && (
          <span className="text-sm text-foreground truncate max-w-[200px] pointer-events-none absolute left-3">
            {value}
          </span>
        )}
        <div className="flex items-center gap-1 shrink-0">
          {value && (
            <button
              type="button"
              className="p-0.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
          <div className="max-h-[200px] overflow-y-auto py-1">
            {filtered.length === 0 && !showCreateOption && (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                No categories found
              </div>
            )}

            {filtered.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                  cat === value
                    ? "bg-accent text-accent-foreground font-medium"
                    : ""
                }`}
                onClick={() => handleSelect(cat)}
              >
                {cat}
              </button>
            ))}

            {showCreateOption && (
              <>
                {filtered.length > 0 && (
                  <div className="border-t border-border my-1" />
                )}
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center gap-2"
                  onClick={() => handleSelect(search.trim())}
                >
                  <Plus className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>
                    Create "<span className="font-medium">{search.trim()}</span>"
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
