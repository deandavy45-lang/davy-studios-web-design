import { describe, expect, it } from "vitest";
import { PAYSTACK_LINKS, WEBSITE_WORKFLOW } from "@/lib/site";

describe("Website build milestones", () => {
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

describe("Paystack payment destinations", () => {
  it("uses the requested deposit placeholder", () => {
    expect(PAYSTACK_LINKS.deposit).toBe("https://paystack.com/pay/davystudios-deposit");
  });
  it("uses the requested final balance placeholder", () => {
    expect(PAYSTACK_LINKS.balance).toBe("https://paystack.com/pay/davystudios-balance");
  });
});