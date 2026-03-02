import { students } from "@/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export async function generateStaticParams() {
    return students.map((s) => ({ id: String(s.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const student = students.find((s) => s.id === Number(id));
    if (!student) return {};
    return {
        title: `${student.name} — ${student.title} | VERSE(US)`,
    };
}

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const student = students.find((s) => s.id === Number(id));
    if (!student) notFound();

    const description = typeof student.description === "string" ? student.description : "";
    const shortDesc = typeof student.shortDesc === "string" ? student.shortDesc : "";

    // Adjacent students
    const idx = students.indexOf(student);
    const prev = students[idx - 1];
    const next = students[idx + 1];

    return (
        <div className={styles.page}>
            {/* Hero Banner */}
            <div className={styles.heroBanner}>
                <Image
                    src={student.heroImage}
                    alt={student.name}
                    fill
                    priority
                    unoptimized
                    className={styles.heroImg}
                />
                <div className={styles.heroOverlay} />
                <div className={`container ${styles.heroContent}`}>
                    <Link href="/students" className={styles.backBtn}>
                        ← Back to Students
                    </Link>
                    <span className={styles.categoryBadge}>{student.category}</span>
                    <h1 className={styles.name}>{student.name}</h1>
                    {student.title && student.title !== "Test title" && (
                        <p className={styles.title}>{student.title}</p>
                    )}
                    <p className={styles.advisor}>Advised by {student.advisor} · {student.year}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container">
                <div className={styles.layout}>
                    {/* Left: Description + Images */}
                    <div className={styles.mainCol}>
                        {shortDesc && (
                            <div className={`glass ${styles.shortDescBox}`}>
                                <p className={styles.shortDesc}>{shortDesc}</p>
                            </div>
                        )}

                        {description && (
                            <div className={styles.descSection}>
                                <h2 className={styles.descTitle}>Statement</h2>
                                <p className={styles.desc}>{description}</p>
                            </div>
                        )}

                        {student.images.length > 0 && (
                            <div className={styles.gallerySection}>
                                <h2 className={styles.descTitle}>Project Images</h2>
                                <div className={styles.gallery}>
                                    {student.images.map((img, i) => (
                                        <div key={i} className={styles.galleryItem}>
                                            <Image
                                                src={img}
                                                alt={`${student.name} project image ${i + 1}`}
                                                fill
                                                unoptimized
                                                className={styles.galleryImg}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Profile */}
                    <aside className={styles.sidebar}>
                        <div className={`glass ${styles.profileCard}`}>
                            <div className={styles.profileImgWrap}>
                                <Image
                                    src={student.profileImage}
                                    alt={`${student.name} portrait`}
                                    fill
                                    unoptimized
                                    className={styles.profileImg}
                                />
                            </div>
                            <div className={styles.profileInfo}>
                                <h3 className={styles.profileName}>{student.name}</h3>
                                <div className={styles.profileMeta}>
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>Category</span>
                                        <span className={styles.metaValue}>{student.category}</span>
                                    </div>
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>Advisor</span>
                                        <span className={styles.metaValue}>{student.advisor}</span>
                                    </div>
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>Year</span>
                                        <span className={styles.metaValue}>{student.year}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Prev / Next Navigation */}
                <div className={styles.pagination}>
                    {prev ? (
                        <Link href={`/students/${prev.id}`} className={styles.pageNav}>
                            <span className={styles.pageNavDir}>← Previous</span>
                            <span className={styles.pageNavName}>{prev.name}</span>
                        </Link>
                    ) : <div />}
                    {next ? (
                        <Link href={`/students/${next.id}`} className={`${styles.pageNav} ${styles.pageNavRight}`}>
                            <span className={styles.pageNavDir}>Next →</span>
                            <span className={styles.pageNavName}>{next.name}</span>
                        </Link>
                    ) : <div />}
                </div>
            </div>
        </div>
    );
}
