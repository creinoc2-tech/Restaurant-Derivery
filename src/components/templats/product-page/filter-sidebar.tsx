import FilterGroup from "@/components/base/products/filter-group";
import type { FilterState } from "@/lib/stone/product-filters-store";

interface FilterSidebarProps {
  filters: FilterState;
  updateFilter: (
    key: keyof FilterState,
    value: string | number | string[] | [number, number] | null,
  ) => void;
  className?: string;
}

export default function FilterSidebar({
  filters,
  updateFilter,
  className,
}: FilterSidebarProps) {
  return (
    <div className={`space-y-1 px-4 ${className}`}>
      <div className="mb-4 font-semibold text-lg">Filters</div>

      <FilterGroup id="categories" title="Categories">
           hola
      </FilterGroup>
    </div>
  );
}
