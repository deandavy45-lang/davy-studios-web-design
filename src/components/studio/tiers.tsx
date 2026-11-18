import { Check, ExternalLink } from "lucide-react";
import { SITE, buildWhatsAppLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { MoodButton } from "./mood-button";

const TIERS = [
  {
    id: "starter" as const,
    name: "Essential Starter",
    kicker: "Tier 1",
    pitch:
      "One fast, mobile-first page. Deposit to kick off, initial template in 24 hours, one structured revision round and a finished site within 48 hours. Final balance paid, then your custom domain goes live — no agency lock-in.",
    features: ["One beautiful, mobile-first page", "Your mood, colours & fonts", "One structured round of corrections", "Custom-domain launch after final payment", "Yours to keep — no lock-in"],
  },
  {
    id: "pro" as const,
    name: "Business Pro",
    kicker: "Tier 2",
    pitch: "A multi-page site with monthly hosting and support. Deposit secures your slot; initial template in 24 hours, one structured revision round and finished site within 48 hours. Launch follows final balance payment.",
    features: ["Multiple pages", "Photo galleries", "Service & price menus", "Local Google SEO", "Monthly hosting & support"],
  },
  {
    id: "flagship" as const,
    name: "Custom Flagship",
    kicker: "Tier 3",
    pitch: "Bespoke design and architecture, like The Keep. Deposit to kick off; scoped per project, from weeks to months depending on complexity and custom architecture. Final balance before custom-domain launch.",
    features: ["Fully bespoke multi-page design", "Advanced security", "Custom features & integrations", "Dedicated build partner"],
  },
];

export function Tiers({ industry, business }: { industry: string; business: string }) {
  return (
    <section id="tiers" className="-scroll-mt-16 border-t bg-muted/50 md:-scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Packages</p>
        <h2 className="display-type mt-3 max-w-2xl text-4xl text-foreground sm:text-5xl">
          Transparent options for every stage.
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">Quoted on WhatsApp. Two once-off build payments: an initial deposit to secure your slot, then the final balance before launch. Business Pro hosting and support are quoted separately.</p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {TIERS.map((t) => {
            const current = t.id === "starter";
            const flagship = t.id === "flagship";
            return (
              <article
                key={t.id}
                className={cn(
                  "card-mood relative flex flex-col rounded-xl border bg-card p-6 text-card-foreground sm:p-8",
                  current && "border-2 border-primary",
                )}
              >
                {current && (
                  <span className="btn-mood absolute -top-3 left-6 bg-primary px-3 py-1 text-[10px] text-primary-foreground">
                    You are looking at this tier
                  </span>
                )}
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{t.kicker}</p>
                <h3 className="display-type mt-2 text-3xl">{t.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.pitch}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                {flagship && (
                  <div className="mt-6 rounded-lg border bg-secondary p-4 text-secondary-foreground">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">Featured flagship</p>
                    <p className="display-type mt-1 text-2xl">The Keep</p>
                    <p className="mt-1 text-xs opacity-80">Proof of advanced multi-page design, security and architecture.</p>
                    <a
                      href={SITE.theKeepUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold underline-offset-4 hover:underline"
                    >
                      View the web design (info site) <ExternalLink className="size-3" />
                    </a>
                  </div>
                )}
                <div className="mt-auto flex flex-col gap-2 pt-8">
                  {flagship ? (
                    <>
                      <MoodButton asChild>
                        <a href={SITE.theKeepAppUrl} target="_blank" rel="noreferrer">
                          Open The Keep app <ExternalLink />
                        </a>
                      </MoodButton>
                      <MoodButton asChild variant="ghost" size="sm">
                        <a href={buildWhatsAppLink({ tier: t.id, industry, business })} target="_blank" rel="noreferrer">
                          Discuss a flagship build
                        </a>
                      </MoodButton>
                    </>
                  ) : (
                    <MoodButton asChild variant={current ? "primary" : "outline"}>
                      <a href={buildWhatsAppLink({ tier: t.id, industry, business })} target="_blank" rel="noreferrer">
                          Confirm {t.name} quote
                      </a>
                    </MoodButton>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}