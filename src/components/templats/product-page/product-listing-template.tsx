import SearchBar from "@/components/base/products/searchbar";
import SortDropdown from "@/components/base/products/sort-dropdown";
import { useProductFilters } from "@/lib/stone/product-filters-store";
import MobileFilterDrawer from "./mobile-filter-drawer";

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
            <MobileFilterDrawer/>
            <div className="@4xl:w-[300px] flex-1">
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
      </div>
    </div>
  );
}
