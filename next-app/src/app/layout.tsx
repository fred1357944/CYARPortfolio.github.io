import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

export const metadata: Metadata = {
    title: "2026 中原大學建築系第62屆畢業展 - VERSE(US)",
    description:
        "VERSE(US) | 2026 中原大學建築系第62屆畢業展覽 (CYAR 62nd)。匯集畢業生對於建築、城市與環境的深度思考，展現五年來的設計成果與對未來的想像。",
    keywords: "中原建築, CYAR, 建築系, 畢展, 畢業展, 62屆, 展覽, 畢業設計, VERSE(US), 中原大學, 2026",
    openGraph: {
        type: "website",
        title: "2026 中原大學建築系第62屆畢業展 - VERSE(US)",
        description: "VERSE(US) | 2026 中原大學建築系第62屆畢業展覽",
        images: ["/thumbnail.jpg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-TW">
            <body className={`${outfit.variable} antialiased`}>
                <CustomCursor />
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
