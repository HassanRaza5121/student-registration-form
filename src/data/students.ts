import type { Student } from "../types/student"; // DAY 2 RECAP: import type

// All people below are FICTIONAL sample data for the demo.
// DAY 3 RECAP: this is only the INITIAL value of state. The real list lives in App.
export const initialStudents: Student[] = [
  { id: "1", name: "Ayesha Noor", email: "ayesha.noor@example.com", age: 22, course: "Machine Learning", notes: "", registeredAt: "2026-10-05T09:30:00.000Z" },
  { id: "2", name: "Bilal Hussain", email: "bilal.hussain@example.com", age: 24, course: "Data Science", notes: "", registeredAt: "2026-10-12T11:00:00.000Z" },
  { id: "3", name: "Hira Malik", email: "hira.malik@example.com", age: 21, course: "Computer Vision", notes: "", registeredAt: "2026-10-20T14:15:00.000Z" },
  { id: "4", name: "Usman Tariq", email: "usman.tariq@example.com", age: 26, course: "Web Development", notes: "", registeredAt: "2026-11-02T08:45:00.000Z" },
  { id: "5", name: "Zainab Iqbal", email: "zainab.iqbal@example.com", age: 23, course: "Machine Learning", notes: "", registeredAt: "2026-11-09T16:20:00.000Z" },
];