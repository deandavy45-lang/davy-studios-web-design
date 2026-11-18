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

export const TIER_LABELS: Record<TierId, string> = {
  starter: "Essential Starter",
  pro: "Business Pro",
  flagship: "Custom Flagship",
  app: "Custom App Development",
};

export function buildWhatsAppLink(opts: {
  number?: string;
  tier?: TierId;
  business?: string;
  industry?: string;
}): string {
  const digits = (opts.number ?? SITE.whatsappNumber).replace(/\D/g, "");
  const lines = ["Hi Davy Studios! I'd like to confirm my quote and pay the initial deposit to kick off development."];
  const business = opts.business?.trim();
  if (business) lines.push(`Business: ${business}`);
  if (opts.industry) lines.push(`Industry: ${opts.industry}`);
  if (opts.tier) lines.push(`Interested in: ${TIER_LABELS[opts.tier]}`);
  if (opts.tier === "app") {
    lines.push("Please confirm my app milestones and quote, then send your banking details for the non-refundable initial deposit (EFT). The deposit secures my build slot and development starts upon proof of payment.");
    lines.push(`${CUSTOM_BUILD_TIMELINE} Final balance upon approval, before launch.`);
  } else if (opts.tier === "flagship") {
    lines.push("I'd like to discuss a custom flagship build. Please confirm my project scope and quote, then send your banking details for the non-refundable initial deposit (EFT). The deposit secures my build slot and development starts upon proof of payment.");
    lines.push(`${CUSTOM_BUILD_TIMELINE} Final balance upon approval, before custom-domain launch.`);
  } else {
    lines.push("I'm enquiring about the Davy Studios 24-hour build package. Please send your banking details for the non-refundable initial deposit (EFT). The deposit secures my build slot and development starts upon proof of payment.");
    lines.push(`Initial website template within ${WEBSITE_WORKFLOW.initialDeliveryHours} hours of proof of payment; ${WEBSITE_WORKFLOW.revisionRounds} structured round of corrections; finished site ready within ${WEBSITE_WORKFLOW.finishedDeliveryHours} hours. Final balance upon approval, before custom-domain launch.`);
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(lines.join("\n"))}`;
}