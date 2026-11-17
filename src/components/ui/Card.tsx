import type { ReactNode } from "react"; // DAY 2 RECAP: type for the children prop\\
interface CardProps {
    children: ReactNode;
    className?: string;

}
function Card({ children, className ="" }: CardProps) {
    return (
        <section
        className = {`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 ${className}`}
        >
            {children}
        </section>
    );

}
export default Card;
