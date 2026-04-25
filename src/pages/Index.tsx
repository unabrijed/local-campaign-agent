import { Nav } from "@/components/localboard/Nav";
import { Hero } from "@/components/localboard/Hero";
import { Problem } from "@/components/localboard/Problem";
import { HowItWorks } from "@/components/localboard/HowItWorks";
import { BangaloreMap } from "@/components/localboard/BangaloreMap";
import { SampleCampaign } from "@/components/localboard/SampleCampaign";
import { AgentSystem } from "@/components/localboard/AgentSystem";
import { Difference } from "@/components/localboard/Difference";
import { UseCases } from "@/components/localboard/UseCases";
import { LaunchBoard } from "@/components/localboard/LaunchBoard";
import { VendorNetwork } from "@/components/localboard/VendorNetwork";
import { BillboardOwners } from "@/components/localboard/BillboardOwners";
import { Pricing } from "@/components/localboard/Pricing";
import { FinalCTA } from "@/components/localboard/FinalCTA";
import { Footer } from "@/components/localboard/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "LocalBoard | Website in. Bangalore campaign out.";
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      "LocalBoard is an AI agent that turns any business website into a launch-ready Bangalore street campaign: hotspots, billboards, creatives, QR pages, and vendor outreach.",
    );
    if (!meta.parentNode) document.head.appendChild(meta);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <BangaloreMap />
      <SampleCampaign />
      <AgentSystem />
      <LaunchBoard />
      <UseCases />
      <VendorNetwork />
      <BillboardOwners />
      <Pricing />
      <Difference />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
