import Collections from "@/components/templats/store/homepage/collections";
import CtaBanner from "@/components/templats/store/homepage/cta-banner";
import FeatureGrid from "@/components/templats/store/homepage/feature-grid";
import Hero from "@/components/templats/store/homepage/heor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(store)/_layout/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeatureGrid />
      <Collections />
      <CtaBanner />
    </div>
  );
}
