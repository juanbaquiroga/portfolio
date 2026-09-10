"use client";
import { Background } from "@/components/Background";
import { Main } from "@/layouts/Main";
import { Highlights } from "@/layouts/Highlights";
import { About_me } from "@/layouts/About_me";
import { Technologies } from "@/layouts/Technologies";
import { Projects } from "@/layouts/Projects";
import { Contact } from "@/layouts/Contact";
import { Footer } from "@/layouts/Footer";
import { useState, useEffect } from "react";
import Menu from "@/components/Menu";

export default function Home() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const hash = window.location.hash;
        if (!hash) return;

        const alignToHash = () => {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        };

        alignToHash();
        const frameId = requestAnimationFrame(alignToHash);
        const t1 = setTimeout(alignToHash, 60);
        const t2 = setTimeout(alignToHash, 180);
        const t3 = setTimeout(alignToHash, 350);

        return () => {
            cancelAnimationFrame(frameId);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    return (
        <>
            <Background />
            <Menu useFixedPosition={true} />
            <Main />
            <Highlights />
            <About_me />
            <Technologies isMobile={isMobile} />
            <Projects isMobile={isMobile} />
            <Contact />
            <Footer />
        </>
    );
}