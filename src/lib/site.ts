export const SITE = {
  name: "Davy Studios",
  city: "Cape Town",
  url: "https://davystudios.co.za",
  whatsappNumber: "27814977059",
  whatsappDisplay: "081 497 7059",
  theKeepUrl: "https://info.thekeepvault.co.za",
  theKeepAppUrl: "https://www.thekeepvault.co.za",
} as const;

export type TierId = "starter" | "pro" | "flagship" | "app";

// Starter and Business Pro: rapid template workflow.
export const WEBSITE_WORKFLOW = {
  initialDeliveryHours: 24,
  finishedDeliveryHours: 48,
  revisionRounds: 1,
  launchRequiresFinalBalance: true,
  finalBalanceRequiresApproval: true,
} as const;

// Custom Flagship and App Development: scoped per project, never a fixed 24h/48h promise.
export const CUSTOM_BUILD_TIMELINE =
  "Timelines are scoped per project, from weeks to months depending on complexity and custom architecture.";

// How every build starts: quote on WhatsApp, EFT deposit, then development.
export const PAYMENT_STEPS = [
  "Confirm your quote on WhatsApp",
  "Receive banking details",
  "Make your EFT payment",
  "We kick off development upon proof of payment",
] as const;

// Stated once, in the payment terms footnote. Do not repeat it elsewhere on the site.
export const DEPOSIT_TERMS = "The initial deposit is non-refundable and secures your build slot.";

export const PRICE_BEAT_GUARANTEE =
  "Price-beat guarantee: share an official written quote from a registered competitor, for comparable work at fair market value, on WhatsApp and we'll beat it.";

export const APP_IDEA_HOOK = "Got an app idea? Time to see it come to life.";

export const TIER_LABELS: Record<TierId, string> = {
  starter: "Essential Starter",
  pro: "Business Pro",
  flagship: "Custom Flagship",
  app: "Custom App Development",
};

// Up to two reference sites, trimmed, blanks dropped.
export function cleanReferences(references?: string[]): string[] {
  return (references ?? [])
    .map((r) => r.trim().slice(0, 200))
    .filter(Boolean)
    .slice(0, 2);
}

export function buildWhatsAppLink(opts: {
  number?: string;
  tier?: TierId;
  business?: string;
  industry?: string;
  references?: string[];
}): string {
  const digits = (opts.number ?? SITE.whatsappNumber).replace(/\D/g, "");
  const business = opts.business?.trim();
  const industry = opts.industry?.trim();
  const references = cleanReferences(opts.references);

  const interest = opts.tier ? `the ${TIER_LABELS[opts.tier]} package` : "a new website";
  const about = [business ? `for ${business}` : "", industry ? `(${industry})` : ""].filter(Boolean).join(" ");

  const lines = [`Hi Davy Studios! I'd like to get started with ${interest}${about ? ` ${about}` : ""}.`];
  if (references.length === 1) {
    lines.push(`A site whose look and feel I like: ${references[0]}`);
  } else if (references.length > 1) {
    lines.push(`Sites whose look and feel I like: ${references.join(", ")}`);
  }
  lines.push("I'm happy to pay the non-refundable initial deposit to secure my build slot. What are the next steps?");
  return `https://wa.me/${digits}?text=${encodeURIComponent(lines.join("\n"))}`;
}

// Our standard WhatsApp reply once a lead has picked a package.
export function buildStandardReply(opts: { tier?: TierId; name?: string }): string {
  const name = opts.name?.trim();
  const pkg = opts.tier ? `our ${TIER_LABELS[opts.tier]} package` : "Davy Studios";
  return `Hi${name ? ` ${name}` : ""}, thank you for your interest in ${pkg}. To give your site a clear visual direction from day one, please send us two example website links you'd like yours to reflect or resemble.`;
}