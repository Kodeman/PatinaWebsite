"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

interface SearchResult {
  type: "product" | "maker" | "material" | "page";
  title: string;
  subtitle?: string;
  href: string;
  imageUrl?: string;
}

// Static search data - in production this would come from an API
const searchData: SearchResult[] = [
  // Products
  {
    type: "product",
    title: "Noma Dining Chair",
    subtitle: "Starting at $1,850",
    href: "/furniture/noma-chair",
    imageUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?w=100&h=100&fit=crop&q=80",
  },
  {
    type: "product",
    title: "Atelier Coffee Table",
    subtitle: "Starting at $2,400",
    href: "/furniture/atelier-table",
    imageUrl: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=100&h=100&fit=crop&q=80",
  },
  {
    type: "product",
    title: "Kyoto Platform Bed",
    subtitle: "Starting at $4,200",
    href: "/furniture/kyoto-bed",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=100&h=100&fit=crop&q=80",
  },
  {
    type: "product",
    title: "Archipelago Bookshelf",
    subtitle: "Starting at $3,100",
    href: "/furniture/archipelago-bookshelf",
    imageUrl: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=100&h=100&fit=crop&q=80",
  },
  {
    type: "product",
    title: "Haven Lounge Chair",
    subtitle: "Starting at $2,800",
    href: "/furniture/haven-lounge",
    imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=100&h=100&fit=crop&q=80",
  },
  {
    type: "product",
    title: "Fjord Sideboard",
    subtitle: "Starting at $3,600",
    href: "/furniture/fjord-sideboard",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop&q=80",
  },
  // Makers
  {
    type: "maker",
    title: "Nakashima Workshop",
    subtitle: "New Hope, Pennsylvania",
    href: "/makers",
  },
  {
    type: "maker",
    title: "Vermont Woodworks",
    subtitle: "Burlington, Vermont",
    href: "/makers",
  },
  {
    type: "maker",
    title: "Sashimono Studio",
    subtitle: "Kyoto, Japan",
    href: "/makers",
  },
  {
    type: "maker",
    title: "Studio Piet",
    subtitle: "Copenhagen, Denmark",
    href: "/makers",
  },
  // Materials
  {
    type: "material",
    title: "American Black Walnut",
    subtitle: "Eastern United States",
    href: "/materials",
  },
  {
    type: "material",
    title: "White Oak",
    subtitle: "North America",
    href: "/materials",
  },
  {
    type: "material",
    title: "Japanese Hinoki",
    subtitle: "Japan",
    href: "/materials",
  },
  {
    type: "material",
    title: "Vegetable-Tanned Leather",
    subtitle: "Tuscany, Italy",
    href: "/materials",
  },
  // Pages
  {
    type: "page",
    title: "Work with a Designer",
    subtitle: "Design Services",
    href: "/services",
  },
  {
    type: "page",
    title: "Our Story",
    subtitle: "About Patina",
    href: "/about",
  },
  {
    type: "page",
    title: "Contact Us",
    subtitle: "Get in touch",
    href: "/contact",
  },
  {
    type: "page",
    title: "Careers",
    subtitle: "Join our team",
    href: "/careers",
  },
];

interface SearchBarProps {
  variant?: "default" | "dark";
}

