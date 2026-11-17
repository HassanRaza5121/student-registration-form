import type { ChangeEvent } from "react";
import { inputClasses } from "../utils/formStyles"; // reuse the same input look
import { courses } from "../types/student";
import type { CourseFilter } from "../types/student";

// DAY 2 RECAP: the component holds NO state. The parent owns the filters (lifting state
// up) and passes the current values down, plus functions to change them.
interface StudentFiltersProps {
  query: string;
  course: CourseFilter;
  onQueryChange: (query: string) => void;
  onCourseChange: (course: CourseFilter) => void;
}

function StudentFilters({ query, course, onQueryChange, onCourseChange }: StudentFiltersProps) {
  return (
    // Tailwind responsive: a column on phones, a row from the "sm" breakpoint up
    <div className="mb-4 flex flex-col gap-3 sm:flex-row">
      {/* CONTROLLED search: the box always shows the "query" that App holds */}
      <input
        type="search"
        value={query}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onQueryChange(event.target.value)}
        placeholder="Search by name or email"
        aria-label="Search students"
        className={inputClasses(false)}
      />
      <select
        value={course}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => onCourseChange(event.target.value as CourseFilter)}
        aria-label="Filter by course"
        className={`${inputClasses(false)} sm:w-52`} // full width on phones, 13rem from sm up
      >
        <option value="all">All courses</option>
        {courses.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StudentFilters;