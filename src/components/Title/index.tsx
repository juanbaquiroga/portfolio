import styles from "./Title.module.scss";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { Ititle } from "@/interfaces/title.interface";

export const Title = ({ title }: { title: Ititle }) => {
    const { d, strokeDash, viewBox, color, strokeWidth } = title;
    const ref = useRef<SVGSVGElement | null>(null);
    const [isInView, setIsInView] = useState(false);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                rootMargin: "100000px 0px -110px 0px",
            }
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    useEffect(() => {
        gsap.to(ref.current, {
            strokeDashoffset: isInView ? 0 : strokeDash,
            duration: 0.65,
        });
    }, [isInView]);

    const colorClass = color === "accent" ? styles.accent : styles.color2;

    return (
        <svg ref={ref} className={styles.svg} viewBox={viewBox}>
            <path
                style={{ strokeDasharray: strokeDash, strokeWidth: strokeWidth }}
                className={`${styles.draw} ${colorClass}`}
                d={d}
            />
        </svg>
    );
};