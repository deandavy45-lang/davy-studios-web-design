import { useState } from "react";
import { SITE, TIER_LABELS, buildWhatsAppLink, type TierId } from "@/lib/site";
import { cn } from "@/lib/utils";
import { IndustryPicker } from "./industry-picker";
import { MoodButton } from "./mood-button";
import type { Industry } from "@/lib/industries";
import { WhatsAppIcon } from "./whatsapp-icon";
import { BuildWorkflow } from "./build-workflow";
import { PaymentActions } from "./payment-actions";

const OPTIONS: { id: TierId; note: string }[] = [
  { id: "starter", note: "24h template · 48h finished site" },
  { id: "pro", note: "Multi-page · deposit + final balance" },
  { id: "flagship", note: "Bespoke · deposit + final balance" },
  { id: "app", note: "Custom timeline · two payments" },
];

interface Props {
  industry: Industry;
  onIndustry: (id: string) => void;
  business: string;
  onBusiness: (name: string) => void;
}

export function Inquiry({ industry, onIndustry, business, onBusiness }: Props) {
  const [tier, setTier] = useState<TierId>("starter");

  return (
    <section id="contact" className="border-t">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 md:grid-cols-[1fr_1.1fr] md:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Preview · Deposit · Launch</p>
          <h2 className="display-type mt-3 text-4xl text-foreground">Two steps to your new site.</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Your business deserves a confident start. Review your preview, confirm your quote and secure your build with an initial deposit.
          </p>
          <BuildWorkflow />
          <p className="mt-6 text-sm text-muted-foreground">
            Or message us directly on <span className="font-semibold text-foreground">{SITE.whatsappDisplay}</span>
          </p>
        </div>

        <div className="border-t pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
        <form
          className="text-foreground"
          onSubmit={(e) => {
            e.preventDefault();
            window.open(buildWhatsAppLink({ tier, business, industry: industry.name }), "_blank", "noopener");
          }}
        >
          <label className="block text-sm font-semibold" htmlFor="industry">
            Your industry
          </label>
          <div className="mt-2">
            <IndustryPicker id="industry" value={industry.id} onChange={onIndustry} tone="form" />
          </div>

          <label className="mt-6 block text-sm font-semibold" htmlFor="business">
            Business name
          </label>
          <input
            id="business"
            value={business}
            onChange={(e) => onBusiness(e.target.value.slice(0, 60))}
            placeholder="e.g. Bree St Bakehouse"
            autoComplete="organization"
            className="mt-2 h-11 w-full rounded-md border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold">Which option interests you?</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {OPTIONS.map((o) => {
                const on = tier === o.id;
                return (
                  <label
                    key={o.id}
                    className={cn(
                      "cursor-pointer rounded-lg border p-3 text-sm",
                      on ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                  >
                    <input type="radio" name="tier" value={o.id} checked={on} onChange={() => setTier(o.id)} className="sr-only" />
                    <span className="block font-semibold">{TIER_LABELS[o.id]}</span>
                    <span className={cn("block text-xs", on ? "opacity-80" : "text-muted-foreground")}>{o.note}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {tier === "app"
              ? "App builds follow a scope-based timeline. Final balance upon approval, before launch."
              : "Quoted on WhatsApp. Deposit to kick off; final balance upon approval."}
          </p>
          <MoodButton type="submit" variant="whatsapp" size="lg" className="mt-6 w-full">
            <WhatsAppIcon /> Chat on WhatsApp
          </MoodButton>
        </form>
          <div className="mt-6 border-t">
            <PaymentActions />
          </div>
        </div>
      </div>
    </section>
  );
}
