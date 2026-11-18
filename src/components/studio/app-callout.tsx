import { useEffect, useState } from "react";
import { ChevronDown, Check, Menu, Star, MapPin, Clock, Lock, LayoutGrid, Bell, ExternalLink } from "lucide-react";
import { SITE, TIER_LABELS, buildWhatsAppLink, type TierId } from "@/lib/site";
import { findIndustry, type Industry } from "@/lib/industries";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./whatsapp-icon";

// url: live site. embed: "self" renders this site in an iframe; external sites with
// frame-blocking headers show a mock-up plus an "open live" link instead.
interface Project { id: string; title: string; industry: string; kind: "site" | "app"; note: string; url?: string; embed?: "self" }

const TIER_INFO: Record<TierId, { summary: string; points: string[] }> = {
  starter: { summary: "A fast, single-page site that gets you found and booked.", points: ["One mobile-first page", "Your colours & fonts", "1 revision round", "Live in 48 hours"] },
  pro: { summary: "A multi-page business site with hosting and ongoing support.", points: ["Multiple pages & galleries", "Service & price menus", "Local Google SEO", "Monthly hosting & support"] },
  flagship: { summary: "Bespoke design and architecture for brands that need more.", points: ["Fully custom multi-page design", "Advanced security", "Custom integrations", "Dedicated build partner"] },
  app: { summary: "Full web & mobile applications, scoped after a discovery chat.", points: ["Logins, dashboards & data", "Payments & integrations", "Milestones agreed to scope", "Deposit, then balance before launch"] },
};

// Sample showcase builds per tier (illustrative demos, except The Keep).
const PORTFOLIO: Record<TierId, Project[]> = {
  starter: [
    { id: "s0", title: "Davy Studios", industry: "photography", kind: "site", note: "This site — fast single-page agency build", embed: "self" },
    { id: "s1", title: "Belle Âme Salon", industry: "hair-salon", kind: "site", note: "One-page booking site" },
    { id: "s2", title: "Bree St Bakehouse", industry: "cafe", kind: "site", note: "Menu & hours page" },
    { id: "s3", title: "Gentlemen's Quarter", industry: "barber", kind: "site", note: "Walk-in barbershop page" },
  ],
  pro: [
    { id: "p1", title: "Bright Smile Dental Studio", industry: "dental", kind: "site", note: "Multi-page practice site (mock-up)" },
    { id: "p2", title: "Atlantic Seaboard Realty", industry: "real-estate", kind: "site", note: "Listings & gallery" },
    { id: "p3", title: "The Vine Room", industry: "restaurant", kind: "site", note: "Menus & reservations" },
  ],
  flagship: [
    { id: "f1", title: "The Keep — Info Site", industry: "law", kind: "site", note: "Advanced multi-page custom build", url: SITE.theKeepUrl },
    { id: "f2", title: "Mitchell & Venter Attorneys", industry: "law", kind: "site", note: "Bespoke firm site" },
    { id: "f3", title: "Vineyard Lodge Franschhoek", industry: "guesthouse", kind: "site", note: "Bespoke booking experience" },
  ],
  app: [
    { id: "a0", title: "The Keep Vault", industry: "accounting", kind: "app", note: "Live secure vault application", url: SITE.theKeepAppUrl },
    { id: "a1", title: "Iron & Oak Member App", industry: "fitness", kind: "app", note: "Class booking app", url: SITE.theKeepAppUrl },
    { id: "a2", title: "Paws & Co. Pet Portal", industry: "vet", kind: "app", note: "Pet records & reminders", url: SITE.theKeepAppUrl },
    { id: "a3", title: "Still Point Studio App", industry: "yoga", kind: "app", note: "Memberships & schedule", url: SITE.theKeepAppUrl },
  ],
};

const TABS: TierId[] = ["starter", "pro", "flagship", "app"];

// Phone screen geometry: the frame is w-[270px] with a 7px border, so the screen is 256 x 540.
// The embedded page renders at a real phone width (390px) and is scaled down to fit.
const SCREEN_W = 256;
const SCREEN_H = 540;
const EMBED_W = 390;
const EMBED_SCALE = SCREEN_W / EMBED_W;
const EMBED_H = Math.round(SCREEN_H / EMBED_SCALE);

