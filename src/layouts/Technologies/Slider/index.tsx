"use client";
import React, { useEffect, useState } from "react";
import styles from "./Slider.module.scss";
import { Card } from "../Card";
import { Itechnologie } from "@/interfaces/technologie.interface";
import { motion, useInView } from "framer-motion";

export const Slider = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
}: {
    items: Itechnologie[] | null;
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    const isInView = useInView(scrollerRef,{
        once: false,
        margin: "100000px 0px -100px 0px"
    });
    

    useEffect(() => {
        addAnimation();
    }, []);

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
        <motion.div
        ref={containerRef}
        className={styles.scroller}
        >
            <motion.ul
                ref={scrollerRef}
                className={`${styles.scrollerList} ${isInView && styles.animateScroll} ${
                !isInView && styles.pause
                }`}
                
                
            >
                {items && [...items, ...items].map((item, idx) => (
                <motion.li className={styles.card} key={idx}
                initial= {{scale: 0}}
                animate={isInView ?{scale:1, opacity:1}:{scale:0, opacity:0}}
                transition={{
                    duration: 0.07,
                    ease: [0.17, 0.55, 0.55, 1], 
                    delay: idx * 0.04
                }}
                
                >
                    <Card {...item} />
                </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    );
};