"use client";
import React, { useEffect} from "react";
import styles from "./Slider.module.scss";
import { Card } from "./Card";
import { Itechnology } from "@/interfaces/technology.interface";
import { motion, useInView } from "framer-motion";

export const Slider = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = false,
}: {
    items: Itechnology[] | null;
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
                className={`${styles.scrollerList} ${styles.animateScroll}`}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{
                    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
                    hidden: { opacity: 0 }
                }}
                
                
            >
                {items && [...items, ...items].map((item, idx) => (
                <motion.li className={styles.card} key={idx}
                variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 20, opacity: 0 } }}
                
                >
                    <Card {...item} />
                </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    );
};
