import { useRef, useState } from "react"; // useRef is NEW IN DAY 4
import type { ChangeEvent, FocusEvent, FormEvent } from "react"; // event types
import Button from "./ui/Button"; // DAY 2 RECAP: reusable ui
import FormField from "./ui/FormField";
import { a11yProps, inputClasses } from "../utils/formStyles";
import { validateAll, validateField } from "../utils/validation";
import { courses } from "../types/student";
import type { FormErrors, FormValues, NewStudent } from "../types/student";

// DAY 2 RECAP: typed props with FUNCTION PROPS. The form does not know where students
// are stored. It reports "register this one" and receives the emails to check against.
interface RegistrationFormProps {
  existingEmails: string[]; // data comes DOWN from App
  onRegister: (student: NewStudent) => void; // the event goes UP to App
}

// The empty form. Defined once, outside the component, and reused to reset the form.
const initialValues: FormValues = { name: "", email: "", age: "", course: "", agreed: false };

function RegistrationForm({ existingEmails, onRegister }: RegistrationFormProps) {
  // NEW IN DAY 4: ONE state object for all controlled fields, instead of five useStates.
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({}); // one message per field, or none
  const [successMessage, setSuccessMessage] = useState(""); // shown after a registration

  // NEW IN DAY 4: UNCONTROLLED input. A ref is a box that holds a reference to the real
  // DOM element. React does NOT track what is typed; we ask the DOM when we need it.
  const notesRef = useRef<HTMLTextAreaElement>(null);

  // NEW IN DAY 4 experiment: type in Name and watch this log on EVERY keystroke.
  // Type in Notes: no log. Remove this line after the experiment.
  console.log("RegistrationForm rendered");

  // ONE handler for all controlled fields. The input's name attribute tells us which one.
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = event.target;
    const field = target.name as keyof FormValues; // "name", "email", "age", ...
    // A checkbox stores true/false in "checked"; every other field uses "value".
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;

    // DAY 3 RECAP: update an object WITHOUT mutation. Copy it, then replace one field.
    const nextValues: FormValues = { ...values, [field]: value };
    setValues(nextValues);

    // Once a field shows an error, re-check it on every keystroke so the message
    // disappears as soon as the problem is fixed.
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, nextValues, existingEmails) }));
    }
    if (successMessage) setSuccessMessage(""); // the user is typing again: hide the old message
  };

  // Validate a field when the user leaves it.
  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const field = event.target.name as keyof FormValues;
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values, existingEmails) }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // DAY 3 RECAP: stop the browser from reloading the page

    // 1. Check EVERY field and show all the errors at once.
    const validationErrors = validateAll(values, existingEmails);
    setErrors(validationErrors);

    // 2. If any error exists, stop and move focus to the first invalid field.
    const invalidFields = Object.keys(validationErrors);
    if (invalidFields.length > 0) {
      document.getElementById(invalidFields[0])?.focus(); // each input's id equals its name
      return;
    }

    // 3. TypeScript does not know validation passed. This check narrows "Course | ''" to "Course".
    const course = values.course;
    if (course === "") return;

    // 4. Build the new student. Strings become the right types here.
    onRegister({
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      age: Number(values.age), // string -> number
      course,
      notes: (notesRef.current?.value ?? "").trim(), // NEW IN DAY 4: read the uncontrolled field NOW
    });

    // 5. Reset everything.
    setValues(initialValues); // clears the controlled fields
    setErrors({});
    if (notesRef.current) notesRef.current.value = ""; // an uncontrolled field is cleared through the DOM
    setSuccessMessage(`${values.name.trim()} has been registered.`);
    document.getElementById("name")?.focus(); // ready for the next person
  };

  return (
    // noValidate: we show our own messages instead of the browser's popups
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <FormField id="name" label="Full name" error={errors.name}>
        <input
          id="name"
          name="name" // handleChange reads this
          type="text"
          value={values.name} // CONTROLLED: React state decides what the box shows
          onChange={handleChange} // every keystroke updates the state
          onBlur={handleBlur}
          placeholder="e.g. Ayesha Noor"
          autoComplete="name"
          maxLength={60}
          className={inputClasses(Boolean(errors.name))} // red border when there is an error
          {...a11yProps("name", errors.name)} // aria-invalid and aria-describedby
        />
      </FormField>

      <FormField id="email" label="Email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="name@example.com"
          autoComplete="email"
          className={inputClasses(Boolean(errors.email))}
          {...a11yProps("email", errors.email)}
        />
      </FormField>

      {/* Tailwind: two columns side by side, with a gap */}
      <div className="grid grid-cols-2 gap-4">
        <FormField id="age" label="Age" error={errors.age}>
          <input
            id="age"
            name="age"
            type="number" // the value is STILL a string in JavaScript
            inputMode="numeric"
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. 22"
            className={inputClasses(Boolean(errors.age))}
            {...a11yProps("age", errors.age)}
          />
        </FormField>

        <FormField id="course" label="Course" error={errors.course}>
          <select
            id="course"
            name="course"
            value={values.course} // a controlled select works like a controlled input
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClasses(Boolean(errors.course))}
            {...a11yProps("course", errors.course)}
          >
            <option value="">Select a course</option>
            {/* DAY 4 TOPIC: a list again. The key is the course name: unique and stable. */}
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {/* UNCONTROLLED: no value, no onChange. defaultValue is only the starting text. */}
      <FormField id="notes" label="Notes (optional)">
        <textarea
          id="notes"
          ref={notesRef} // connects the ref to this element
          defaultValue=""
          rows={3}
          maxLength={200}
          placeholder="Anything we should know?"
          className={inputClasses(false)}
        />
      </FormField>

      <div>
        <label className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input
            id="agreed"
            name="agreed"
            type="checkbox"
            checked={values.agreed} // a checkbox is controlled with "checked", not "value"
            onChange={handleChange}
            className="mt-0.5 size-4 accent-indigo-600"
            {...a11yProps("agreed", errors.agreed)}
          />
          <span>I confirm the details above are correct.</span>
        </label>
        {errors.agreed && (
          <p id="agreed-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.agreed}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">Register student</Button>
        {/* role="status": screen readers announce it when it appears */}
        {successMessage && (
          <p role="status" className="text-sm text-emerald-600 dark:text-emerald-400">
            {successMessage}
          </p>
        )}
      </div>
    </form>
  );
}

export default RegistrationForm;