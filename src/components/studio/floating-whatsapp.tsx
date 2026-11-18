import { buildWhatsAppLink } from "@/lib/site";
import { WhatsAppIcon } from "./whatsapp-icon";

export function FloatingWhatsApp({ industry, business }: { industry: string; business: string }) {
  return (
    <a
      href={buildWhatsAppLink({ industry, business })}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Davy Studios on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg ring-4 ring-background/70 hover:scale-105"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
