"use client";
import { motion } from "framer-motion";
import styles from "./Card.module.scss";
import { Itechnologie } from "@/interfaces/technologie.interface";

export const Card = ({ id, title, d, viewbox }: Itechnologie) => {
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
                <motion.svg className={styles.svg} viewBox={viewbox}>
                    <motion.path className={styles.path} d={d}></motion.path>
                </motion.svg>
            </motion.div>
        </>
    );
};
