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
- The photo hero is always dark and uses its own `--hero-*` tokens, independent of the page mood, so text stays readable on any photo.
- Seasonal overlays (`[data-season]`) only override `--season-*` and `--glow`; the date logic lives in src/lib/seasons.ts (Johannesburg time) and is covered by src/test/seasons.test.ts.
- The site header holds only the brand and the searchable industry picker. Seasonal adaptation stays invisible — no badge, menu or strip exposes it.
- All WhatsApp links go through `buildWhatsAppLink` in src/lib/site.ts so the number and message format stay in one place.
- Keep workflow policy centralized in src/lib/site.ts: the 24h/48h timelines for Starter and Business Pro, the scoped timeline for Custom Flagship and App Development, the EFT payment steps and the WhatsApp message templates. The reusable build-workflow component keeps inquiry copy consistent with it.
- Payment is by EFT, for both the initial deposit and the final balance. Clients confirm their quote on WhatsApp and receive banking details there; development starts upon proof of payment. The initial deposit is non-refundable and secures the build slot. There are no online payment links, and no banking details are stored on the site or in the repo.