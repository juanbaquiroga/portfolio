"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import styles from "./Card.module.scss";
import { Itechnology } from "@/interfaces/technology.interface";

export const Card = ({ id, title, d, viewbox }: Itechnology) => {
    const svgWrapperRef = useRef<HTMLDivElement>(null);
    const titleWrapperRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        gsap.to(svgWrapperRef.current, {
            opacity: 0,
            scale: 1.1,
            duration: 0.35,
            ease: "power2.out"
        });
        gsap.to(titleWrapperRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(svgWrapperRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out"
        });
        gsap.to(titleWrapperRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.35,
            ease: "power2.out"
        });
    };

    return (
        <div
            className={styles.card}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.svgWrapper} ref={svgWrapperRef}>
                <svg className={styles.svg} viewBox={viewbox}>
                    <path className={styles.path} d={d}></path>
                </svg>
            </div>
            <div className={styles.titleWrapper} ref={titleWrapperRef}>
                <span className={styles.title}>{title}</span>
            </div>
        </div>
    );
};