export function SearchBar({ variant = "default" }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDark = variant === "dark";

  const search = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const q = searchQuery.toLowerCase();
    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q)
    );
    const limitedResults = filtered.slice(0, 8); // Limit to 8 results
    setResults(limitedResults);

    // Track search query
    track("search_query", {
      query: searchQuery,
      results_count: limitedResults.length,
    });
  }, []);

  useEffect(() => {
    search(query);
  }, [query, search]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      // Escape to close
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const getTypeLabel = (type: SearchResult["type"]) => {
    switch (type) {
      case "product":
        return "Product";
      case "maker":
        return "Maker";
      case "material":
        return "Material";
      case "page":
        return "Page";
    }
  };

  const handleResultClick = (result: SearchResult, index: number) => {
    track("search_result_clicked", {
      query,
      result_type: result.type,
      result_title: result.title,
      position: index,
    });
    setIsOpen(false);
    setQuery("");
  };

  const handleOpenSearch = () => {
    track("search_opened", {});
    setIsOpen(true);
  };

  const handleCloseSearch = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <>
      {/* Search Button */}
      <button
        onClick={handleOpenSearch}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] transition-colors",
          isDark
            ? "text-[rgba(237,233,228,0.7)] hover:text-[var(--patina-off-white)] hover:bg-[rgba(255,255,255,0.1)]"
            : "text-[var(--patina-mocha-brown)] hover:text-[var(--patina-charcoal)] hover:bg-[rgba(163,146,124,0.1)]"
        )}
        aria-label="Search"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <span className="hidden sm:inline text-sm">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 bg-[rgba(0,0,0,0.1)] rounded text-[10px] font-mono">
          <span className="text-[9px]">⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100]"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[var(--patina-charcoal)]/60 backdrop-blur-sm"
            onClick={() => {
              setIsOpen(false);
              setQuery("");
            }}
          />

          {/* Modal */}
          <div className="relative flex items-start justify-center pt-[15vh] px-4">
            <div className="w-full max-w-[600px] bg-[var(--patina-warm-white)] rounded-[var(--radius-xl)] shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(163,146,124,0.15)]">
                <svg
                  className="w-5 h-5 text-[var(--patina-clay-beige)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, makers, materials..."
                  className="flex-1 bg-transparent text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none text-lg"
                />
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  aria-label="Close search (press Escape)"
                  className="text-xs text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)] px-2 py-1 bg-[rgba(163,146,124,0.1)] rounded"
                >
                  ESC
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto">
                {query && results.length === 0 && (
                  <div className="px-5 py-8 text-center">
                    <p className="text-[var(--patina-mocha-brown)]">
                      No results found for &quot;{query}&quot;
                    </p>
                    <p className="text-sm text-[var(--patina-clay-beige)] mt-1">
                      Try searching for a product, maker, or material
                    </p>
                  </div>
                )}

                {results.length > 0 && (
                  <ul className="py-2">
                    {results.map((result, index) => (
                      <li key={`${result.type}-${result.title}-${index}`}>
                        <Link
                          href={result.href}
                          onClick={() => handleResultClick(result, index)}
                          className="flex items-center gap-4 px-5 py-3 hover:bg-[var(--patina-soft-cream)] transition-colors"
                        >
                          {result.imageUrl ? (
                            <div className="relative w-12 h-12 rounded-[var(--radius-md)] overflow-hidden bg-[var(--patina-soft-cream)]">
                              <Image
                                src={result.imageUrl}
                                alt={result.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--patina-soft-cream)] flex items-center justify-center">
                              <span className="text-xs text-[var(--patina-clay-beige)] uppercase">
                                {result.type.slice(0, 2)}
                              </span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[var(--patina-charcoal)] truncate">
                              {result.title}
                            </p>
                            {result.subtitle && (
                              <p className="text-sm text-[var(--patina-mocha-brown)] truncate">
                                {result.subtitle}
                              </p>
                            )}
                          </div>
                          <span className="text-xs text-[var(--patina-clay-beige)] px-2 py-1 bg-[rgba(163,146,124,0.1)] rounded-full">
                            {getTypeLabel(result.type)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {!query && (
                  <div className="px-5 py-6">
                    <p className="text-xs text-[var(--patina-clay-beige)] uppercase tracking-wider mb-3">
                      Quick Links
                    </p>
                    <div className="space-y-1">
                      <Link
                        href="/furniture"
                        onClick={handleCloseSearch}
                        className="block px-3 py-2 rounded-[var(--radius-md)] text-[var(--patina-mocha-brown)] hover:bg-[var(--patina-soft-cream)] hover:text-[var(--patina-charcoal)] transition-colors"
                      >
                        Browse All Furniture
                      </Link>
                      <Link
                        href="/makers"
                        onClick={handleCloseSearch}
                        className="block px-3 py-2 rounded-[var(--radius-md)] text-[var(--patina-mocha-brown)] hover:bg-[var(--patina-soft-cream)] hover:text-[var(--patina-charcoal)] transition-colors"
                      >
                        Meet Our Makers
                      </Link>
                      <Link
                        href="/materials"
                        onClick={handleCloseSearch}
                        className="block px-3 py-2 rounded-[var(--radius-md)] text-[var(--patina-mocha-brown)] hover:bg-[var(--patina-soft-cream)] hover:text-[var(--patina-charcoal)] transition-colors"
                      >
                        Explore Materials
                      </Link>
                      <Link
                        href="/services"
                        onClick={handleCloseSearch}
                        className="block px-3 py-2 rounded-[var(--radius-md)] text-[var(--patina-mocha-brown)] hover:bg-[var(--patina-soft-cream)] hover:text-[var(--patina-charcoal)] transition-colors"
                      >
                        Design Services
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
