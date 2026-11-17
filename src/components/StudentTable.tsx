import Badge from "./ui/Badge";
import Button from "./ui/Button";
import { courseTone, formatDate } from "../utils/studentHelpers";
import type { Student } from "../types/student";

interface StudentTableProps {
  students: Student[]; // already filtered by the parent
  emptyMessage: string;
  onDelete: (id: string) => void; // DAY 2 RECAP: function prop, the event goes UP
}

function StudentTable({ students, emptyMessage, onDelete }: StudentTableProps) {
  // DAY 3 RECAP: EARLY RETURN. A different output for the empty case. This component has
  // no hooks, so returning early is safe.
  if (students.length === 0) {
    return <p className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">{emptyMessage}</p>;
  }

  return (
    // overflow-x-auto: if the table is wider than the card, it scrolls INSIDE the card
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Registered students</caption> {/* sr-only = for screen readers only */}
        <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:text-slate-400">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">Student</th>
            <th scope="col" className="px-3 py-2 font-medium">Course</th>
            {/* NEW IN DAY 4: hidden on phones, shown as a table cell from "md" up */}
            <th scope="col" className="hidden px-3 py-2 font-medium md:table-cell">Age</th>
            <th scope="col" className="hidden px-3 py-2 font-medium md:table-cell">Registered</th>
            <th scope="col" className="px-3 py-2 text-right font-medium">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {/* NEW IN DAY 4: the KEY is the student's id. It is unique, stable and part of the data. */}
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <td className="px-3 py-3">
                <p className="font-medium">{student.name}</p>
                <p className="break-all text-xs text-slate-500 dark:text-slate-400">{student.email}</p>
              </td>
              <td className="px-3 py-3">
                {/* DAY 2 RECAP: the caller chooses the tone from a lookup table */}
                <Badge tone={courseTone[student.course]}>{student.course}</Badge>
              </td>
              <td className="hidden px-3 py-3 md:table-cell">{student.age}</td>
              <td className="hidden px-3 py-3 md:table-cell">{formatDate(student.registeredAt)}</td>
              <td className="px-3 py-3 text-right">
                {/* DAY 1 RECAP: wrap in an arrow function so the id is passed on CLICK, not on render */}
                <Button
                  variant="danger"
                  ariaLabel={`Delete ${student.name}`}
                  onClick={() => onDelete(student.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;