export function AppCallout() {
  // The Keep Vault (live consumer app) is the premier showcase, so it opens first.
  const [tier, setTier] = useState<TierId>("app");
  const [openTier, setOpenTier] = useState<TierId | null>(null);
  const [project, setProject] = useState<Project>(PORTFOLIO.app[0]!);

  return (
    <section id="portfolio" className="px-4 py-16 md:py-24">
      <div className="card-mood mx-auto grid max-w-6xl gap-10 overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground sm:p-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="min-w-0">
          <h2 className="display-type text-3xl sm:text-4xl">Not sure which tier fits your business? Test-drive them live.</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed opacity-85">
            Explore working examples across every category. Pick your tier, select a sample build, and scroll the interactive preview live on the right before you choose.
          </p>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {TABS.map((t) => {
              const open = openTier === t;
              return (
                <div key={t} className="min-w-0">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => { setTier(t); setOpenTier(open ? null : t); }}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-lg border border-primary-foreground/30 px-4 py-3 text-left text-sm font-semibold transition-colors",
                      tier === t ? "bg-primary-foreground text-primary" : "bg-primary-foreground/5 hover:bg-primary-foreground/15",
                    )}
                  >
                    <span className="truncate">{TIER_LABELS[t]}</span>
                    <ChevronDown className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")} />
                  </button>
                  {open && (
                    <ul className="mt-1 overflow-hidden rounded-lg bg-card text-card-foreground shadow-lg animate-in fade-in slide-in-from-top-1">
                      {PORTFOLIO[t].map((p) => (
                        <li key={p.id}>
                          <button
                            type="button"
                            onClick={() => { setProject(p); setOpenTier(null); }}
                            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-muted"
                          >
                            <span className="min-w-0 flex-1">
                              <span className="block truncate font-medium">{p.title}</span>
                              <span className="block truncate text-xs text-muted-foreground">{p.note}</span>
                            </span>
                            {project.id === p.id && <Check className="size-4 shrink-0 text-primary" />}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          <div key={tier} className="mt-6 rounded-xl border border-primary-foreground/25 bg-primary-foreground/10 p-5 animate-in fade-in duration-300">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">{TIER_LABELS[tier]}</p>
            <p className="mt-1 text-sm font-medium">{TIER_INFO[tier].summary}</p>
            <ul className="mt-3 grid gap-1.5 text-sm opacity-90 sm:grid-cols-2">
              {TIER_INFO[tier].points.map((pt) => (
                <li key={pt} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0" />{pt}</li>
              ))}
            </ul>
            {tier === "app" && (
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
        </div>

        <div className="mx-auto w-[270px]">
          <div className="rounded-[2.6rem] border-[7px] border-phone bg-phone shadow-2xl">
            <div key={project.id} data-theme={findIndustry(project.industry).theme} className="phone-scroll h-[540px] overflow-x-hidden rounded-[2rem] bg-background text-foreground animate-in fade-in duration-300">
              <ProjectScreen project={project} industry={findIndustry(project.industry)} />
            </div>
          </div>
          <p className="mt-3 text-center text-xs opacity-80">
            {TIER_LABELS[tier]} · <span className="font-semibold">{project.title}</span> · scroll inside
          </p>
        </div>
      </div>
    </section>
  );
}

function ProjectScreen({ project, industry }: { project: Project; industry: Industry }) {
  const [origin, setOrigin] = useState<string | null>(null);
  useEffect(() => setOrigin(window.location.origin), []);
  if (project.embed === "self") {
    return origin ? (
      <div className="relative h-full w-full overflow-hidden">
        <iframe
          title={project.title}
          src={`${origin}/`}
          loading="lazy"
          className="absolute left-0 top-0 origin-top-left border-0"
          style={{ width: EMBED_W, height: EMBED_H, transform: `scale(${EMBED_SCALE})` }}
        />
      </div>
    ) : null;
  }
  const isKeep = !!project.url;
  return (
    <div className="text-[11px]">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-bar px-4 py-3 text-bar-foreground">
        <span className="truncate font-semibold">{project.title}</span>
        {project.kind === "app" ? <Bell className="size-3.5" /> : <Menu className="size-3.5" />}
      </div>
      {project.url && (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 bg-secondary px-4 py-2 font-semibold text-secondary-foreground">
          Open live {project.kind === "app" ? "demo app" : "site"} <ExternalLink className="size-3" />
        </a>
      )}
      {project.kind === "app" ? (
        <div className="space-y-3 p-4">
          <p className="display-type text-lg">Good morning 👋</p>
          <img src={industry.image} alt="" loading="lazy" className="aspect-video w-full rounded-xl object-cover" />
          <div className="grid grid-cols-2 gap-2">
            {["Book", "Schedule", "Profile", "Messages"].map((l) => (
              <div key={l} className="flex flex-col items-center gap-1 rounded-xl bg-card p-3 text-card-foreground">
                <LayoutGrid className="size-4 text-primary" />{l}
              </div>
            ))}
          </div>
          <p className="pt-2 font-semibold">Upcoming</p>
          {["Mon 07:00", "Wed 18:00", "Sat 09:00"].map((t) => (
            <div key={t} className="flex items-center justify-between rounded-lg bg-card p-3 text-card-foreground">
              <span>{industry.sample.cta.replace("Book ", "")}</span><span className="text-muted-foreground">{t}</span>
            </div>
          ))}
          <div className="rounded-lg bg-primary p-3 text-center font-semibold text-primary-foreground">{industry.sample.cta}</div>
        </div>
      ) : (
        <>
          <img src={industry.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <div className="space-y-2 bg-card p-4 text-center text-card-foreground">
            <p className="display-type text-xl">{project.title}</p>
            <p className="text-muted-foreground">{isKeep ? "Your documents, secured and organised." : industry.sample.headline}</p>
            <div className="btn-mood flex h-9 items-center justify-center bg-primary text-primary-foreground">{isKeep ? "Open The Keep" : industry.sample.cta}</div>
          </div>
          <div className="space-y-2 p-4">
            {[
              { i: isKeep ? Lock : Star, t: isKeep ? "Bank-grade security" : "Rated 4.9 by locals" },
              { i: MapPin, t: SITE.city },
              { i: Clock, t: "Open Mon–Sat" },
            ].map(({ i: I, t }) => (
              <div key={t} className="flex items-center gap-2 rounded-lg bg-muted p-3"><I className="size-3.5 text-primary" />{t}</div>
            ))}
            <p className="pt-2 text-muted-foreground">{industry.story}</p>
            <div className="mt-2 flex h-9 items-center justify-center gap-1.5 rounded-md bg-whatsapp font-semibold text-whatsapp-foreground">
              <WhatsAppIcon className="size-3.5" /> Contact on WhatsApp
            </div>
            <p className="pt-4 text-center text-[9px] text-muted-foreground">Sample build by {SITE.name}</p>
          </div>
        </>
      )}
    </div>
  );
}