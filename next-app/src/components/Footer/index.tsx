import Link from "next/link";
import { settings } from "@/data";
import styles from "./Footer.module.css";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <h2 className={`${styles.logo} gradient-text`}>{settings.hero.title}</h2>
                        <p className={styles.sub}>{settings.hero.subtitle}</p>
                        <p className={styles.email}>
                            <a href={`mailto:${settings.about.email}`}>{settings.about.email}</a>
                        </p>
                    </div>

                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Navigate</h4>
                        <ul>
                            {[
                                { href: "/students", label: "Students" },
                                { href: "/events", label: "Events" },
                                { href: "/shop", label: "Shop" },
                                { href: "/about", label: "About" },
                            ].map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Exhibition</h4>
                        <p className={styles.info}>{settings.about.date}</p>
                        <p className={styles.info}>{settings.about.location}</p>
                        <p className={styles.info}>{settings.about.hours}</p>
                    </div>

                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Follow Us</h4>
                        <div className={styles.socials}>
                            <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                Instagram
                            </a>
                            <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                Facebook
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copy}>
                        © {year} {settings.hero.subtitle} · All rights reserved
                    </p>
                    <div className={styles.sponsors}>
                        {settings.sponsors.map((s) => (
                            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className={styles.sponsorLink}>
                                {s.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
