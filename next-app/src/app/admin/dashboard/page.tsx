"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Student } from "@/types";
import styles from "./page.module.css";

export default function AdminDashboard() {
    const router = useRouter();
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Student | null>(null);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
    const [search, setSearch] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadField, setUploadField] = useState<string>("");
    const [uploading, setUploading] = useState(false);

    // Form state matching a student
    const [form, setForm] = useState<Partial<Student>>({});

    useEffect(() => {
        fetch("/api/admin/students")
            .then((r) => {
                if (r.status === 401) { router.push("/admin"); return null; }
                return r.json();
            })
            .then((data) => {
                if (data) { setStudents(data); setLoading(false); }
            })
            .catch(() => router.push("/admin"));
    }, [router]);

    function selectStudent(s: Student) {
        setSelected(s);
        setForm({ ...s });
        setMsg(null);
    }

    function updateForm<K extends keyof Student>(key: K, value: Student[K]) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    async function save() {
        if (!selected) return;
        setSaving(true);
        setMsg(null);
        const res = await fetch("/api/admin/students", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: selected.id, ...form }),
        });
        if (res.ok) {
            const { student } = await res.json();
            setStudents((prev) => prev.map((s) => (s.id === student.id ? student : s)));
            setSelected(student);
            setMsg({ type: "ok", text: "✓ Saved successfully!" });
        } else {
            setMsg({ type: "err", text: "✗ Failed to save. Please try again." });
        }
        setSaving(false);
    }

    async function handleFileUpload(field: string) {
        const input = fileInputRef.current;
        if (!input?.files?.[0] || !selected) return;
        const file = input.files[0];
        const ext = file.name.split(".").pop();

        // Determine target path
        const fieldToFilename: Record<string, string> = {
            image: "Card",
            heroImage: "00",
            profileImage: "personal",
        };
        const filename = fieldToFilename[field] ?? field;
        const targetPath = `students/${selected.name}/${filename}.${ext}`;

        const fd = new FormData();
        fd.append("file", file);
        fd.append("path", targetPath);

        setUploading(true);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        if (res.ok) {
            const { url } = await res.json();
            updateForm(field as keyof Student, url as never);
            setMsg({ type: "ok", text: `✓ Uploaded to ${url}` });
        } else {
            setMsg({ type: "err", text: "✗ Upload failed." });
        }
        setUploading(false);
        input.value = "";
    }

    function triggerUpload(field: string) {
        setUploadField(field);
        fileInputRef.current?.click();
    }

    async function logout() {
        await fetch("/api/admin/login", { method: "DELETE" });
        router.push("/admin");
    }

    const filtered = students.filter(
        (s) =>
            s.name.includes(search) ||
            s.category.toLowerCase().includes(search.toLowerCase()) ||
            s.advisor.includes(search)
    );

    return (
        <div className={styles.page}>
            {/* Hidden global file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={() => handleFileUpload(uploadField)}
            />

            {/* Sidebar: student list */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <span className={`gradient-text ${styles.sidebarLogo}`}>Admin</span>
                    <button onClick={logout} className={styles.logoutBtn}>Logout</button>
                </div>

                <div className={styles.searchWrap}>
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <ul className={styles.studentList}>
                    {loading ? (
                        <li className={styles.loadingItem}>Loading...</li>
                    ) : (
                        filtered.map((s) => (
                            <li key={s.id}>
                                <button
                                    onClick={() => selectStudent(s)}
                                    className={`${styles.studentItem} ${selected?.id === s.id ? styles.active : ""}`}
                                >
                                    <div className={styles.studentItemImg}>
                                        <Image src={s.image} alt={s.name} fill unoptimized className={styles.studentThumb} />
                                    </div>
                                    <div className={styles.studentItemInfo}>
                                        <span className={styles.studentItemName}>{s.name}</span>
                                        <span className={styles.studentItemCat}>{s.category}</span>
                                    </div>
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </aside>

            {/* Main: editor */}
            <main className={styles.main}>
                {!selected ? (
                    <div className={styles.placeholder}>
                        <p>← Select a student to edit their portfolio</p>
                    </div>
                ) : (
                    <div className={styles.editor}>
                        <div className={styles.editorHeader}>
                            <div>
                                <h1 className={styles.editorTitle}>{selected.name}</h1>
                                <p className={styles.editorSub}>ID #{selected.id} · {selected.advisor} · {selected.year}</p>
                            </div>
                            <button onClick={save} disabled={saving} className="btn btn-primary">
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>

                        {msg && (
                            <div className={`${styles.msg} ${msg.type === "ok" ? styles.msgOk : styles.msgErr}`}>
                                {msg.text}
                            </div>
                        )}

                        <div className={styles.grid}>
                            {/* Basic Info */}
                            <section className={`glass ${styles.section}`}>
                                <h2 className={styles.sectionTitle}>Basic Info</h2>
                                <div className={styles.fields}>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Name</label>
                                        <input
                                            className={styles.input}
                                            value={String(form.name ?? "")}
                                            onChange={(e) => updateForm("name", e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Advisor (指導老師)</label>
                                        <input
                                            className={styles.input}
                                            value={String(form.advisor ?? "")}
                                            onChange={(e) => updateForm("advisor", e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Category</label>
                                        <select
                                            className={styles.input}
                                            value={String(form.category ?? "")}
                                            onChange={(e) => updateForm("category", e.target.value)}
                                        >
                                            {["Urban Design", "Housing", "Landscape", "Tectonics", "Theory"].map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Title (作品名稱)</label>
                                        <input
                                            className={styles.input}
                                            value={String(form.title ?? "")}
                                            onChange={(e) => updateForm("title", e.target.value)}
                                        />
                                    </div>
                                    <div className={`${styles.field} ${styles.fieldFull}`}>
                                        <label className={styles.label}>Short Description (簡短說明)</label>
                                        <input
                                            className={styles.input}
                                            value={String(form.shortDesc ?? "")}
                                            onChange={(e) => updateForm("shortDesc", e.target.value)}
                                        />
                                    </div>
                                    <div className={`${styles.field} ${styles.fieldFull}`}>
                                        <label className={styles.label}>Full Description / Statement (完整說明)</label>
                                        <textarea
                                            className={`${styles.input} ${styles.textarea}`}
                                            value={String(form.description ?? "")}
                                            onChange={(e) => updateForm("description", e.target.value)}
                                            rows={6}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Images */}
                            <section className={`glass ${styles.section}`}>
                                <h2 className={styles.sectionTitle}>Images</h2>
                                <div className={styles.imageGrid}>
                                    {(["image", "heroImage", "profileImage"] as (keyof Student)[]).map((field) => (
                                        <div key={String(field)} className={styles.imageField}>
                                            <div className={styles.imagePreviewWrap}>
                                                {form[field] ? (
                                                    <Image
                                                        src={String(form[field])}
                                                        alt={String(field)}
                                                        fill
                                                        unoptimized
                                                        className={styles.imagePreview}
                                                    />
                                                ) : (
                                                    <div className={styles.imagePlaceholder}>No image</div>
                                                )}
                                                <button
                                                    onClick={() => triggerUpload(String(field))}
                                                    disabled={uploading}
                                                    className={styles.uploadOverlay}
                                                >
                                                    {uploading ? "Uploading..." : "📤 Upload"}
                                                </button>
                                            </div>
                                            <p className={styles.imageLabel}>
                                                {field === "image" ? "Card Image" : field === "heroImage" ? "Hero Image" : "Profile Photo"}
                                            </p>
                                            <input
                                                className={`${styles.input} ${styles.inputSm}`}
                                                value={String(form[field] ?? "")}
                                                onChange={(e) => updateForm(field, e.target.value as never)}
                                                placeholder="or paste URL..."
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Project Image URLs */}
                            <section className={`glass ${styles.section}`}>
                                <h2 className={styles.sectionTitle}>Project Images (作品圖面)</h2>
                                <p className={styles.sectionHint}>
                                    Click &quot;📤 Upload&quot; to upload files. You can also paste URLs directly.
                                </p>
                                <div className={styles.projectImages}>
                                    {(form.images ?? []).map((img, i) => (
                                        <div key={i} className={styles.projectImgRow}>
                                            <div className={styles.projectImgPreview}>
                                                {img && <Image src={img} alt={`Project ${i + 1}`} fill unoptimized className={styles.imagePreview} />}
                                            </div>
                                            <input
                                                className={styles.input}
                                                value={img}
                                                onChange={(e) => {
                                                    const imgs = [...(form.images ?? [])];
                                                    imgs[i] = e.target.value;
                                                    updateForm("images", imgs);
                                                }}
                                                placeholder={`/uploads/students/${selected.name}/${String(i).padStart(2, "0")}.jpg`}
                                            />
                                            <button
                                                onClick={async () => {
                                                    // Quick upload for project images
                                                    const input = document.createElement("input");
                                                    input.type = "file";
                                                    input.accept = "image/*";
                                                    input.onchange = async () => {
                                                        const file = input.files?.[0];
                                                        if (!file) return;
                                                        const ext = file.name.split(".").pop();
                                                        const path = `students/${selected.name}/${String(i + 1).padStart(2, "0")}.${ext}`;
                                                        const fd = new FormData();
                                                        fd.append("file", file);
                                                        fd.append("path", path);
                                                        setUploading(true);
                                                        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
                                                        if (res.ok) {
                                                            const { url } = await res.json();
                                                            const imgs = [...(form.images ?? [])];
                                                            imgs[i] = url;
                                                            updateForm("images", imgs);
                                                        }
                                                        setUploading(false);
                                                    };
                                                    input.click();
                                                }}
                                                className={styles.uploadSmBtn}
                                                disabled={uploading}
                                            >
                                                📤
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className={styles.editorFooter}>
                            <button onClick={save} disabled={saving} className="btn btn-primary">
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
