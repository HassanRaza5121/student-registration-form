import type { ReactNode } from "react";

interface FormFieldProps {
  id: string; // must match the input's id (links the label to the input)
  label: string; // the visible label text
  error?: string; // OPTIONAL: the error message to show
  children: ReactNode; // the input itself goes here
  className?: string;
}

// DAY 2 RECAP: composition with children. FormField knows how to draw a label and an
// error. It does NOT know which input it wraps: a text box, a select or a textarea.
function FormField({ id, label, error, children, className = "" }: FormFieldProps) {
  return (
    <div className={className}>
      {/* htmlFor + id: clicking the label focuses the input, and screen readers read it */}
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      {children}
      {/* DAY 3 RECAP: && conditional rendering. No error means nothing is drawn. */}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;