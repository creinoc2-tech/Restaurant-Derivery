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
      <div className="container mx-auto flex items-center gap-3 px-4 py-2">
        <div className="@3xl:hidden">
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
        </div>

        <Link
          to="/"
          className="shrink-0 font-black italic text-[22px] leading-none tracking-tight text-[#ff441f] @3xl:text-[28px]"
        >
          Shop
          <span className="not-italic">.</span>
          Stack
        </Link>

        <Navbar items={navigationItems} />

        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Buscar</span>
          <Utensils className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#ff441f]" />
          <Input
            type="search"
            placeholder="Comida, restaurantes, tiendas, productos..."
            className="h-9 w-full max-w-md rounded-full border-0 bg-[#f4f4f4] pr-9 pl-9 text-sm text-[#1a1a1a] shadow-none placeholder:text-[#8a8a8a] focus-visible:ring-1 focus-visible:ring-[#ff441f]/30 dark:bg-muted dark:text-foreground"
          />
          <Search className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-[#6b6b6b]" />
        </label>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link to="/auth/sign-in">
            <Button variant="default" size="lg" type="button">
              Sign In
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
    </header>
  );
}
