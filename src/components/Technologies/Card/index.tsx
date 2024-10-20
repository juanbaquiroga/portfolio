"use client";
import { motion } from "framer-motion";
import styles from "./Card.module.scss";
import { Item } from "..";

export const Card = (item: Item) => {
    return (
        <>
            <motion.div
                key={item.id}
                layoutId={item.id}
                className={styles.card}
                transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 38,
                    duration: 0.13,
                }}
                whileHover={{ scale: 1.009 }}
            >
                <motion.svg className={styles.svg} viewBox={item.viewbox}>
                    <motion.path className={styles.path} d={item.d}></motion.path>
                </motion.svg>
            </motion.div>
        </>
    );
};
