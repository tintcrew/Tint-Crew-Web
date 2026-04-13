import { cn } from "@/lib/utils";

interface DiagonalStripProps {
  className?: string;
  position?: "top" | "bottom";
  color?: "accent" | "foreground";
}

/**
 * Diagonal accent strip — used as a section divider.
 * Creates a slanted colored bar like Chicago Auto Pros style.
 */
export function DiagonalStrip({
  className,
  position = "top",
  color = "accent",
}: DiagonalStripProps) {
  const bg = color === "accent" ? "bg-accent" : "bg-foreground";
  const clipPath =
    position === "top"
      ? "polygon(0 0, 100% 0, 100% 100%, 0 60%)"
      : "polygon(0 40%, 100% 0, 100% 100%, 0 100%)";

  return (
    <div
      className={cn("w-full h-3 sm:h-4", bg, className)}
      style={{ clipPath }}
    />
  );
}

/**
 * Diagonal accent corner — small slanted square placed at corners of cards.
 */
export function DiagonalCorner({
  className,
  position = "bottom-left",
}: {
  className?: string;
  position?: "bottom-left" | "top-right";
}) {
  const style =
    position === "bottom-left"
      ? { bottom: -1, left: -1, clipPath: "polygon(0 100%, 0 0, 100% 100%)" }
      : { top: -1, right: -1, clipPath: "polygon(0 0, 100% 0, 100% 100%)" };

  return (
    <div
      className={cn("absolute w-12 h-12 bg-accent", className)}
      style={style}
    />
  );
}
