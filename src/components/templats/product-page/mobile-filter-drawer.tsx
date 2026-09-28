import { Filter } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
 import FilterSidebar from "./filter-sidebar";
import type { FilterState } from "@/lib/stone/product-filters-store";

interface MobileFilterDrawerProps {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: any) => void;
  totalResults: number;
}

export default function MobileFilterDrawer({
  filters,
  updateFilter,
  totalResults,
}: MobileFilterDrawerProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="lg"
            className="flex @5xl:hidden gap-2"
          />
        }
      >
        <Filter className="h-4 w-4" />
        Filters
      </SheetTrigger>
      <SheetContent
        side="left"
        className="@2xl:w-[400px] w-[300px] overflow-y-auto"
      >
        <SheetHeader className="mb-4">
          <SheetTitle>Filters ({totalResults})</SheetTitle>
        </SheetHeader>
        <FilterSidebar filters={filters} updateFilter={updateFilter} />
        <div className="sticky bottom-0 mt-6 border-t bg-background p-4">
          <Button className="w-full" onClick={() => setOpen(false)}>
            Show {totalResults} Results
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
