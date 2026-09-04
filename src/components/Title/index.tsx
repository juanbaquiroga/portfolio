"use client"
import styles from "./Title.module.scss";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { Ititle } from "@/interfaces/title.interface";

export const Title = ({ title }: { title: Ititle }) => {
    const { d, strokeDash, viewBox, color, strokeWidth } = title;
    const pathRef = useRef<SVGSVGElement | null>(null);
    const [isInView, setIsInView] = useState(false);
    
    if(title.type == "inView"){
        
        useEffect(() => {
            gsap.set(pathRef.current, {
            strokeDasharray: strokeDash,
            strokeDashoffset: strokeDash,
            });

            const observer = new IntersectionObserver(
                ([entry]) => {
                    setIsInView(entry.isIntersecting);
                },
                {
                    rootMargin: "100000px 0px -110px 0px",
                }
            );

            if (pathRef.current) observer.observe(pathRef.current);

            return () => {
                if (pathRef.current) observer.unobserve(pathRef.current);
            };
        }, []);

        useEffect(() => {
            gsap.to(pathRef.current, {
                strokeDashoffset: isInView ? 0 : strokeDash,
                duration: title.duration || 0.65,
            });
        }, [isInView]);
    }
    if(title.type === "loading"){
        useEffect(() => {
            if (!pathRef.current) return;

            gsap.set(pathRef.current, {
            strokeDasharray: strokeDash,
            strokeDashoffset: strokeDash,
            });

            const tl = gsap.timeline({ repeat: -1, repeatDelay: title.delay || 0.4 });
            tl.to(pathRef.current, {
            strokeDashoffset: 0,
            duration: title.duration || 0.4,
            ease: "power1.inOut",
            }).to(pathRef.current, {
            strokeDashoffset: -strokeDash,
            duration: title.duration || 0.4,
            ease: "power1.inOut",
            });

            return () => {
            tl.kill();
            };
        }, [strokeDash]);

    }
    if(title.type === "oneTime"){
        useEffect(() => {
            gsap.set(pathRef.current, {
            strokeDasharray: strokeDash,
            strokeDashoffset: strokeDash,
            });

            gsap.fromTo(pathRef.current, {
                strokeDashoffset: strokeDash,
            },{
                strokeDashoffset: 0,
                duration: title.duration || 0.65,
                delay: title.delay || 0.4,
            });
        }, []);
    }

    const colorClass = color === "accent" ? styles.accent : styles.color2;

    return (
        <svg ref={pathRef} className={styles.svg} viewBox={viewBox}>
            <path
                style={{ strokeDasharray: strokeDash, strokeWidth: strokeWidth }}
                className={`${styles.draw} ${colorClass}`}
                d={d}
            />
        </svg>
    );
};