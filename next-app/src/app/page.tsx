import Image from "next/image";
import Link from "next/link";
import { students, settings, getAllCategories } from "@/data";
import StudentGrid from "@/components/StudentGrid";
import styles from "./page.module.css";

export default function HomePage() {
    const categories = getAllCategories();
    const latestStudents = students.slice(0, 6);

    return (
        <>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBg}>
                    <Image
                        src={settings.hero.image}
                        alt="Hero background"
                        fill
                        priority
                        unoptimized
                        className={styles.heroBgImage}
                    />
                    <div className={styles.heroBgOverlay} />
                </div>

                {/* Decorative orbs */}
                <div className={styles.orb1} />
                <div className={styles.orb2} />
                <div className={styles.orb3} />

                <div className={`container ${styles.heroContent}`}>
                    <p className={styles.heroSubLabel}>中原大學建築系 第62屆</p>
                    <h1 className={styles.heroTitle}>
                        <span className="gradient-text">{settings.hero.title}</span>
                        <span className={styles.heroTitleSub}>(US)</span>
                    </h1>
                    <p className={styles.heroSub}>{settings.hero.subtitle}</p>
                    <div className={styles.heroDate}>
                        <span className={styles.heroDot} />
                        {settings.about.date}
                    </div>
                    <div className={styles.heroActions}>
                        <Link href="/students" className="btn btn-primary">
                            Explore Works
                        </Link>
                        <Link href="/about" className="btn btn-ghost">
                            About the Show
                        </Link>
                    </div>
                </div>

                <div className={styles.scrollHint}>
                    <div className={styles.scrollLine} />
                    <span>Scroll</span>
                </div>
            </section>

            {/* Stats Strip */}
            <section className={styles.statsStrip}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        <div className={styles.stat}>
                            <span className={styles.statNum}>{students.length}</span>
                            <span className={styles.statLabel}>Students</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statNum}>{settings.categories.length}</span>
                            <span className={styles.statLabel}>Categories</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statNum}>2026</span>
                            <span className={styles.statLabel}>Exhibition Year</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statNum}>62</span>
                            <span className={styles.statLabel}>CYAR Cohort</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className={`section ${styles.categoriesSection}`}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <p className={styles.sectionLabel}>Explore by Category</p>
                        <h2 className={styles.sectionTitle}>Thematic Directions</h2>
                    </div>
                    <div className={styles.catGrid}>
                        {settings.categories.map((cat) => (
                            <Link key={cat.id} href={`/students?cat=${cat.id}`} className={styles.catCard}>
                                <div className={styles.catBg}>
                                    <Image src={cat.image} alt={cat.label} fill unoptimized className={styles.catImage} />
                                    <div className={styles.catOverlay} />
                                </div>
                                <div className={styles.catBody}>
                                    <h3 className={styles.catLabel}>{cat.label}</h3>
                                    <p className={styles.catDesc}>{cat.desc}</p>
                                    <span className={styles.catArrow}>→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Recent */}
            <section className={`section ${styles.featuredSection}`}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <p className={styles.sectionLabel}>Graduating Students</p>
                        <h2 className={styles.sectionTitle}>Featured Works</h2>
                    </div>
                    <StudentGrid students={latestStudents} categories={categories} />
                    <div className={styles.viewAll}>
                        <Link href="/students" className="btn btn-ghost">
                            View All {students.length} Students →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Exhibition Banner */}
            <section className={styles.bannerSection}>
                <div className="container">
                    <div className={styles.banner}>
                        <div className={styles.bannerContent}>
                            <p className={styles.bannerLabel}>Open Exhibition</p>
                            <h2 className={styles.bannerTitle}>{settings.about.date}</h2>
                            <p className={styles.bannerLocation}>{settings.about.location}</p>
                            <p className={styles.bannerHours}>{settings.about.hours}</p>
                            <div className={styles.bannerActions}>
                                <a href={settings.about.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    Get Directions
                                </a>
                                <Link href="/events" className="btn btn-ghost">
                                    View Events
                                </Link>
                            </div>
                        </div>
                        <div className={styles.bannerOrb} />
                    </div>
                </div>
            </section>
        </>
    );
}
