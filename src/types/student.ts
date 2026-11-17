// NEW IN DAY 4: "as const" makes this a fixed list of exact strings, not just string[].
// It is the single source of truth: the dropdown and the type both come from it.
export const courses = [
  "Machine Learning",
  "Data Science",
  "Computer Vision",
  "Web Development",
] as const;

// DAY 2 RECAP: a union type. This one is DERIVED from the array above, so adding a
// course to the array updates the type automatically.
export type Course = (typeof courses)[number];

// DAY 2 RECAP: an interface describes the shape of one object.
export interface Student {
  id: string; // unique id, used as the React "key"
  name: string;
  email: string;
  age: number; // a NUMBER in the saved student...
  course: Course;
  notes: string;
  registeredAt: string; // ISO date text, e.g. "2026-11-17T09:30:00.000Z"
}

// NEW IN DAY 4: Omit<Type, keys> copies a type but removes some keys.
// The form produces everything EXCEPT id and registeredAt (App adds those).
export type NewStudent = Omit<Student, "id" | "registeredAt">;

// What the form holds while the user is typing.
export interface FormValues {
  name: string;
  email: string;
  age: string; // ...but a STRING in the form, because inputs always give strings
  course: Course | ""; // "" means "nothing chosen yet"
  agreed: boolean; // the checkbox
}

// NEW IN DAY 4: Partial makes every field optional; Record builds "key -> value".
// So: for any form field there MAY be an error message.
export type FormErrors = Partial<Record<keyof FormValues, string>>;

// DAY 3 RECAP: like Filter in the todo app. "all" or one of the courses.
export type CourseFilter = Course | "all";