"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            router.push("/admin/dashboard");
        } else {
            const data = await res.json();
            setError(data.error || "帳號或密碼錯誤，請再試一次。");
            setLoading(false);
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.logoWrap}>
                    <span className={`gradient-text ${styles.logo}`}>VERSE</span>
                    <p className={styles.logoSub}>Admin Portal</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="admin-username" className={styles.label}>帳號 Username</label>
                        <input
                            id="admin-username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className={styles.input}
                            autoComplete="username"
                            autoFocus
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="admin-password" className={styles.label}>密碼 Password</label>
                        <input
                            id="admin-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className={styles.input}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
                        {loading ? "Signing in..." : "Sign In →"}
                    </button>
                </form>

                <p className={styles.hint}>
                    This portal allows students to upload their portfolio content.
                </p>
            </div>
        </div>
    );
}
