import { describe, expect, it } from "vitest";
import * as site from "@/lib/site";
import {
  APP_IDEA_HOOK,
  DEPOSIT_TERMS,
  OTHER_INDUSTRY_ID,
  PAYMENT_STEPS,
  PRICE_BEAT_GUARANTEE,
  SITE,
  TIER_LABELS,
  WEBSITE_WORKFLOW,
  buildStandardReply,
  buildWhatsAppLink,
  resolveIndustryLabel,
  type TierId,
} from "@/lib/site";

const TIERS: TierId[] = ["starter", "pro", "flagship", "app"];

function messageFor(opts: Parameters<typeof buildWhatsAppLink>[0] = {}): string {
  return new URL(buildWhatsAppLink(opts)).searchParams.get("text") ?? "";
}

describe("Website build milestones (Starter and Business Pro)", () => {
  it("delivers the initial template within 24 hours", () => {
    expect(WEBSITE_WORKFLOW.initialDeliveryHours).toBe(24);
  });
  it("has the finished site ready within 48 hours", () => {
    expect(WEBSITE_WORKFLOW.finishedDeliveryHours).toBe(48);
  });
  it("includes one structured revision round", () => {
    expect(WEBSITE_WORKFLOW.revisionRounds).toBe(1);
  });
  it("requires final balance payment before launch", () => {
    expect(WEBSITE_WORKFLOW.launchRequiresFinalBalance).toBe(true);
  });
  it("requires client approval before the final balance is due", () => {
    expect(WEBSITE_WORKFLOW.finalBalanceRequiresApproval).toBe(true);
  });
});

describe("EFT payment workflow and terms", () => {
  it("lists the four steps in order", () => {
    expect(PAYMENT_STEPS).toEqual([
      "Confirm your quote on WhatsApp",
      "Receive banking details",
      "Make your EFT payment",
      "We kick off development upon proof of payment",
    ]);
  });
  it("no longer exports any Paystack payment links", () => {
    expect("PAYSTACK_LINKS" in site).toBe(false);
  });
  it("states the non-refundable deposit once, in the terms", () => {
    expect(DEPOSIT_TERMS).toContain("non-refundable");
    expect(DEPOSIT_TERMS).toContain("secures your build slot");
    expect(PAYMENT_STEPS.join(" ")).not.toContain("non-refundable");
  });
});

describe("Site promises", () => {
  it("offers a price-beat guarantee on registered competitors' written quotes", () => {
    expect(PRICE_BEAT_GUARANTEE).toContain("registered competitor");
    expect(PRICE_BEAT_GUARANTEE).toContain("written quote");
    expect(PRICE_BEAT_GUARANTEE).toContain("WhatsApp");
    expect(PRICE_BEAT_GUARANTEE).toContain("beat");
  });
  it("invites app ideas", () => {
    expect(APP_IDEA_HOOK).toBe("Got an app idea? Time to see it come to life.");
  });
});

describe("WhatsApp message templates", () => {
  it("opens the chat on the Davy Studios number", () => {
    expect(buildWhatsAppLink({})).toContain(`https://wa.me/${SITE.whatsappNumber}?text=`);
  });

  it.each(TIERS)("names the selected package, business and industry (%s)", (tier) => {
    const text = messageFor({ tier, business: "Bree St Bakehouse", industry: "Cafe" });
    expect(text).toContain(`the ${TIER_LABELS[tier]} package`);
    expect(text).toContain("for Bree St Bakehouse");
    expect(text).toContain("(Cafe)");
  });

  it("works without a package, business or industry", () => {
    expect(messageFor({})).toContain("I'd like to get started with a new website.");
  });

  it.each([undefined, ...TIERS])("is happy to pay the deposit and asks for next steps (%s)", (tier) => {
    const text = messageFor({ tier });
    expect(text).toContain("happy to pay the non-refundable initial deposit");
    expect(text).toContain("What are the next steps?");
    expect(text.toLowerCase()).not.toContain("preview");
  });

  it("states the non-refundable deposit only once per message", () => {
    expect(messageFor({ tier: "starter" }).match(/non-refundable/g)).toHaveLength(1);
  });

  it("includes one reference site", () => {
    const text = messageFor({ references: ["https://example.com"] });
    expect(text).toContain("A site whose look and feel I like: https://example.com");
  });

  it("includes two reference sites and drops extras and blanks", () => {
    const text = messageFor({ references: ["https://a.com", "  ", "https://b.com", "https://c.com"] });
    expect(text).toContain("Sites whose look and feel I like: https://a.com, https://b.com");
    expect(text).not.toContain("https://c.com");
  });

  it("leaves out the reference line when none are given", () => {
    expect(messageFor({ references: ["", "  "] })).not.toContain("look and feel");
  });

  it("stays short and natural", () => {
    const text = messageFor({ tier: "app", business: "Bree St Bakehouse", industry: "Cafe", references: ["https://a.com", "https://b.com"] });
    expect(text.length).toBeLessThan(400);
  });
});

describe("Standard follow-up reply", () => {
  it("thanks them for their package and asks for two example sites", () => {
    const text = buildStandardReply({ tier: "starter", name: "Thandi" });
    expect(text).toContain("Hi Thandi");
    expect(text).toContain("thank you for your interest in our Essential Starter package");
    expect(text).toContain("two example website links");
  });
  it("works without a name or package", () => {
    const text = buildStandardReply({});
    expect(text).toContain("Hi,");
    expect(text).toContain("thank you for your interest in Davy Studios");
  });
});

describe("Industry label (including Other)", () => {
  const dental = { id: "dental", name: "Dental Practice" };
  const other = { id: OTHER_INDUSTRY_ID, name: "Other" };

  it("uses the selected category name and ignores any leftover custom text", () => {
    expect(resolveIndustryLabel(dental, "Florist")).toBe("Dental Practice");
  });
  it("uses the typed text for Other, trimmed and tidied", () => {
    expect(resolveIndustryLabel(other, "   Pet   Grooming  ")).toBe("Pet Grooming");
  });
  it("returns nothing for Other with no text, never a bare Other", () => {
    expect(resolveIndustryLabel(other, "")).toBe("");
    expect(resolveIndustryLabel(other, "    ")).toBe("");
    expect(resolveIndustryLabel(other)).toBe("");
  });
  it("caps the typed text at 60 characters", () => {
    expect(resolveIndustryLabel(other, "x".repeat(100))).toHaveLength(60);
  });
  it("puts the typed industry into the WhatsApp message", () => {
    const text = messageFor({ industry: resolveIndustryLabel(other, "Pet Grooming") });
    expect(text).toContain("(Pet Grooming)");
  });
  it("leaves the industry out of the WhatsApp message when Other has no text", () => {
    const text = messageFor({ industry: resolveIndustryLabel(other, "") });
    expect(text).not.toContain("Other");
    expect(text).not.toContain("()");
    expect(text).toContain("I'd like to get started with a new website.");
  });
});