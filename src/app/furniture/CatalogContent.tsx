"use client";

import { useState, useMemo } from "react";
import { FilterChip } from "@/components/ui/FilterChip";
import { ProductCard } from "@/components/features/ProductCard";
import type { ProductCard as ProductCardType } from "@/types/sanity";
import { track } from "@/lib/analytics";

type SortOption = "featured" | "price-low" | "price-high" | "maker" | "newest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "maker", label: "By Maker" },
];

const priceRanges = [
  { value: "all", label: "All Prices", min: 0, max: Infinity },
  { value: "under-1000", label: "Under $1,000", min: 0, max: 1000 },
  { value: "1000-2000", label: "$1,000 - $2,000", min: 1000, max: 2000 },
  { value: "2000-4000", label: "$2,000 - $4,000", min: 2000, max: 4000 },
  { value: "over-4000", label: "Over $4,000", min: 4000, max: Infinity },
];

interface CatalogContentProps {
  products: ProductCardType[];
  categories: { value: string; label: string }[];
}

export function CatalogContent({ products, categories }: CatalogContentProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<string>("all");

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((product) => product.category === activeCategory);
    }

    // Filter by price range
    if (priceRange !== "all") {
      const range = priceRanges.find((r) => r.value === priceRange);
      if (range) {
        result = result.filter(
          (product) => product.price >= range.min && product.price < range.max
        );
      }
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "maker":
        result.sort((a, b) => (a.maker?.name || "").localeCompare(b.maker?.name || ""));
        break;
      case "featured":
      default:
        // Keep original order (featured first)
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [products, activeCategory, sortBy, priceRange]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const clearFilters = () => {
    setActiveCategory("all");
    setPriceRange("all");
    setSortBy("featured");
    track("filter_cleared", {});
  };

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    track("filter_applied", {
      filter_type: "category",
      filter_value: value,
    });
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    track("filter_applied", {
      filter_type: "sort",
      filter_value: value,
    });
  };

  const handlePriceRangeChange = (value: string) => {
    setPriceRange(value);
    track("filter_applied", {
      filter_type: "price",
      filter_value: value,
    });
  };

  const hasActiveFilters = activeCategory !== "all" || priceRange !== "all";

  return (
    <section className="py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Filter Bar */}
        <div className="space-y-6 mb-10 pb-6 border-b border-[rgba(163,146,124,0.15)]">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <FilterChip
                key={category.value}
                label={category.label}
                isActive={activeCategory === category.value}
                onClick={() => handleCategoryChange(category.value)}
                count={categoryCounts[category.value] || 0}
              />
            ))}
          </div>

          {/* Sort and Price Range */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-[var(--patina-mocha-brown)]">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="px-3 py-2 bg-white border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-md)] text-sm text-[var(--patina-charcoal)] focus:outline-none focus:border-[var(--patina-clay-beige)] cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="price" className="text-sm text-[var(--patina-mocha-brown)]">
                Price:
              </label>
              <select
                id="price"
                value={priceRange}
                onChange={(e) => handlePriceRangeChange(e.target.value)}
                className="px-3 py-2 bg-white border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-md)] text-sm text-[var(--patina-charcoal)] focus:outline-none focus:border-[var(--patina-clay-beige)] cursor-pointer"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)] transition-colors underline underline-offset-4"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-[var(--patina-mocha-brown)] mb-8">
          Showing {filteredAndSortedProducts.length}{" "}
          {filteredAndSortedProducts.length === 1 ? "piece" : "pieces"}
          {activeCategory !== "all" && (
            <>
              {" "}
              in{" "}
              <span className="font-medium text-[var(--patina-charcoal)]">
                {categories.find((c) => c.value === activeCategory)?.label}
              </span>
            </>
          )}
          {priceRange !== "all" && (
            <>
              {" "}
              ·{" "}
              <span className="font-medium text-[var(--patina-charcoal)]">
                {priceRanges.find((r) => r.value === priceRange)?.label}
              </span>
            </>
          )}
        </p>

        {/* Product Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredAndSortedProducts.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                priority={index < 6}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-[var(--patina-mocha-brown)]">
              No pieces found matching your filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-[var(--patina-clay-beige)] underline underline-offset-4 hover:text-[var(--patina-charcoal)] transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
