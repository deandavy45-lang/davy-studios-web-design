import { CreditCard, ExternalLink } from "lucide-react";
import { PAYSTACK_LINKS } from "@/lib/site";
import { MoodButton } from "./mood-button";

export function PaymentActions() {
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-3">
        <MoodButton asChild>
          <a href={PAYSTACK_LINKS.deposit} target="_blank" rel="noopener noreferrer">
            <CreditCard /> Pay initial deposit <ExternalLink />
          </a>
        </MoodButton>
        <MoodButton asChild variant="outline">
          <a href={PAYSTACK_LINKS.balance} target="_blank" rel="noopener noreferrer">
            <CreditCard /> Pay final balance <ExternalLink />
          </a>
        </MoodButton>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Paystack placeholders · Card or Instant EFT once activated.
        Deposit after quote confirmation; final balance upon approval.
      </p>
    </div>
  );
}