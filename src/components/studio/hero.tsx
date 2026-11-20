import { ArrowDown } from "lucide-react";
import type { Industry } from "@/lib/industries";
import { buildWhatsAppLink } from "@/lib/site";
import { HeroBackdrop } from "./hero-backdrop";
import { MoodButton } from "./mood-button";
import { WhatsAppIcon } from "./whatsapp-icon";

interface Props {
  industry: Industry;
  // The category name, or what the visitor typed for "Other". Empty when "Other" has no text yet.
  industryLabel: string;
  businessName: string;
}

export function Hero({ industry, industryLabel, businessName }: Props) {
  const Icon = industry.icon;
  // Shown on the page; "Other" with no text still reads "Other" here, but is never sent on WhatsApp.
  const shownName = industryLabel || industry.name;
  return (
    <section id="top" className="relative isolate overflow-hidden bg-hero text-hero-foreground">
      <HeroBackdrop src={industry.image} alt={`${shownName} interior`} />
      <div aria-hidden className="hero-overlay absolute inset-0" />
      <div aria-hidden className="season-dots pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-hero-foreground">Davy Studios · Cape Town</p>
          <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-hero-accent">
            <Icon className="size-3.5" />
            {shownName}
          </p>
          <h1 className="hero-type red-letter mt-5 text-4xl text-hero-foreground sm:text-6xl">
            Secure your slot. Your website template follows in 24 hours.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-hero-muted sm:text-lg">
            Confirm your quote on WhatsApp, pay your deposit by EFT and we get building.
            Starter and Business Pro sites: template in 24 hours, finished in 48 with one round of revisions.
            Approve your site, pay the balance by EFT, and go live on your custom domain.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MoodButton asChild size="lg" variant="hero">
              <a href={buildWhatsAppLink({ industry: industryLabel, business: businessName })} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
            </MoodButton>
            <MoodButton asChild size="lg" variant="heroOutline">
              <a href="#tiers">
                See our packages <ArrowDown />
              </a>
            </MoodButton>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-hero-foreground/20 pt-6">
            {[
              ["24h", "Initial template"],
              ["48h", "Finished website"],
              ["1", "Revision round"],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="hero-type text-2xl sm:text-3xl">{k}</dt>
                <dd className="mt-1 text-xs text-hero-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}