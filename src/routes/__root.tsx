import type { ReactNode } from "react";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { AppProviders } from "@/components/providers/AppProviders";
import "../../styles.css";
import type { QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/base/provider/theme-provider";
import { Toaster } from "@/components/ui/toast";
 
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  isAdmin?: boolean;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kaddo | Delivery cerca de ti" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AppProviders>{children}</AppProviders>
          <Toaster />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
