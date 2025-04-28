"use client";
import { Background } from "@/components/Background";
import { Main } from "@/layouts/Main";
import Sidebar from "@/layouts/Sidebar/index.tsx";
//import { About_me } from "@/layouts/About_me";
import { Projects } from "@/layouts/Projects";
//import { Technologies } from "@/layouts/Technologies";
//import { Contact } from "@/layouts/Contact";
//import { Footer } from "@/layouts/Footer";
import "../middleware.ts";
import { lazy } from "react";

const About_me = lazy(() => import("@/layouts/About_me").then(module => ({ default: module.About_me })));
// const Projects = lazy(() => import("@/layouts/Projects").then(module => ({ default: module.Projects })));
const Technologies = lazy(() => import("@/layouts/Technologies").then(module => ({ default: module.Technologies })));
const Contact = lazy(() => import("@/layouts/Contact").then(module => ({ default: module.Contact })));
const Footer = lazy(() => import("@/layouts/Footer").then(module => ({ default: module.Footer })));

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
// "use client";
// import { Main } from "@/layouts/Main";
// import { About_me } from "@/layouts/About_me";
// import Sidebar from "@/layouts/Sidebar/index.tsx";
// import { Background } from "@/components/Background";
// import { Projects } from "@/layouts/Projects";
// import { Technologies } from "@/layouts/Technologies";
// import { Contact } from "@/layouts/Contact";
// import { Footer } from "@/layouts/Footer";
// import "../middleware.ts";

// export default function Home() {
//     return (
//         <>
//             <Background />
//             {/* <Sidebar /> */}
//             <Main />
//             <About_me />
//             <Projects />
//             <Technologies />
//             <Contact />
//             <Footer />
//         </>
//     );
// }
