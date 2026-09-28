import SearchBar from "@/components/base/products/searchbar";
import SortDropdown from "@/components/base/products/sort-dropdown";
import { useProductFilters } from "@/lib/stone/product-filters-store";
import MobileFilterDrawer from "./mobile-filter-drawer";
import FilterSidebar from "./filter-sidebar";

export default function ProductListingTemplate() {
  const { filters, updateFilter, totalProducts } = useProductFilters();
  return (
    <div className="@container container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex @4xl:flex-row flex-col items-start @4xl:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl tracking-tight">All Products</h1>
            <p className="mt-1 text-muted-foreground">Showing products</p>
          </div>

          <div className="flex @4xl:w-auto w-full items-center gap-2">
            <MobileFilterDrawer
              filters={filters}
              updateFilter={updateFilter}
              totalResults={totalProducts}
            />
            <div className="@4xl:w-75 flex-1">
              <SearchBar
                value={filters.search}
                onChange={(val) => updateFilter("search", val)}
              />
            </div>
            <SortDropdown
              value={filters.sort}
              onChange={(val) => updateFilter("sort", val)}
            />
          </div>
        </div>

        <div className="@container flex items-start gap-8">
          {/* Desktop Sidebar */}
          <aside className="sticky top-24 @5xl:block hidden w-64 shrink-0">
            <FilterSidebar filters={filters} updateFilter={updateFilter} />
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            <ActiveFilterChips
              filters={activeFilters}
              onRemove={removeFilter}
              onClearAll={clearAllFilters}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
