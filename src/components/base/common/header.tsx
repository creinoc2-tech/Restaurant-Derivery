import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, Utensils } from "lucide-react";
import Navbar from "./navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../provider/mode-toggle";
import { useCartStore } from "@/lib/stone/cart-store";
import CartSheet from "@/components/containers/store/cart/cart-sheet";
import { MobileMenu } from "./mobile-menu";

export default function Header() {
  const navigationItems = [
    { to: "/", label: "Home" },
    { to: "/product", label: "Products" },
    { to: "/category", label: "Categories" },
  ];

  const { totalItems, setIsOpen } = useCartStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#ff441f] bg-white dark:bg-background">
      <div className="container mx-auto flex items-center gap-3 px-4 py-2.5">
        <div className="flex shrink-0 items-center gap-3">
          <MobileMenu
            navigationItems={navigationItems}
            trigger={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="size-9 rounded-md text-[#1a1a1a] hover:bg-transparent hover:text-[#ff441f] dark:text-foreground"
              >
                <Menu className="size-6" />
              </Button>
            }
          />

          <Link
            to="/"
            className="font-black italic text-[28px] leading-none tracking-tight text-[#ff441f]"
          >
            Shop
            <span className="not-italic">.</span>
            Stack
          </Link>

          <div className="hidden h-6 w-px bg-[#e6e6e6] @3xl:block dark:bg-border" />

          <Navbar items={navigationItems} />
        </div>

        <label className="relative mx-auto hidden min-w-0 flex-1 @3xl:block @5xl:max-w-2xl">
          <span className="sr-only">Buscar</span>
          <Utensils className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#ff441f]" />
          <Input
            type="search"
            placeholder="Comida, restaurantes, tiendas, productos..."
            className="h-11 rounded-full border-0 bg-[#f4f4f4] pr-11 pl-11 text-sm text-[#1a1a1a] shadow-none placeholder:text-[#8a8a8a] focus-visible:ring-1 focus-visible:ring-[#ff441f]/30 dark:bg-muted dark:text-foreground"
          />
          <Search className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#6b6b6b]" />
        </label>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link to="/auth/sign-in" aria-label="Sign In">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="size-9 rounded-full bg-[#dff7ea] text-sm font-semibold text-[#1a1a1a] hover:bg-[#cceedd] dark:bg-muted dark:text-foreground"
            >
              C
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            aria-label="Open Cart"
            onClick={() => setIsOpen(true)}
            className="relative size-9 rounded-full text-[#1a1a1a] hover:bg-muted dark:text-foreground"
          >
            <ShoppingBag className="size-5" />
            {totalItems > 0 && (
              <span className="-right-0.5 -top-0.5 absolute flex h-4 w-4 items-center justify-center rounded-full bg-[#ff441f] font-medium text-[10px] text-white">
                {totalItems}
              </span>
            )}
          </Button>
          <CartSheet />

          <div className="hidden @4xl:block">
            <ModeToggle />
          </div>
        </div>
      </div>

      <div className="px-4 pb-2.5 @3xl:hidden">
        <label className="relative block">
          <span className="sr-only">Buscar</span>
          <Utensils className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#ff441f]" />
          <Input
            type="search"
            placeholder="Comida, restaurantes, tiendas, productos..."
            className="h-10 w-full rounded-full border-0 bg-[#f4f4f4] pr-11 pl-11 text-sm shadow-none placeholder:text-[#8a8a8a] focus-visible:ring-1 focus-visible:ring-[#ff441f]/30 dark:bg-muted"
          />
          <Search className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#6b6b6b]" />
        </label>
      </div>
    </header>
  );
}
