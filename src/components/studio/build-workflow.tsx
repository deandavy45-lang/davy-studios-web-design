import { CUSTOM_BUILD_TIMELINE, WEBSITE_WORKFLOW } from "@/lib/site";

export function BuildWorkflow() {
  return (
    <ol className="mt-8 space-y-6 border-l border-primary/40 pl-5">
      <li>
        <p className="text-xs font-semibold uppercase text-primary">01 · Deposit & kickoff</p>
        <h3 className="mt-1 text-lg font-semibold">Deposit first. Development follows.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Your non-refundable initial deposit secures your build slot and starts development.
          We don&rsquo;t build full sites on spec, so no work begins until the deposit is paid.
        </p>
      </li>
      <li>
        <p className="text-xs font-semibold uppercase text-primary">02 · Delivery & approval</p>
        <h3 className="mt-1 text-lg font-semibold">
          {WEBSITE_WORKFLOW.initialDeliveryHours}–{WEBSITE_WORKFLOW.finishedDeliveryHours} hours for sites. Scoped timelines for custom builds.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Essential Starter & Business Pro:</span> your initial
          website template arrives within {WEBSITE_WORKFLOW.initialDeliveryHours} hours of proof of payment.
          Send one structured round of corrections and your finished site is ready within{" "}
          {WEBSITE_WORKFLOW.finishedDeliveryHours} hours.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Custom Flagship & App Development:</span>{" "}
          {CUSTOM_BUILD_TIMELINE} Your quote confirms the scope and delivery timeline.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          On every build, you approve the work and pay the final balance by EFT before launch. Then we push your site live on your custom domain.
        </p>
      </li>
    </ol>
  );
}