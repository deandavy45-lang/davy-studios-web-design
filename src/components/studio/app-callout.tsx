import { ExternalLink } from "lucide-react";
import { APP_IDEA_HOOK, SITE, TIER_LABELS, buildWhatsAppLink, type TierId } from "@/lib/site";
import { WhatsAppIcon } from "./whatsapp-icon";

// Only samples with a url are live links (open in a new tab). Everything else is a concept design.
interface Sample { id: string; title: string; note: string; kind: "site" | "app"; url?: string }

const TIER_SUMMARY: Record<TierId, string> = {
  starter: "A fast, single-page site that gets you found and booked.",
  pro: "A multi-page business site with hosting and ongoing support.",
  flagship: "Bespoke design and architecture for brands that need more.",
  app: "Full web & mobile applications, scoped after a discovery chat.",
};

const PORTFOLIO: Record<TierId, Sample[]> = {
  starter: [
    { id: "s0", title: "Davy Studios", kind: "site", note: "Our own fast single-page agency build", url: SITE.url },
    { id: "s1", title: "Belle Âme Salon", kind: "site", note: "One-page booking site" },
    { id: "s2", title: "Bree St Bakehouse", kind: "site", note: "Menu & hours page" },
    { id: "s3", title: "Gentlemen's Quarter", kind: "site", note: "Walk-in barbershop page" },
  ],
  pro: [
    { id: "p1", title: "Bright Smile Dental Studio", kind: "site", note: "Multi-page practice site" },
    { id: "p2", title: "Atlantic Seaboard Realty", kind: "site", note: "Listings & gallery" },
    { id: "p3", title: "The Vine Room", kind: "site", note: "Menus & reservations" },
  ],
  flagship: [
    { id: "f1", title: "The Keep — Info Site", kind: "site", note: "Advanced multi-page custom build", url: SITE.theKeepUrl },
    { id: "f2", title: "Mitchell & Venter Attorneys", kind: "site", note: "Bespoke firm site" },
    { id: "f3", title: "Vineyard Lodge Franschhoek", kind: "site", note: "Bespoke booking experience" },
  ],
  app: [
    { id: "a0", title: "The Keep Vault", kind: "app", note: "Live secure vault application", url: SITE.theKeepAppUrl },
    { id: "a4", title: "Keep Forever", kind: "app", note: "Proof-of-concept app demo", url: SITE.keepForeverUrl },
    { id: "a1", title: "Iron & Oak Member App", kind: "app", note: "Class booking app" },
    { id: "a2", title: "Paws & Co. Pet Portal", kind: "app", note: "Pet records & reminders" },
    { id: "a3", title: "Still Point Studio App", kind: "app", note: "Memberships & schedule" },
  ],
};

const TIERS: TierId[] = ["starter", "pro", "flagship", "app"];

export function AppCallout() {
  return (
    <section id="portfolio" className="px-4 py-16 md:py-24">
      <div className="card-mood mx-auto max-w-6xl overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground sm:p-10">
        <h2 className="display-type max-w-3xl text-3xl sm:text-4xl">Not sure which tier fits your business? Test-drive them live.</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed opacity-85">
          Open our live builds in a new tab. Concept designs show what each tier can look like for your industry.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {TIERS.map((t) => (
            <div key={t} className="min-w-0">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">{TIER_LABELS[t]}</h3>
              <p className="mt-1 text-sm font-medium">{TIER_SUMMARY[t]}</p>
              {t === "app" && (
                <p className="mt-3 inline-block rounded-md bg-primary-foreground/15 px-3 py-1.5 text-sm font-semibold">
                  {APP_IDEA_HOOK}
                </p>
              )}
              <ul className="mt-4 space-y-2">
                {PORTFOLIO[t].map((s) => (
                  <li key={s.id}>
                    <SampleCard sample={s} />
                  </li>
                ))}
              </ul>
              {t === "app" && (
                <a
                  href={buildWhatsAppLink({ tier: "app" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-mood mt-4 inline-flex items-center gap-2 bg-whatsapp px-4 py-2.5 text-sm text-whatsapp-foreground"
                >
                  <WhatsAppIcon className="size-4" /> Discuss a custom app
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SampleCard({ sample }: { sample: Sample }) {
  if (sample.url) {
    return (
      <a
        href={sample.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-lg bg-card px-4 py-3 text-card-foreground shadow-sm transition-colors hover:bg-muted"
      >
        <span className="flex items-start justify-between gap-3">
          <span className="min-w-0">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Live {sample.kind}</span>
            <span className="mt-1 block font-semibold">{sample.title}</span>
          </span>
          <ExternalLink className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        </span>
        <span className="mt-1 block text-sm text-muted-foreground">{sample.note}</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <div className="rounded-lg border border-dashed border-primary-foreground/30 px-4 py-3">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] opacity-70">Concept design</span>
      <span className="mt-1 block font-semibold">{sample.title}</span>
      <span className="mt-1 block text-sm opacity-80">{sample.note}</span>
    </div>
  );
}