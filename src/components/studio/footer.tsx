import { SITE } from "@/lib/site";
import logo from "@/assets/davy-studios-logo.png";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Davy Studios logo"
            width={96}
            height={96}
            loading="lazy"
            className="size-24 shrink-0 rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <p>
              <span className="display-type text-base text-foreground">Davy Studios</span> · {SITE.city}, South Africa
            </p>
            <p>© {new Date().getFullYear()} Davy Studios. Websites that feel alive.</p>
          </div>
        </div>
        <nav aria-label="Our work" className="flex flex-wrap gap-x-5 gap-y-2">
          <a href={SITE.theKeepAppUrl} target="_blank" rel="noreferrer" className="hover:text-foreground">
            The Keep app
          </a>
          <a href={SITE.theKeepUrl} target="_blank" rel="noreferrer" className="hover:text-foreground">
            The Keep info site
          </a>
          <a href="#top" className="hover:text-foreground">
            Back to top
          </a>
        </nav>
      </div>
    </footer>
  );
}