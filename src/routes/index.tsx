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
import { OTHER_INDUSTRY_ID, resolveIndustryLabel } from "@/lib/site";
import { getSeason, johannesburgToday, type SeasonInfo } from "@/lib/seasons";

const TITLE = "Davy Studios — Business Websites in 24–48 Hours, Cape Town";
const DESCRIPTION =
  "Cape Town web studio: 24h template, 48h launch. Custom sites & apps scoped to you. Self-hosted or managed plans to suit your budget. Chat on WhatsApp.";

// Social share preview (WhatsApp, Facebook, LinkedIn). Absolute HTTPS URLs on the canonical www host.
const PAGE_URL = "https://www.davystudios.co.za/";
const SHARE_IMAGE = "https://www.davystudios.co.za/og-banner.png";
const SHARE_IMAGE_ALT =
  "Davy Studios: Fast, Mobile-First Websites in 24–48 Hours. Cape Town web design: Starter (R5,000), Business Pro (R7,500), Custom Flagship.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: SHARE_IMAGE },
      { property: "og:image:secure_url", content: SHARE_IMAGE },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: SHARE_IMAGE_ALT },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: SHARE_IMAGE },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: Index,
});

const EVERYDAY: SeasonInfo = { mode: "none", label: "Everyday mode", detail: "" };

function Index() {
  const [industryId, setIndustryId] = useState(DEFAULT_INDUSTRY_ID);
  const [otherText, setOtherText] = useState("");
  const [business, setBusiness] = useState("");
  const [season, setSeason] = useState<SeasonInfo>(EVERYDAY);

  useEffect(() => {
    const { year, month, day } = johannesburgToday();
    setSeason(getSeason(year, month, day));
  }, []);

  const industry = findIndustry(industryId);

  // What we tell people on WhatsApp: the category, or what they typed for "Other".
  // Empty for "Other" with no text yet, so a bare "Other" is never sent.
  const industryLabel = resolveIndustryLabel(industry, otherText);

  // Switching away from "Other" clears the typed text.
  const handleIndustry = (id: string) => {
    setIndustryId(id);
    if (id !== OTHER_INDUSTRY_ID) setOtherText("");
  };

  // Keep the page edges (overscroll) and pop-ups in the same mood as the content.
  useEffect(() => {
    document.documentElement.dataset["theme"] = industry.theme;
    document.documentElement.dataset["season"] = season.mode;
  }, [industry.theme, season.mode]);

  return (
    <div data-theme={industry.theme} data-season={season.mode} className="min-h-screen bg-background font-sans text-foreground">
      <MoodSwitcher industry={industryId} onIndustry={handleIndustry} />
      <main>
        <Hero industry={industry} industryLabel={industryLabel} businessName={business} />
        <Tiers industry={industryLabel} business={business} />
        <AppCallout />
        <Inquiry
          industry={industry}
          onIndustry={handleIndustry}
          otherText={otherText}
          onOtherText={setOtherText}
          business={business}
          onBusiness={setBusiness}
        />
      </main>
      <Footer />
      <FloatingWhatsApp industry={industryLabel} business={business} />
    </div>
  );
}