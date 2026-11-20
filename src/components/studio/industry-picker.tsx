import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { INDUSTRIES, INDUSTRY_GROUPS, findIndustry } from "@/lib/industries";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (id: string) => void;
  tone?: "bar" | "form";
  id?: string;
}

export function IndustryPicker({ value, onChange, tone = "bar", id }: Props) {
  const [open, setOpen] = useState(false);
  const current = findIndustry(value);
  const Icon = current.icon;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-label="Select your industry"
          className={cn(
            "flex w-full items-center gap-2 text-left",
            tone === "bar"
              ? "h-10 rounded-md border border-bar-foreground/30 bg-bar-foreground/10 px-3 text-sm text-bar-foreground hover:bg-bar-foreground/15 sm:w-80"
              : "h-11 rounded-md border bg-background px-3 text-sm text-foreground hover:bg-muted",
          )}
        >
          <Icon className="size-4 shrink-0 opacity-80" />
          <span className="min-w-0 flex-1">
            <span className={cn("block text-[10px] font-semibold uppercase leading-none tracking-[0.14em]", tone === "bar" ? "opacity-70" : "text-muted-foreground")}>
              Select your industry
            </span>
            <span className="mt-0.5 block truncate font-semibold leading-tight">{current.name}</span>
          </span>
          <ChevronDown className="size-4 shrink-0 opacity-70" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[min(22rem,calc(100vw-2rem))] p-0">
        <Command>
          <CommandInput placeholder={`Search ${INDUSTRIES.length} industries… e.g. dentist`} />
          <CommandList className="max-h-[min(60vh,26rem)]">
            <CommandEmpty>
              Not listed? Choose &ldquo;Other&rdquo; and tell us your business.
            </CommandEmpty>
            {INDUSTRY_GROUPS.map(({ group, items }) => (
              <CommandGroup key={group} heading={group}>
                {items.map((ind) => {
                  const ItemIcon = ind.icon;
                  return (
                    <CommandItem
                      key={ind.id}
                      value={`${ind.name} ${ind.group} ${ind.keywords ?? ""}`}
                      onSelect={() => {
                        onChange(ind.id);
                        setOpen(false);
                      }}
                    >
                      <ItemIcon className="size-4 opacity-70" />
                      <span className="flex-1">{ind.name}</span>
                      {ind.id === value && <Check className="size-4" />}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}