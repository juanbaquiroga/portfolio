"use client"
import { motion } from "framer-motion"
import styles from "./Footer.module.scss"
import { Icon } from "@/components/Icon"


export const Footer = () =>{
    return (
        <>
            <motion.footer id="footer" className={styles.footer}>
                <motion.div className={styles.box1}>
                    <motion.svg className={styles.svg} viewBox="0 0 204 152">
                        <motion.path className={styles.pathFill} d="M54.5 0.500046V94C54.5 106.167 45.8 126.2 11 109L1.5 142C15.3333 149.667 50.5 159.7 76.5 138.5V148.5H151.5C215.5 148.5 215.5 84.5 174.5 73C205.5 57 205 8.00005 163 0.500046H54.5ZM117.5 115V90H153.5C162.5 95.5 162.5 108.5 153.5 115H117.5ZM148 58.0001H117.5V34.5H148C158.5 41.5 158.5 52.5001 148 58.0001Z"/>
                        <motion.path className={styles.path} d="M76.5 148.5V138.5C50.5 159.7 15.3333 149.667 1.5 142L11 109C45.8 126.2 54.5 106.167 54.5 94V0.500046H163C205 8.00005 205.5 57 174.5 73C215.5 84.5 215.5 148.5 151.5 148.5M76.5 148.5C100.667 148.5 149.5 148.5 151.5 148.5M76.5 148.5H151.5M117.5 90V115H153.5C162.5 108.5 162.5 95.5 153.5 90H117.5ZM117.5 58.0001H148C158.5 52.5001 158.5 41.5 148 34.5H117.5V58.0001Z"/>
                    </motion.svg>
                </motion.div>
                <motion.div className={styles.line}></motion.div>
                <motion.div className={styles.box2}>
                    <motion.div className={styles.container1}>
                        <motion.div className={styles.links}>
                            <motion.a href="#main" className={styles.link}>Portfolio</motion.a>
                            <motion.a href="#about-me" className={styles.link}>About Me</motion.a>
                            <motion.a href="#projects" className={styles.link}>Projects</motion.a>
                            <motion.a href="#technologies" className={styles.link}>Technologies</motion.a>
                            <motion.a href="#contact" className={styles.link}>Contact</motion.a>
                        </motion.div>
                        <motion.div className={styles.rights}>© Juanbaquiroga 2024. All rights reserved</motion.div>
                    </motion.div>
                    <motion.div className={styles.container2}>
                        <motion.div className={styles.links}>
                            <Icon icon="instagram" inView={true} link="#"></Icon>
                            <Icon icon="instagram" inView={true} link="#"></Icon>
                            <Icon icon="instagram" inView={true} link="#"></Icon>
                        </motion.div>
                        <motion.p className={styles.contact}>
                            Contact: <motion.a href="mailto:juanbaquiroga@gmail.com" className={styles.mail}>juanbaquiroga@gmail.com</motion.a>
                        </motion.p>
                    </motion.div>
                </motion.div>
            </motion.footer>
        </>
    )
}