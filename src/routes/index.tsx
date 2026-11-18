import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MoodSwitcher } from "@/components/studio/mood-switcher";
import { Hero } from "@/components/studio/hero";
import { Tiers } from "@/components/studio/tiers";
import { AppCallout } from "@/components/studio/app-callout";
import { Inquiry } from "@/components/studio/inquiry";
import { FloatingWhatsApp } from "@/components/studio/floating-whatsapp";
import { Footer } from "@/components/studio/footer";
import { DEFAULT_INDUSTRY_ID, findIndustry } from "@/lib/industries";
import { getSeason, johannesburgToday, type SeasonInfo } from "@/lib/seasons";

const TITLE = "Davy Studios — 24-Hour Website Template, Ready in 48 Hours";
const DESCRIPTION =
  "Davy Studios, Cape Town: deposit to kick off, website template in 24 hours, finished in 48 with one revision round. Final balance upon approval, then domain launch.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const EVERYDAY: SeasonInfo = { mode: "none", label: "Everyday mode", detail: "" };

function Index() {
  const [industryId, setIndustryId] = useState(DEFAULT_INDUSTRY_ID);
  const [business, setBusiness] = useState("");
  const [season, setSeason] = useState<SeasonInfo>(EVERYDAY);

  useEffect(() => {
    const { year, month, day } = johannesburgToday();
    setSeason(getSeason(year, month, day));
  }, []);

  const industry = findIndustry(industryId);

  // Keep the page edges (overscroll) and pop-ups in the same mood as the content.
  useEffect(() => {
    document.documentElement.dataset["theme"] = industry.theme;
    document.documentElement.dataset["season"] = season.mode;
  }, [industry.theme, season.mode]);

  return (
    <div data-theme={industry.theme} data-season={season.mode} className="min-h-screen bg-background font-sans text-foreground">
      <MoodSwitcher industry={industryId} onIndustry={setIndustryId} />
      <main>
        <Hero industry={industry} businessName={business} />
        <Tiers industry={industry.name} business={business} />
        <AppCallout />
        <Inquiry industry={industry} onIndustry={setIndustryId} business={business} onBusiness={setBusiness} />
      </main>
      <Footer />
      <FloatingWhatsApp industry={industry.name} business={business} />
    </div>
  );
}
