import type { BadgeTone } from "../components/ui/Badge"; // allowed badge colors
import type { Course, CourseFilter, Student } from "../types/student"; // types

// DAY 3 RECAP: DERIVED value. We calculate the visible list; we never store it in state.
export function filterStudents(students: Student[], query: string, course: CourseFilter): Student[] {
  const search = query.trim().toLowerCase(); // ignore spaces and letter case
  return students.filter((student) => {
    // Filter 1: the course matches, or the filter is "all".
    const matchesCourse = course === "all" || student.course === course;
    // Filter 2: the search is empty, or the name or email contains it.
    const matchesSearch =
      search === "" ||
      student.name.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search);
    return matchesCourse && matchesSearch; // keep the student only if BOTH match
  });
}

// "2026-11-17T09:30:00.000Z" -> "17 Nov 2026"
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// DAY 2 RECAP: a lookup table, like statusTone. Record forces one entry per course.
export const courseTone: Record<Course, BadgeTone> = {
  "Machine Learning": "indigo",
  "Data Science": "emerald",
  "Computer Vision": "sky",
  "Web Development": "amber",
};