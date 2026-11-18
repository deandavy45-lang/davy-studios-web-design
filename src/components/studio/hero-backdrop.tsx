import { useEffect, useState } from "react";

interface Layer {
  src: string;
  shown: boolean;
}

/** Full-bleed photo that cross-fades whenever the industry changes. */
export function HeroBackdrop({ src, alt }: { src: string; alt: string }) {
  const [layers, setLayers] = useState<Layer[]>([{ src, shown: true }]);

  useEffect(() => {
    setLayers((prev) => {
      if (prev[prev.length - 1]?.src === src) return prev;
      return [...prev.slice(-1), { src, shown: false }];
    });
  }, [src]);

  return (
    <div aria-hidden={false} className="absolute inset-0 overflow-hidden">
      {layers.map((layer, i) => (
        <img
          key={layer.src}
          src={layer.src}
          alt={i === layers.length - 1 ? alt : ""}
          width={1536}
          height={864}
          fetchPriority={i === 0 ? "high" : "auto"}
          onLoad={() => {
            setLayers((prev) => prev.map((l) => (l.src === layer.src ? { ...l, shown: true } : l)));
            window.setTimeout(() => setLayers((prev) => (prev.length > 1 && prev[prev.length - 1]?.src === layer.src ? prev.slice(-1) : prev)), 750);
          }}
          className="absolute inset-0 size-full scale-105 object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: layer.shown ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
