import { Advantages } from "@/components/landing/advantages";
import { CalcTeaser } from "@/components/landing/calc-teaser";
import { FinalCta, SiteFooter } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Showcase } from "@/components/landing/showcase";
import { SiteNav } from "@/components/landing/site-nav";

export default function HomePage() {
  return (
    <div id="top">
      <SiteNav />
      <main>
        <Hero />
        <HowItWorks />
        <Showcase />
        <Advantages />
        <CalcTeaser />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
