import Image from "next/image";
import { settings } from "@/data";
import styles from "./page.module.css";

export const metadata = {
    title: "Events | VERSE(US) — 中原建築62屆",
};

export default function EventsPage() {
    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <p className={styles.label}>Programme</p>
                    <h1 className={styles.title}>Events</h1>
                    <p className={styles.sub}>Lectures, critiques, and celebrations surrounding the graduation exhibition.</p>
                </div>

                <div className={styles.events}>
                    {settings.events.map((event, i) => (
                        <article key={i} className={`glass ${styles.event}`}>
                            {event.image && (
                                <div className={styles.eventImgWrap}>
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        unoptimized
                                        className={styles.eventImg}
                                    />
                                    <div className={styles.eventImgOverlay} />
                                </div>
                            )}
                            <div className={styles.eventBody}>
                                <div className={styles.eventMeta}>
                                    {event.date && <span className={styles.eventDate}>{event.date}</span>}
                                    {event.time && <span className={styles.eventTime}>{event.time}</span>}
                                </div>
                                <h2 className={styles.eventTitle}>{event.title}</h2>
                                {event.location && (
                                    <p className={styles.eventLocation}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        {event.location}
                                    </p>
                                )}
                                {event.description && (
                                    <p className={styles.eventDesc}>{event.description}</p>
                                )}
                                {event.highlights && event.highlights.length > 0 && (
                                    <div className={styles.highlights}>
                                        {event.highlights.map((img, j) => (
                                            <div key={j} className={styles.highlightItem}>
                                                <Image src={img} alt={`Event ${event.title} highlight ${j + 1}`} fill unoptimized className={styles.highlightImg} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
