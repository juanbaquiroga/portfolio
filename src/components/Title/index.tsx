// import { motion, useScroll, useTransform } from "framer-motion";
// import styles from "./Title.module.scss";
// import { useRef } from "react";
// import { Ititle } from "@/interfaces/title.interface"



// export const Title = ({ title }: { title: Ititle }) =>{
//     const {d, strokeDash, viewBox, color} = title
//     const ref = useRef(null)
//     const { scrollYProgress } = useScroll(
//         {
//             target:ref,
//             offset: [1, 0]
//         }
//     )
//     const draw = useTransform(scrollYProgress, [0.40, 0], [0, strokeDash])
//     const colorClass = color === "accent" ? styles.accent : styles.color2;
//     return(
//             <motion.svg ref={ref} className={styles.svg} viewBox={viewBox}>
//                 <motion.path 
//                     initial={{strokeDashoffset: strokeDash}}
//                     style={{strokeDashoffset: draw, strokeDasharray:strokeDash}}
//                     className={`${styles.draw} ${colorClass}`} 
//                     d={d}
//                 />
//             </motion.svg>
//     )
// }
import { motion, useInView } from "framer-motion";
import styles from "./Title.module.scss";
import { useRef } from "react";
import { Ititle } from "@/interfaces/title.interface";

export const Title = ({ title }: { title: Ititle }) => {
    const { d, strokeDash, viewBox, color, strokeWidth } = title;
    const ref = useRef<SVGSVGElement | null>(null);
    const isInView = useInView(ref, {
        once: false,
        margin: "100000px 0px -100px 0px"
    });

    const colorClass = color === "accent" ? styles.accent : styles.color2;

    return (
        <svg ref={ref} className={styles.svg} viewBox={viewBox}>
            <motion.path
                initial={{ strokeDashoffset: strokeDash }}
                animate={isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: strokeDash }} 
                transition={{ duration: 0.6 }}
                style={{ strokeDasharray: strokeDash, strokeWidth: strokeWidth }}
                className={`${styles.draw} ${colorClass}`}
                d={d}
            />
        </svg>
    );
};