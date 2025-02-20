"use client";
import { Main } from "@/layouts/Main";
import { About_me } from "@/layouts/About_me";
import Sidebar from "@/layouts/Sidebar/index.tsx";
import { Background } from "@/components/Background";
import { Projects } from "@/layouts/Projects";
import { Technologies } from "@/layouts/Technologies";
import { Contact } from "@/layouts/Contact";
import { Footer } from "@/layouts/Footer";
import "../middleware.ts";

export default function Home() {
    return (
        <>
            <Background />
            <Sidebar />
            <Main />
            <About_me />
            <Projects />
            <Technologies />
            <Contact />
            <Footer />
        </>
    );
}
