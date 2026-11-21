<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Industries (src/lib/industries.ts) drive the page: each has a photo in src/assets/industries/, sample business copy and a mood. Moods are pure CSS `[data-theme]` blocks in src/styles.css redefining the same semantic tokens, so adding an industry needs no component changes.
- The industry list starts with broad everyday categories ("Everyday Business") and ends with "Other". When "Other" is chosen, the inquiry form shows a required "Please specify your industry" field; the typed text is cleared when another category is chosen. Use `resolveIndustryLabel` (src/lib/site.ts) for anything sent on WhatsApp so a bare "Other" is never sent.
- The photo hero is always dark and uses its own `--hero-*` tokens, independent of the page mood, so text stays readable on any photo.
- Seasonal overlays (`[data-season]`) only override `--season-*` and `--glow`; the date logic lives in src/lib/seasons.ts (Johannesburg time) and is covered by src/test/seasons.test.ts.
- The site header holds only the brand and the searchable industry picker. Seasonal adaptation stays invisible — no badge, menu or strip exposes it.
- All WhatsApp links go through `buildWhatsAppLink` in src/lib/site.ts so the number and message format stay in one place. Messages are short and natural: the selected package, business name, industry, up to two reference sites if given, the chosen hosting plan if any, a line saying the client is happy to pay the non-refundable initial deposit, and a request for next steps.
- Our standard WhatsApp reply to a lead lives in `buildStandardReply` in src/lib/site.ts: it thanks them for their interest in the selected package (e.g. Essential Starter) and asks for two example website links they would like their site to reflect or resemble. Use it as written when replying on WhatsApp.
- Keep workflow policy centralized in src/lib/site.ts: the 24h/48h timelines for Starter and Business Pro, the scoped timeline for Custom Flagship and App Development, the EFT payment steps, the deposit terms, the price-beat guarantee, the app-idea hook, the hosting and care plans and the WhatsApp templates. The reusable build-workflow component keeps inquiry copy consistent with it.
- Hosting and care plans are optional, fixed monthly prices defined once in `HOSTING_PLANS` (src/lib/site.ts): Self-Hosted / Walk-Away R0/month (once-off build, full code handover), Managed Hosting & Uptime R295/month (Vercel hosting, SSL, uptime monitoring, .co.za domain renewal management, up to 2 minor text/photo edits per quarter) and Hosting + Monthly Care R650/month (everything in Managed plus up to 1 hour of monthly content/photo updates, priority WhatsApp support and Google Business Profile / local SEO check-ins). They are shown in the Packages section and chosen (optionally) in the inquiry form for the website packages; Custom App Development hosting is scoped in the quote. Clients always keep ownership of their domain, and custom @yourdomain.co.za business email mailboxes are available on request (`DOMAIN_AND_EMAIL_NOTE`). Change prices only in `HOSTING_PLANS`.
- Payment is by EFT, for both the initial deposit and the final balance. Clients confirm their quote on WhatsApp and receive banking details there; development starts upon proof of payment. There are no online payment links, and no banking details are stored on the site or in the repo.
- State the deposit terms once, in the inquiry payment footnote (`DEPOSIT_TERMS`): the initial deposit is non-refundable and secures the build slot. Do not repeat "non-refundable" or "no work begins until paid" in other site copy. The only other place it appears is the WhatsApp message, where the client confirms they are happy to pay it.
- The price-beat guarantee (`PRICE_BEAT_GUARANTEE`) appears once, in the Packages section: an official written quote from a registered competitor, for comparable work at fair market value, shared on WhatsApp, will be beaten.
- The inquiry form asks for one or two reference website URLs (optional) so we have a visual reference from day one; they are passed to `buildWhatsAppLink` through `references`.
- Tests for the workflow, payment terms, hosting plans, industry labels and WhatsApp templates are in src/test/workflow.test.ts. Update them whenever the copy in src/lib/site.ts changes.