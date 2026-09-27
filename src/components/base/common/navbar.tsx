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
  className = "hidden items-center gap-2 text-sm @3xl:flex",
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
            "flex h-9 items-center justify-center rounded-xl border border-dashed bg-transparent px-4 text-sm transition-all hover:border-transparent hover:bg-primary hover:text-background dark:text-body-70 dark:hover:text-background",
            linkClassName
          )}
          activeProps={{
            className: cn(
              "h-9 rounded-xl border-transparent bg-foreground! px-4 text-background dark:bg-body-10! hover:dark:text-foreground",
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
