import { NextRequest, NextResponse } from "next/server";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin123";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
// The session token is a combined key stored in the cookie
const SESSION_TOKEN = `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`;

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: "帳號或密碼錯誤，請再試一次。" }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", SESSION_TOKEN, {
        httpOnly: true,
        maxAge: 60 * 60 * 8, // 8 hours
        sameSite: "strict",
    });
    return res;
}

export async function DELETE() {
    const res = NextResponse.json({ success: true });
    res.cookies.delete("admin_token");
    return res;
}

