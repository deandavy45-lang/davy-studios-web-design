import { describe, expect, it } from "vitest";
import * as site from "@/lib/site";
import {
  CUSTOM_BUILD_TIMELINE,
  PAYMENT_STEPS,
  SITE,
  WEBSITE_WORKFLOW,
  buildWhatsAppLink,
  type TierId,
} from "@/lib/site";

function messageFor(tier?: TierId): string {
  const url = new URL(buildWhatsAppLink({ tier }));
  return url.searchParams.get("text") ?? "";
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

describe("EFT payment workflow", () => {
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
});

describe("WhatsApp message templates", () => {
  it("opens the chat on the Davy Studios number", () => {
    expect(buildWhatsAppLink({})).toContain(`https://wa.me/${SITE.whatsappNumber}?text=`);
  });

  it.each<TierId | undefined>([undefined, "starter", "pro", "flagship", "app"])(
    "puts the deposit before development and never implies a free preview (%s)",
    (tier) => {
      const text = messageFor(tier);
      expect(text).toContain("I'd like to confirm my quote and pay the initial deposit to kick off development.");
      expect(text).toContain("non-refundable initial deposit (EFT)");
      expect(text).toContain("development starts upon proof of payment");
      expect(text.toLowerCase()).not.toContain("preview");
    },
  );

  it.each<TierId | undefined>([undefined, "starter", "pro"])(
    "gives the 24h/48h turnaround from proof of payment (%s)",
    (tier) => {
      const text = messageFor(tier);
      expect(text).toContain("24 hours of proof of payment");
      expect(text).toContain("48 hours");
    },
  );

  it.each<TierId>(["flagship", "app"])("uses the scoped timeline, not 24h/48h (%s)", (tier) => {
    const text = messageFor(tier);
    expect(text).toContain(CUSTOM_BUILD_TIMELINE);
    expect(text).not.toContain("24 hours");
    expect(text).not.toContain("48 hours");
  });
});