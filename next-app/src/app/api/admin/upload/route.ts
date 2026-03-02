import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin123";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const SESSION_TOKEN = `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`;

function checkAuth(req: NextRequest): boolean {
    const token = req.cookies.get("admin_token")?.value;
    return token === SESSION_TOKEN;
}

export async function POST(req: NextRequest) {
    if (!checkAuth(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const targetPath = formData.get("path") as string; // e.g. "students/王小明/Card.jpg"

    if (!file || !targetPath) {
        return NextResponse.json({ error: "Missing file or path" }, { status: 400 });
    }

    // Basic path sanitation
    const safePath = targetPath.replace(/\.\./g, "").replace(/^\/+/, "");
    const absPath = path.join(process.cwd(), "public/uploads", safePath);
    const dir = path.dirname(absPath);

    await mkdir(dir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(absPath, buffer);

    return NextResponse.json({
        success: true,
        url: `/uploads/${safePath}`,
    });
}
