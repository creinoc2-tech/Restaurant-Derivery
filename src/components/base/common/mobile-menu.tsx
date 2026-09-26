import { ShoppingBag } from "lucide-react";
import type { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Navbar from "./navbar";

export interface MobileMenuProps {
  navigationItems: { to: string; label: string }[];
  trigger: ReactElement;
}

export function MobileMenu({ navigationItems, trigger }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger render={trigger} />
      <SheetContent side="right" className="p-6">
        <Navbar items={navigationItems} className="flex flex-col gap-3" />
        <div className="mt-6 flex items-center gap-3">
          <SheetClose
            render={
              <Button variant="outline" size="icon" aria-label="Open cart" />
            }
          >
            <ShoppingBag className="size-5" />
          </SheetClose>
          {/* {user ? (
            <UserMenu user={user} />
          ) : (
            <SheetClose render={<Link to="/auth/sign-in" className="w-full" />}>
              <Button variant="default" size="lg" className="w-full">
                Sign In
              </Button>
            </SheetClose>
          )} */}
        </div>
      </SheetContent>
    </Sheet>
  );
}