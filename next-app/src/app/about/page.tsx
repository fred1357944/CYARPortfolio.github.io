import Image from "next/image";
import Link from "next/link";
import { settings } from "@/data";
import styles from "./page.module.css";

export const metadata = {
    title: "About | VERSE(US) — 中原建築62屆",
};

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <div className="container">
                {/* About Header */}
                <div className={styles.header}>
                    <p className={styles.label}>About the Exhibition</p>
                    <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: settings.about.title.replace("(", "<span class='graduate-paren'>(</span>").replace(")", "<span class='graduate-paren'>)</span>") }} />
                </div>

                <div className={styles.layout}>
                    {/* Content */}
                    <div className={styles.main}>
                        <div className={`glass ${styles.contentBox}`}>
                            <p className={styles.content}>{settings.about.content}</p>
                        </div>

                        {/* Info Cards */}
                        <div className={styles.infoGrid}>
                            <div className={`glass ${styles.infoCard}`}>
                                <div className={styles.infoIcon}>📅</div>
                                <div>
                                    <p className={styles.infoLabel}>Exhibition Dates</p>
                                    <p className={styles.infoValue}>{settings.about.date}</p>
                                </div>
                            </div>
                            <div className={`glass ${styles.infoCard}`}>
                                <div className={styles.infoIcon}>📍</div>
                                <div>
                                    <p className={styles.infoLabel}>Venue</p>
                                    <a href={settings.about.locationUrl} target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                                        {settings.about.location}
                                    </a>
                                </div>
                            </div>
                            <div className={`glass ${styles.infoCard}`}>
                                <div className={styles.infoIcon}>⏰</div>
                                <div>
                                    <p className={styles.infoLabel}>Opening Hours</p>
                                    <p className={styles.infoValue}>{settings.about.hours}</p>
                                </div>
                            </div>
                            <div className={`glass ${styles.infoCard}`}>
                                <div className={styles.infoIcon}>✉️</div>
                                <div>
                                    <p className={styles.infoLabel}>Contact</p>
                                    <a href={`mailto:${settings.about.email}`} className={styles.infoLink}>{settings.about.email}</a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <a href={settings.about.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                View on Map
                            </a>
                            <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                                Instagram
                            </a>
                            <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                                Facebook
                            </a>
                        </div>
                    </div>

                    {/* Sidebar: KV Image + Sponsors */}
                    <aside className={styles.sidebar}>
                        <div className={styles.kvWrap}>
                            <Image
                                src={settings.about.image}
                                alt="Exhibition Key Visual"
                                fill
                                unoptimized
                                className={styles.kvImg}
                            />
                        </div>

                        <div className={`glass ${styles.sponsorsCard}`}>
                            <p className={styles.sponsorsLabel}>Supported by</p>
                            <div className={styles.sponsors}>
                                {settings.sponsors.map((s) => (
                                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className={styles.sponsorItem}>
                                        <div className={styles.sponsorLogoWrap}>
                                            <Image src={s.logo} alt={s.name} fill unoptimized className={styles.sponsorLogo} />
                                        </div>
                                        <span className={styles.sponsorName}>{s.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
