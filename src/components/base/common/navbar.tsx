import { cn } from "@/utils/utils";
import { Link } from "@tanstack/react-router";

interface NavItem {
  label: string;
  to: string;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  linkClassName?: string;
  activeLinkClassName?: string;
}

export default function Navbar({
  items,
  className = "hidden items-center gap-1 text-sm @3xl:flex",
  linkClassName = "",
  activeLinkClassName = "",
}: NavBarProps) {
  return (
    <nav className={cn(className)}>
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={cn(
            "flex h-9 items-center justify-center rounded-md px-3 font-medium text-[#ff441f] text-sm transition-colors hover:bg-[#fff1ed] hover:text-[#d63612] dark:hover:bg-muted",
            linkClassName
          )}
          activeProps={{
            className: cn(
              "bg-transparent font-semibold text-[#d63612]",
              activeLinkClassName
            ),
          }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
