import type { ReactNode } from "react";

export type BadgeTone = "indigo" | "emerald" | "sky" | "amber"; // allowed colors

const tones: Record<BadgeTone, string> = {
  indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
  emerald: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  sky: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
};

interface BadgeProps {
  children: ReactNode; // REQUIRED: the text inside
  tone?: BadgeTone; // OPTIONAL: the color
}

// DAY 2 RECAP: Badge knows nothing about students or courses. The CALLER decides the tone.
function Badge({ children, tone = "indigo" }: BadgeProps) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export default Badge;