"use client";

import { useState } from "react";
import StudentCard from "@/components/StudentCard";
import type { Student } from "@/types";
import styles from "./StudentGrid.module.css";

interface Props {
    students: Student[];
    categories: string[];
}

export default function StudentGrid({ students, categories }: Props) {
    const [active, setActive] = useState("All");
    const [query, setQuery] = useState("");

    const filtered = students.filter((s) => {
        const matchCat = active === "All" || s.category === active;
        const matchSearch =
            query === "" ||
            s.name.includes(query) ||
            s.title.toLowerCase().includes(query.toLowerCase()) ||
            s.category.toLowerCase().includes(query.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <>
            {/* Controls */}
            <div className={styles.controls}>
                <div className={styles.filters}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={`${styles.filterBtn} ${active === cat ? styles.active : ""}`}
                        >
                            {cat}
                            {active === cat && <span className={styles.dot} />}
                        </button>
                    ))}
                </div>
                <div className={styles.searchWrap}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={styles.search}
                    />
                </div>
            </div>

            {/* Count */}
            <p className={styles.count}>
                Showing <strong>{filtered.length}</strong> of {students.length} students
            </p>

            {/* Grid */}
            <div className={styles.grid}>
                {filtered.map((student) => (
                    <StudentCard key={student.id} student={student} />
                ))}
            </div>

            {filtered.length === 0 && (
                <div className={styles.empty}>
                    <p>No students found for &ldquo;{query || active}&rdquo;</p>
                </div>
            )}
        </>
    );
}
