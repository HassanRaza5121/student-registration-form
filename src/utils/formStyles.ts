// Tailwind scans every file in src for COMPLETE class strings, including this one.
const base =
  "w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500";
const normal =
  "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200 dark:border-slate-600 dark:focus:ring-indigo-900";
const invalid =
  "border-red-500 focus:border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900";

// NEW IN DAY 4: Tailwind classes are chosen by picking between WHOLE strings.
// We never build a class name like `border-${color}-500`: Tailwind could not find it.
export function inputClasses(hasError: boolean): string {
  return `${base} ${hasError ? invalid : normal}`;
}

// Accessibility attributes for an input, based on whether it has an error.
// "aria-invalid" tells screen readers the value is wrong.
// "aria-describedby" links the input to its error message (id: "<field>-error").
export function a11yProps(id: string, error?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
}