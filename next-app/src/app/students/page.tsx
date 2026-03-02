import StudentGrid from "@/components/StudentGrid";
import { students, getAllCategories } from "@/data";
import styles from "./page.module.css";

export const metadata = {
    title: "Students | VERSE(US) — 中原建築62屆",
};

export default function StudentsPage() {
    const categories = getAllCategories();

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <p className={styles.label}>62nd Cohort</p>
                    <h1 className={styles.title}>Graduating Students</h1>
                    <p className={styles.sub}>
                        Explore the works of {students.length} graduating architects, each bringing a unique vision to the built environment.
                    </p>
                </div>

                <StudentGrid students={students} categories={categories} />
            </div>
        </div>
    );
}
