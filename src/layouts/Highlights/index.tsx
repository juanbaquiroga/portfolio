import styles from "./Highlights.module.scss";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGsapInView } from "@/hooks/useGsapInView";

const highlights = [
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        title: "End-to-End Building",
        description: "From concept to deployment, I build complete web applications that scale."
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
        ),
        title: "Clean Interface Design",
        description: "Pixel-perfect UIs with modern design patterns and smooth interactions."
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        ),
        title: "Always Shipping",
        description: "Continuous improvement through shipping real products and learning new technologies."
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
        ),
        title: "Products Shipped",
        description: "Multiple production applications built and maintained for real users."
    }
];

export const Highlights = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const inView = useGsapInView(sectionRef as any, { margin: "100000px 0px -60px 0px" });

    useEffect(() => {
        if (!cardsRef.current) return;
        const cards = cardsRef.current.children;
        if (inView) {
            gsap.fromTo(cards,
                { opacity: 0, y: 20, scale: 0.98 },
                { 
                    opacity: 1, y: 0, scale: 1, 
                    duration: 0.28, 
                    delay: 0.18,
                    stagger: 0.04, 
                    ease: "power2.out" 
                }
            );
        } else {
            gsap.to(cards, {
                opacity: 0,
                y: 20,
                scale: 0.98,
                duration: 0.22,
                stagger: 0.02,
                ease: "power2.in"
            });
        }
    }, [inView]);

    useEffect(() => {
        if (!titleRef.current) return;
        if (inView) {
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.3, delay: 0.12, ease: "power2.out" }
            );
        } else {
            gsap.to(titleRef.current, {
                opacity: 0,
                y: 15,
                duration: 0.2,
                ease: "power2.in"
            });
        }
    }, [inView]);

    return (
        <section id="highlights" ref={sectionRef} className={styles.highlights}>
            <div className={styles.container}>
                <div className={styles.header} ref={titleRef} style={{ opacity: 0 }}>
                    <span className={styles.label}>WHAT I DO</span>
                </div>
                <div ref={cardsRef} className={styles.grid}>
                    {highlights.map((item, idx) => (
                        <div key={idx} className={styles.card} style={{ opacity: 0 }}>
                            <div className={styles.iconContainer}>
                                {item.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.cardDescription}>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
