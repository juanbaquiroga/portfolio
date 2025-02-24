"use client";
import { motion } from "framer-motion";
import styles from "./Card.module.scss";
import { Itechnology } from "@/interfaces/technology.interface";

export const Card = ({ id, title, d, viewbox }: Itechnology) => {
    return (
        <>
            <motion.div
                key={id}
                layoutId={id}
                className={styles.card}
                transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 38,
                    duration: 0.13,
                }}
                whileHover={{ scale: 1.009 }}
            >
                <svg className={styles.svg} viewBox={viewbox}>
                    <path className={styles.path} d={d}></path>
                </svg>
            </motion.div>
        </>
    );
};
