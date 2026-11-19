import { LOGO_MARK } from "@/lib/logo-mark";
import { IndustryPicker } from "./industry-picker";

interface Props {
  industry: string;
  onIndustry: (id: string) => void;
}

export function MoodSwitcher({ industry, onIndustry }: Props) {
  return (
    <header className="sticky top-0 z-40 bg-bar text-bar-foreground backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:gap-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5">
          <img src={LOGO_MARK} alt="" width={32} height={32} className="size-8 rounded-full" />
          <span className="display-type text-base leading-none">
            Davy<span className="opacity-60"> Studios</span>
          </span>
        </a>
        <div className="min-w-0 flex-1 sm:flex-none">
          <IndustryPicker value={industry} onChange={onIndustry} tone="bar" />
        </div>
      </div>
    </header>
  );
}