"use client"
import { motion, useInView } from "framer-motion"
import styles from "./Footer.module.scss"
import { Icon } from "@/components/Icon"
import { useRef } from "react"


export const Footer = () =>{
    const ref = useRef(null)
    const isInView = useInView(ref, {once:false, margin: "0px 0px -100px 0px"})
    return (
        <>
            <footer id="footer" ref={ref} className={styles.footer}>
                <div className={styles.box1}>
                    <a href="#main" className={styles.logoContainer}>
                        <motion.svg 
                            className={styles.svg} 
                            viewBox="0 0 204 152"
                            initial={{opacity:0}}
                            animate={isInView ?{ scale: [0.0, 0, 1.1, 1], opacity:[0, 0, 1, 1] }:{scale:0, opacity:0}}
                            transition={{duration: 0.4}}
                            >
                            <path className={styles.pathFill} d="M54.5 0.500046V94C54.5 106.167 45.8 126.2 11 109L1.5 142C15.3333 149.667 50.5 159.7 76.5 138.5V148.5H151.5C215.5 148.5 215.5 84.5 174.5 73C205.5 57 205 8.00005 163 0.500046H54.5ZM117.5 115V90H153.5C162.5 95.5 162.5 108.5 153.5 115H117.5ZM148 58.0001H117.5V34.5H148C158.5 41.5 158.5 52.5001 148 58.0001Z"/>
                            <path className={styles.path} d="M76.5 148.5V138.5C50.5 159.7 15.3333 149.667 1.5 142L11 109C45.8 126.2 54.5 106.167 54.5 94V0.500046H163C205 8.00005 205.5 57 174.5 73C215.5 84.5 215.5 148.5 151.5 148.5M76.5 148.5C100.667 148.5 149.5 148.5 151.5 148.5M76.5 148.5H151.5M117.5 90V115H153.5C162.5 108.5 162.5 95.5 153.5 90H117.5ZM117.5 58.0001H148C158.5 52.5001 158.5 41.5 148 34.5H117.5V58.0001Z"/>
                        </motion.svg>
                    </a>
                </div>
                <motion.div 
                    className={styles.line}
                    initial= {{scale: 0}}
                    animate={isInView ?{scale:1}:{scale:0}}
                    style={{
                        opacity: isInView ? 1 : 0,
                        transition: "all 0.15s cubic-bezier(0.17, 0.55, 0.55, 1)" 
                    }}
                ></motion.div>
                <div className={styles.box2}>
                    <div 
                        className={styles.container1}
                    >
                        <motion.div 
                            className={styles.links}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={{
                                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                                hidden: { opacity: 0 }
                            }}
                        >
                            <motion.a href="#main" className={styles.link} variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 20, opacity: 0 } }}>Portfolio</motion.a>
                            <motion.a href="#about-me" className={styles.link} variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 20, opacity: 0 } }}>About Me</motion.a>
                            <motion.a href="#projects" className={styles.link} variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 20, opacity: 0 } }}>Projects</motion.a>
                            <motion.a href="#technologies" className={styles.link} variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 20, opacity: 0 } }}>Technologies</motion.a>
                            <motion.a href="#contact" className={styles.link} variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 20, opacity: 0 } }}>Contact</motion.a>
                        </motion.div>
                        <motion.p className={styles.rights} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.1, delay: 0.25, type: "spring", stiffness: 300, damping: 15 }}>
                            © Juanbaquiroga 2024. All rights reserved
                        </motion.p>
                    </div>
                    <div className={styles.container2}>
                        <div className={styles.links}>
                            <Icon icon="instagram" delay={0} inView={true} link="https://instagram.com/juanbaquiroga"></Icon>
                            <Icon icon="linkedin" delay={0.05} inView={true} link="https://linkedin.com/in/juanbaquiroga"></Icon>
                            <Icon icon="github" delay={0.1} inView={true} link="https://github.com/juanbaquiroga"></Icon>
                        </div>
                        <motion.p className={styles.contact} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.1, delay: 0.25, type: "spring", stiffness: 300, damping: 15 }}>
                            Contact: <motion.a href="mailto:juanbaquiroga@gmail.com" className={styles.mail} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{duration:0.1, delay:0.25}}>juanbaquiroga@gmail.com</motion.a>
                        </motion.p>
                    </div>
                </div>
            </footer>
        </>
    )
}