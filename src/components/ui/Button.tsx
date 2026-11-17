import type { ReactNode } from "react"; // DAY 2 RECAP: type for the children prop

type ButtonVariant = "primary" | "outline" | "danger"; // DAY 2 RECAP: union type

// DAY 2 RECAP: typed props, with optional props (?) and default values below.
interface ButtonProps {
  children: ReactNode; // REQUIRED: the label
  variant?: ButtonVariant; // OPTIONAL: the look
  type?: "button" | "submit"; // OPTIONAL: "submit" makes it submit a form
  disabled?: boolean; // OPTIONAL
  ariaLabel?: string; // OPTIONAL: a spoken label when the visible text is not enough
  onClick?: () => void; // OPTIONAL function prop
}

// Classes every button shares. Always WHOLE class strings (see the Tailwind note).
const base =
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50";

// NEW IN DAY 4: a lookup table replaces the CSS Module classes from Day 2 and 3.
const variants: Record<ButtonVariant, string> = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  outline:
    "border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800",
  danger: "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950",
};

function Button({
  children,
  variant = "primary", // DAY 2 RECAP: default value
  type = "button", // "button" stops accidental form submits
  disabled = false,
  ariaLabel,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`${base} ${variants[variant]}`} // base classes + the chosen variant
    >
      {children}
    </button>
  );
}

export default Button;