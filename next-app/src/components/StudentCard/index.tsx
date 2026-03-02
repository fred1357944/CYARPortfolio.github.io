import Link from "next/link";
import Image from "next/image";
import type { Student } from "@/types";
import styles from "./StudentCard.module.css";

interface Props {
    student: Student;
}

export default function StudentCard({ student }: Props) {
    const desc = typeof student.shortDesc === "string" ? student.shortDesc : "";
    return (
        <Link href={`/students/${student.id}`} className={styles.card}>
            <div className={styles.imageWrap}>
                <Image
                    src={student.image}
                    alt={student.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.image}
                    unoptimized
                />
                <div className={styles.overlay} />
                <span className={styles.categoryBadge}>{student.category}</span>
            </div>

            <div className={styles.body}>
                <div className={styles.meta}>
                    <span className={styles.advisor}>{student.advisor}</span>
                </div>
                <h3 className={styles.name}>{student.name}</h3>
                {student.title && student.title !== "Test title" && (
                    <p className={styles.title}>{student.title}</p>
                )}
                {desc && <p className={styles.desc}>{desc}</p>}
                <div className={styles.cta}>
                    View Work <span>→</span>
                </div>
            </div>
        </Link>
    );
}
