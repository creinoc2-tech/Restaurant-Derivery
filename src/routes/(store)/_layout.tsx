import Header from "@/components/base/common/header";
import Brand from "@/components/templats/store/brand";
import Footer from "@/components/templats/store/footer";
import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(store)/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <Brand />
       <Footer/> 
    </>
  );
}
