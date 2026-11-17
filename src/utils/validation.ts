import type { FormErrors, FormValues } from "../types/student"; // types only

// Patterns are defined once, outside the functions.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // something@something.something
// \p{L} means "any letter in any language", so names like "Ayesha" or "Müller" are fine.
const NAME_PATTERN = /^[\p{L}][\p{L}\s.'-]*$/u;

// DAY 2 RECAP: a util is a PURE function: input in, result out, no JSX, no state.
// It returns an error message, or undefined when the field is valid.
export function validateField(
  field: keyof FormValues, // which field to check
  values: FormValues, // the current form values
  existingEmails: string[] // lowercase emails already registered (for the duplicate check)
): string | undefined {
  switch (field) {
    case "name": {
      const name = values.name.trim(); // ignore spaces at both ends
      if (name === "") return "Full name is required.";
      if (name.length < 3) return "Name must be at least 3 characters.";
      if (!NAME_PATTERN.test(name)) return "Use letters, spaces, dots, hyphens or apostrophes only.";
      return undefined; // no problem found
    }
    case "email": {
      const email = values.email.trim().toLowerCase(); // compare in lowercase
      if (email === "") return "Email is required.";
      if (!EMAIL_PATTERN.test(email)) return "Enter a valid email, like name@example.com.";
      if (existingEmails.includes(email)) return "This email is already registered.";
      return undefined;
    }
    case "age": {
      const text = values.age.trim();
      if (text === "") return "Age is required.";
      const age = Number(text); // convert the STRING to a number
      if (!Number.isInteger(age)) return "Age must be a whole number.";
      if (age < 16 || age > 60) return "Age must be between 16 and 60.";
      return undefined;
    }
    case "course":
      return values.course === "" ? "Choose a course." : undefined;
    case "agreed":
      return values.agreed ? undefined : "Please confirm the details are correct.";
  }
}

// Checks every field and collects ALL the errors (used on submit).
export function validateAll(values: FormValues, existingEmails: string[]): FormErrors {
  const errors: FormErrors = {}; // start with no errors
  // Object.keys returns string[], so we tell TypeScript they are really field names.
  const fields = Object.keys(values) as (keyof FormValues)[];
  fields.forEach((field) => {
    const message = validateField(field, values, existingEmails);
    if (message) errors[field] = message; // only store fields that HAVE an error
  });
  return errors;
}