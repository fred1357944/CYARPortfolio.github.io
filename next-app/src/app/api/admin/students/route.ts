import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/students.json");
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin123";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const SESSION_TOKEN = `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`;

function checkAuth(req: NextRequest): boolean {
    const token = req.cookies.get("admin_token")?.value;
    return token === SESSION_TOKEN;
}

// GET: list all students
export async function GET(req: NextRequest) {
    if (!checkAuth(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = JSON.parse(readFileSync(DATA_FILE, "utf-8"));
    return NextResponse.json(data);
}

// PUT: update a student's data
export async function PUT(req: NextRequest) {
    if (!checkAuth(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { id, ...updates } = body;

    const students = JSON.parse(readFileSync(DATA_FILE, "utf-8"));
    const idx = students.findIndex((s: { id: number }) => s.id === id);
    if (idx === -1) {
        return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    students[idx] = { ...students[idx], ...updates };
    writeFileSync(DATA_FILE, JSON.stringify(students, null, 2), "utf-8");

    return NextResponse.json({ success: true, student: students[idx] });
}
