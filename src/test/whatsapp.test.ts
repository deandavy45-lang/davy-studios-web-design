import { describe, expect, it } from "vitest";
import { buildWhatsAppLink } from "@/lib/site";

const message = (link: string) => decodeURIComponent(link.split("text=")[1] ?? "");

describe("WhatsApp link", () => {
  it("opens Davy Studios' number 081 497 7059 in international format", () => {
    expect(buildWhatsAppLink({}).startsWith("https://wa.me/27814977059?text=")).toBe(true);
  });
  it("passes the selected industry and typed business name into the message", () => {
    const text = message(buildWhatsAppLink({ industry: "Automotive & Mechanic", business: "Cape Precision Auto" }));
    expect(text).toContain("Industry: Automotive & Mechanic");
    expect(text).toContain("Business: Cape Precision Auto");
  });
  it("includes the chosen package", () => {
    expect(message(buildWhatsAppLink({ tier: "pro" }))).toContain("Interested in: Business Pro");
  });
  it("leaves out a blank business name", () => {
    expect(message(buildWhatsAppLink({ business: "   " }))).not.toContain("Business:");
  });
});
