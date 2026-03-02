"use client";

import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only on desktop
        if (window.matchMedia("(pointer: coarse)").matches) return;

        let gsapInstance: typeof import("gsap")["gsap"] | null = null;

        import("gsap").then(({ gsap }) => {
            gsapInstance = gsap;
            const dot = dotRef.current;
            const ring = ringRef.current;
            if (!dot || !ring) return;

            // Fast setter for the dot
            const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
            const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
            // Slower for the ring (lag behind)
            const xRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
            const yRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });

            const onMove = (e: MouseEvent) => {
                xDot(e.clientX);
                yDot(e.clientY);
                xRing(e.clientX);
                yRing(e.clientY);
            };

            const onEnterLink = () => {
                gsap.to(ring, { scale: 2.5, duration: 0.3, ease: "power2" });
                gsap.to(dot, { scale: 0, duration: 0.2 });
            };

            const onLeaveLink = () => {
                gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2" });
                gsap.to(dot, { scale: 1, duration: 0.2 });
            };

            window.addEventListener("mousemove", onMove);

            const links = document.querySelectorAll("a, button, [data-cursor]");
            links.forEach((el) => {
                el.addEventListener("mouseenter", onEnterLink);
                el.addEventListener("mouseleave", onLeaveLink);
            });

            return () => {
                window.removeEventListener("mousemove", onMove);
                links.forEach((el) => {
                    el.removeEventListener("mouseenter", onEnterLink);
                    el.removeEventListener("mouseleave", onLeaveLink);
                });
            };
        });
    }, []);

    return (
        <>
            <div ref={dotRef} className={styles.dot} />
            <div ref={ringRef} className={styles.ring} />
        </>
    );
}
