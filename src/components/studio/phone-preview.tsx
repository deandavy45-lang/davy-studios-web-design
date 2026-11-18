import { Menu } from "lucide-react";
import type { Industry } from "@/lib/industries";
import { WhatsAppIcon } from "./whatsapp-icon";

export function PhonePreview({
  industry,
  businessName,
  tone = "hero",
}: {
  industry: Industry;
  businessName: string;
  tone?: "hero" | "page";
}) {
  const name = businessName.trim() || industry.sample.business;
  return (
    <div className="relative mx-auto w-[252px] animate-float-soft sm:w-[280px]">
      <div className="rounded-[2.6rem] border-[7px] border-phone bg-phone p-0 shadow-2xl ring-1 ring-hero-foreground/15">
        <div className="overflow-hidden rounded-[2rem] bg-background">
          <div className="flex items-center justify-between bg-bar px-4 pb-2 pt-2.5 text-[9px] text-bar-foreground">
            <span>9:41</span>
            <span className="h-3.5 w-16 rounded-full bg-phone" />
            <span>5G</span>
          </div>
          <div className="flex items-center justify-between bg-bar px-4 pb-2.5 text-bar-foreground">
            <span className="max-w-[80%] truncate text-[11px] font-semibold">{name}</span>
            <Menu className="size-3.5" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              key={industry.image}
              src={industry.image}
              alt=""
              loading="lazy"
              width={1536}
              height={864}
              className="size-full object-cover animate-in fade-in duration-500"
            />
            <div aria-hidden className="season-dots absolute inset-0" />
          </div>
          <div className="bg-card px-4 pb-4 pt-4 text-center text-card-foreground">
            <p className="display-type line-clamp-2 break-words text-xl">{name}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{industry.sample.headline}</p>
            <span className="btn-mood mt-3 flex h-9 w-full items-center justify-center bg-primary px-3 text-[11px] text-primary-foreground">
              {industry.sample.cta}
            </span>
            <span className="mt-2 flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-whatsapp text-[11px] font-semibold text-whatsapp-foreground">
              <WhatsAppIcon className="size-3.5" /> Contact on WhatsApp
            </span>
          </div>
        </div>
      </div>
      <p className={tone === "hero" ? "mt-4 text-center text-xs text-hero-muted" : "mt-4 text-center text-xs text-muted-foreground"}>
        Live sample · <span className={tone === "hero" ? "font-medium text-hero-foreground" : "font-medium text-foreground"}>{businessName.trim() ? "your business" : industry.name}</span>
      </p>
    </div>
  );
}
