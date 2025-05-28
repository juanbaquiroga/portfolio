import styles from "./Card.module.scss";
import { Itechnology } from "@/interfaces/technology.interface";

export const Card = ({ id, title, d, viewbox }: Itechnology) => {
    return (
        <div className={styles.card}>
            <div className={styles.svgWrapper}>
                <svg className={styles.svg} viewBox={viewbox}>
                    <path className={styles.path} d={d}></path>
                </svg>
            </div>
            <div className={styles.titleWrapper}>
                <span className={styles.title}>{title}</span>
            </div>
        </div>
    );
};
