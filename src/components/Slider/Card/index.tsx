import styles from "./Card.module.scss";
import { Technology } from "@/interfaces";

export const Card = ({ id, title, path, viewBox }: Technology) => {
    return (
        <div className={styles.card}>
            <div className={styles.svgWrapper}>
                <svg className={styles.svg} viewBox={viewBox}>
                    <path className={styles.path} d={path}></path>
                </svg>
            </div>
            <div className={styles.titleWrapper}>
                <span className={styles.title}>{title}</span>
            </div>
        </div>
    );
};
