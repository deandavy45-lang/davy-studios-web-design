export const SITE = {
  name: "Davy Studios",
  city: "Cape Town",
  url: "https://davystudios.co.za",
  whatsappNumber: "27814977059",
  whatsappDisplay: "081 497 7059",
  theKeepUrl: "https://info.thekeepvault.co.za",
  theKeepAppUrl: "https://www.thekeepvault.co.za",
  keepForeverUrl: "https://keepforever.davystudios.co.za",
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

// Industry "Other": the client types their own business type; never send a bare "Other".
export const OTHER_INDUSTRY_ID = "other";

export function resolveIndustryLabel(industry: { id: string; name: string }, otherText = ""): string {
  if (industry.id !== OTHER_INDUSTRY_ID) return industry.name;
  return otherText.trim().replace(/\s+/g, " ").slice(0, 60);
}

// Optional monthly hosting and care plans (fixed prices). Shown in Packages and chosen in the inquiry form.
export type HostingPlanId = "self-hosted" | "managed" | "care";

export interface HostingPlan {
  id: HostingPlanId;
  name: string;
  monthlyRand: number;
  price: string;
  summary: string;
  includes: readonly string[];
}

const monthly = (rand: number) => `R${rand}/month`;

export const HOSTING_PLANS: readonly HostingPlan[] = [
  {
    id: "self-hosted",
    name: "Self-Hosted / Walk-Away",
    monthlyRand: 0,
    price: monthly(0),
    summary: "Once-off build only. You take the full code and run it yourself.",
    includes: ["Once-off build only", "Full code handover to you"],
  },
  {
    id: "managed",
    name: "Managed Hosting & Uptime",
    monthlyRand: 295,
    price: monthly(295),
    summary: "We host it, keep it secure and online, and handle your domain renewals.",
    includes: [
      "Vercel hosting",
      "SSL certificate",
      "Uptime monitoring",
      ".co.za domain renewal management",
      "Up to 2 minor text or photo edits per quarter",
    ],
  },
  {
    id: "care",
    name: "Hosting + Monthly Care",
    monthlyRand: 650,
    price: monthly(650),
    summary: "Everything in Managed Hosting, plus monthly updates and priority support.",
    includes: [
      "Everything in Managed Hosting",
      "Up to 1 hour of monthly content and photo updates",
      "Priority WhatsApp support",
      "Google Business Profile and local SEO check-ins",
    ],
  },
];

export const DOMAIN_AND_EMAIL_NOTE =
  "You always keep ownership of your domain. Custom @yourdomain.co.za business email mailboxes are available on request.";

export function findHostingPlan(id?: HostingPlanId | null): HostingPlan | undefined {
  return id ? HOSTING_PLANS.find((p) => p.id === id) : undefined;
}

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
  hosting?: HostingPlanId | null;
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
  const hosting = findHostingPlan(opts.hosting);
  if (hosting) lines.push(`Hosting: ${hosting.name} (${hosting.price})`);
  lines.push("I'm happy to pay the non-refundable initial deposit to secure my build slot. What are the next steps?");
  return `https://wa.me/${digits}?text=${encodeURIComponent(lines.join("\n"))}`;
}

// Our standard WhatsApp reply once a lead has picked a package.
export function buildStandardReply(opts: { tier?: TierId; name?: string }): string {
  const name = opts.name?.trim();
  const pkg = opts.tier ? `our ${TIER_LABELS[opts.tier]} package` : "Davy Studios";
  return `Hi${name ? ` ${name}` : ""}, thank you for your interest in ${pkg}. To give your site a clear visual direction from day one, please send us two example website links you'd like yours to reflect or resemble.`;
}