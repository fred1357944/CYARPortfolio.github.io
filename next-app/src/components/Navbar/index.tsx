"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { settings } from "@/data";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    useEffect(() => {
        const saved = localStorage.getItem("theme") as "dark" | "light" | null;
        const initial = saved || "dark";
        setTheme(initial);
        document.documentElement.setAttribute("data-theme", initial);
    }, []);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    function toggleTheme() {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    }

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/students", label: "Portfolio" },
        { href: "/events", label: "Events" },
        { href: "/shop", label: "Shop" },
        { href: "/about", label: "About" },
    ];

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
            <div className="container">
                <div className={styles.inner}>
                    <Link href="/" className={styles.logo}>
                        <span className="gradient-text">{settings.hero.title}</span>
                    </Link>

                    <ul className={styles.links}>
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className={styles.link}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.right}>
                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className={styles.themeBtn}
                            aria-label="Toggle theme"
                            title={theme === "dark" ? "切換白天模式" : "切換暗黑模式"}
                        >
                            {theme === "dark" ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="5" />
                                    <line x1="12" y1="1" x2="12" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="23" />
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                    <line x1="1" y1="12" x2="3" y2="12" />
                                    <line x1="21" y1="12" x2="23" y2="12" />
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            )}
                        </button>

                        {/* Social */}
                        <div className={styles.social}>
                            <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Facebook">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className={styles.mobileMenu}>
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.mobileMeta}>
                        <button onClick={toggleTheme} className={styles.themeBtn}>
                            {theme === "dark" ? "☀️ 白天模式" : "🌙 暗黑模式"}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
