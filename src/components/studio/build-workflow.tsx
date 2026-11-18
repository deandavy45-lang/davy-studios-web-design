import { WEBSITE_WORKFLOW } from "@/lib/site";

export function BuildWorkflow() {
  return (
    <ol className="mt-8 space-y-6 border-l border-primary/40 pl-5">
      <li>
        <p className="text-xs font-semibold uppercase text-primary">01 · Deposit & kickoff</p>
        <h3 className="mt-1 text-lg font-semibold">Preview first. Secure your build slot.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Select your industry, review the photorealistic preview and confirm your quote.
          Your initial deposit secures your slot and kicks off development.
        </p>
      </li>
      <li>
        <p className="text-xs font-semibold uppercase text-primary">02 · Delivery & approval</p>
        <h3 className="mt-1 text-lg font-semibold">{WEBSITE_WORKFLOW.initialDeliveryHours}h template. {WEBSITE_WORKFLOW.finishedDeliveryHours}h finished site.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Receive your initial website template within {WEBSITE_WORKFLOW.initialDeliveryHours} hours of deposit.
          Review it and send one structured round of corrections or tweaks. We finalize the changes
          so your finished site is ready within {WEBSITE_WORKFLOW.finishedDeliveryHours} hours.
          Upon your approval, pay the final balance. Then we push your site live on your custom domain.
        </p>
      </li>
    </ol>
  );
}