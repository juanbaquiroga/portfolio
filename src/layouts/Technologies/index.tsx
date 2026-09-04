import styles from "./Technologies.module.scss";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/Slider";
import { Technology } from "@/interfaces";
import { useGsapInView } from "@/hooks/useGsapInView";
import gsap from "gsap";
import { getTechnologies, getCachedTechnologies } from "@/lib/firebase";

const CATEGORY_MAP: Record<string, string[]> = {
    "Frontend": ["React", "Next", "HTML", "CSS", "JavaScript", "TypeScript", "SASS", "Tailwind", "Vue", "Angular", "Redux", "Svelte"],
    "Backend": ["Node", "Express", "Python", "Firebase", "MongoDB", "PostgreSQL", "MySQL", "PHP", "Django", "Java", "Spring", "Prisma", "Supabase"],
};

function categorizeTechnologies(technologies: Technology[]) {
    const categorized: Record<string, Technology[]> = {};
    const used = new Set<string>();

    for (const [category, keywords] of Object.entries(CATEGORY_MAP)) {
        const matching = technologies.filter(tech =>
            keywords.some(kw => tech.title.toLowerCase().includes(kw.toLowerCase()))
        );
        if (matching.length > 0) {
            categorized[category] = matching;
            matching.forEach(t => used.add(t.id));
        }
    }

    const others = technologies.filter(t => !used.has(t.id));
    if (others.length > 0) {
        categorized["Tools & Other"] = others;
    }

    return categorized;
}

const TechCategoryGroup = ({ category, techs }: { category: string; techs: Technology[] }) => {
    const groupRef = useRef<HTMLDivElement>(null);
    const inView = useGsapInView(groupRef as any, { margin: "100000px 0px -60px 0px" });

    useEffect(() => {
        if (!groupRef.current) return;
        const label = groupRef.current.querySelector(`.${styles.categoryLabel}`);
        const cards = groupRef.current.querySelectorAll(`.${styles.techCard}`);

        if (inView) {
            gsap.fromTo(label,
                { opacity: 0, x: -15 },
                { opacity: 1, x: 0, duration: 0.25, delay: 0.1, ease: "power2.out" }
            );
            gsap.fromTo(cards,
                { opacity: 0, y: 15, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.22,
                    delay: 0.15,
                    stagger: 0.025,
                    ease: "power2.out"
                }
            );
        } else {
            gsap.to(label, {
                opacity: 0,
                x: -15,
                duration: 0.2,
                ease: "power2.in"
            });
            gsap.to(cards, {
                opacity: 0,
                y: 15,
                scale: 0.95,
                duration: 0.2,
                stagger: 0.015,
                ease: "power2.in"
            });
        }
    }, [inView]);

    return (
        <div ref={groupRef} className={styles.category}>
            <h3 className={styles.categoryLabel} style={{ opacity: 0 }}>{category}</h3>
            <div className={styles.techGrid}>
                {techs.map((tech) => (
                    <a
                        key={tech.id}
                        href={tech.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.techCard}
                        style={{ opacity: 0 }}
                    >
                        <div className={styles.techIcon}>
                            <svg viewBox={tech.viewBox}>
                                <path d={tech.path} fill="currentColor" />
                            </svg>
                        </div>
                        <span className={styles.techTitle}>{tech.title}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export const Technologies = ({ isMobile }: { isMobile: boolean }) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const [technologies, setTechnologies] = useState<Technology[] | null>(() => getCachedTechnologies());
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const headerInView = useGsapInView(headerRef as any, { margin: "100000px 0px -60px 0px" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getTechnologies();
                setTechnologies(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching data: ", err);
                setError("Failed to load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!headerRef.current) return;
        if (headerInView) {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.35, delay: 0.1, ease: "power2.out" }
            );
        } else {
            gsap.to(headerRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.22,
                ease: "power2.in"
            });
        }
    }, [headerInView]);

    const categorized = technologies ? categorizeTechnologies(technologies) : {};

    let firstHalf: Technology[] = [];
    let secondHalf: Technology[] = [];
    if (technologies) {
        const mid = Math.ceil(technologies.length / 2);
        firstHalf = technologies.slice(0, mid);
        secondHalf = technologies.slice(mid);
    }

    return (
        <section id="technologies" className={styles.technologies}>
            <div className={styles.container}>
                <div ref={headerRef} className={styles.header} style={{ opacity: 0 }}>
                    <span className={styles.label}>TOOLS</span>
                    <h2 className={styles.heading}>Tools I Work With</h2>
                </div>

                {isMobile && technologies ? (
                    <div className={styles.sliderContainer}>
                        <Slider items={firstHalf} direction="left" speed="normal" />
                        <Slider items={secondHalf} direction="right" speed="normal" />
                    </div>
                ) : (
                    <div className={styles.categoriesContainer}>
                        {Object.entries(categorized).map(([category, techs]) => (
                            <TechCategoryGroup
                                key={category}
                                category={category}
                                techs={techs}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
