import { useState } from "react"; // DAY 3 RECAP: state
import Card from "./components/ui/Card";
import Button from "./components/ui/Button";
import RegistrationForm from "./components/RegistrationForm";
import StudentFilters from "./components/StudentFilters";
import StudentTable from "./components/StudentTable";
import { initialStudents } from "./data/students";
import { filterStudents } from "./utils/studentHelpers";
import type { CourseFilter, NewStudent, Student } from "./types/student";

function App() {
  // NEW IN DAY 4: LIFTING STATE UP. The student list lives HERE, in the lowest component
  // that both the form (needs the emails) and the table (shows the rows) share.
  const [students, setStudents] = useState<Student[]>(initialStudents);
  // The search text and the course filter are state too. The FILTERED list is not.
  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<CourseFilter>("all");

  // The form calls this. DAY 3 RECAP: functional update + a NEW array (never push).
  const registerStudent = (data: NewStudent) => {
    const student: Student = {
      ...data, // name, email, age, course, notes
      id: crypto.randomUUID(), // a unique id for the key
      registeredAt: new Date().toISOString(), // now, as text
    };
    setStudents((prev) => [student, ...prev]); // newest first
    setQuery(""); // clear the filters so the new row is visible
    setCourseFilter("all");
  };

  // DAY 3 RECAP: delete with .filter(), which returns a NEW array.
  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const clearFilters = () => {
    setQuery("");
    setCourseFilter("all");
  };

  // DAY 3 RECAP: DERIVED values. Recalculated on every render, never stored in state.
  const existingEmails = students.map((student) => student.email.toLowerCase());
  const visibleStudents = filterStudents(students, query, courseFilter);
  const hasActiveFilters = query.trim() !== "" || courseFilter !== "all";
  const emptyMessage =
    students.length === 0
      ? "No students registered yet. Use the form to add the first one."
      : "No students match your search.";

  return (
    // Tailwind: the page background and text color, with dark-mode variants
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Student Registration</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Register students with validation, then search and filter the directory. Sample data only.
          </p>
        </header>

        {/* Tailwind grid: one column on phones, five equal columns from "lg" up.
            The form takes 2 columns and the table takes 3. */}
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold">Register a student</h2>
            {/* Data goes DOWN (existingEmails). The event comes UP (onRegister). */}
            <RegistrationForm existingEmails={existingEmails} onRegister={registerStudent} />
          </Card>

          {/* min-w-0 lets this grid cell shrink, so the table scrolls instead of stretching the page */}
          <Card className="min-w-0 lg:col-span-3">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold">Registered students</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing {visibleStudents.length} of {students.length}
              </p>
            </div>

            <StudentFilters
              query={query}
              course={courseFilter}
              onQueryChange={setQuery} // setQuery already has the shape (query) => void
              onCourseChange={setCourseFilter}
            />

            <StudentTable students={visibleStudents} emptyMessage={emptyMessage} onDelete={deleteStudent} />

            {/* DAY 3 RECAP: && again. The button exists only while a filter is active. */}
            {hasActiveFilters && (
              <div className="mt-4">
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters
                </Button>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}

export default App;