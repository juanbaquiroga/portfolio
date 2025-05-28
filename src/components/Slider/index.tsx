import React, { useEffect, useRef } from "react";
import styles from "./Slider.module.scss";
import { Card } from "./Card";
import { Itechnology } from "@/interfaces/technology.interface";
import gsap from "gsap";

export const Slider = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
}: {
    items: Itechnology[] | null;
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLUListElement>(null);

    // Hook para detectar si el slider está en vista
    const [isInView, setIsInView] = React.useState(false);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { root: null, rootMargin: "100000px 0px -100px 0px", threshold: 0 }
        );
        if (scrollerRef.current) observer.observe(scrollerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        addAnimation();
    }, []);

    useEffect(() => {
        if (scrollerRef.current && isInView) {
            const cards = Array.from(scrollerRef.current.children) as HTMLElement[];
            gsap.fromTo(
                cards,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: "power2.out"
                }
            );
        } else if (scrollerRef.current && !isInView) {
            const cards = Array.from(scrollerRef.current.children) as HTMLElement[];
            gsap.to(cards, {
                opacity: 0,
                y: 20,
                duration: 0.25,
                ease: "power2.in"
            });
        }
    }, [isInView, items]);

    // Pausar animación CSS al hacer hover
    useEffect(() => {
        if (!pauseOnHover || !containerRef.current) return;
        const container = containerRef.current;
        const handleMouseEnter = () => {
            container.style.animationPlayState = "paused";
            // Si usas animación en el ul, también pausar:
            if (scrollerRef.current) {
                scrollerRef.current.style.animationPlayState = "paused";
            }
        };
        const handleMouseLeave = () => {
            container.style.animationPlayState = "running";
            if (scrollerRef.current) {
                scrollerRef.current.style.animationPlayState = "running";
            }
        };
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [pauseOnHover]);

    const addAnimation = () => {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                scrollerRef.current?.appendChild(duplicatedItem);
            });

            getDirection();
            getSpeed();
        }
    };

    const getDirection = () => {
        if (containerRef.current) {
            containerRef.current.style.setProperty(
                "--animation-direction",
                direction === "left" ? "forwards" : "reverse"
            );
        }
    };

    const getSpeed = () => {
        if (containerRef.current) {
            const speedMapping = {
                fast: "15s",
                normal: "25s",
                slow: "35s",
            };
            containerRef.current.style.setProperty(
                "--animation-duration",
                speedMapping[speed] || "30s"
            );
        }
    };

    return (
        <div
            ref={containerRef}
            className={styles.scroller}
        >
            <ul
                ref={scrollerRef}
                className={`${styles.scrollerList} ${styles.animateScroll}`}
            >
                {items && [...items, ...items].map((item, idx) => (
                    <li className={styles.card} key={idx}>
                        <Card {...item} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
