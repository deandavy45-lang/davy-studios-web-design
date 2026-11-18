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

export const WEBSITE_WORKFLOW = {
  initialDeliveryHours: 24,
  finishedDeliveryHours: 48,
  revisionRounds: 1,
  launchRequiresFinalBalance: true,
  finalBalanceRequiresApproval: true,
} as const;

// Replace these example URLs with verified merchant payment links before accepting payments.
export const PAYSTACK_LINKS = {
  deposit: "https://paystack.com/pay/davystudios-deposit",
  balance: "https://paystack.com/pay/davystudios-balance",
} as const;

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
  const lines = ["Hi Davy Studios! I'd like to review my business preview and confirm a quote before paying the initial deposit to secure my build slot."];
  const business = opts.business?.trim();
  if (business) lines.push(`Business: ${business}`);
  if (opts.industry) lines.push(`Industry: ${opts.industry}`);
  if (opts.tier) lines.push(`Interested in: ${TIER_LABELS[opts.tier]}`);
  if (opts.tier === "app") {
    lines.push("Please confirm my app milestones and delivery timeline. Initial deposit to kick off; final balance upon approval, before launch.");
  } else {
    lines.push("I'm enquiring about the Davy Studios 24-hour build package.");
    lines.push(`Initial website template within ${WEBSITE_WORKFLOW.initialDeliveryHours} hours of deposit; ${WEBSITE_WORKFLOW.revisionRounds} structured round of corrections; finished site ready within ${WEBSITE_WORKFLOW.finishedDeliveryHours} hours. Final balance upon approval, before custom-domain launch.`);
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(lines.join("\n"))}`;
}