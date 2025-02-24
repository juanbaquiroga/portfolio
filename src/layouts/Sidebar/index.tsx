import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Sidebar.module.scss";
import { Julius_Sans_One } from "next/font/google";

const jls = Julius_Sans_One({ subsets: ["latin"], weight: ["400"] });

const menuItems = [
    { id: 0, label: "PORTFOLIO" },
    { id: 1, label: "ABOUT ME" },
    { id: 2, label: "PROJECTS" },
    { id: 3, label: "TECHNOLOGIES" },
    { id: 4, label: "CONTACT" },
];

const Sidebar = () => {
    const [active, setActive] = useState<Number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    return (
        <>
            <motion.div
                className={styles.activeZone}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                style={
                    isVisible
                        ? { background: "transparent", y: "-50%" }
                        : {
                              background:
                                  "radial-gradient(ellipse at left center, rgba(0, 0, 0, 0.26) 0%, transparent 70%)",
                              y: "-50%",
                          }
                }
            ></motion.div>
            <motion.div
                className={styles.sidebar}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                animate={{
                    y: "-50%",
                    x: isVisible ? 0 : "-150%",
                }}
            >
                {/* Logo */}
                <div className={styles.logoContainer}>
                    <motion.svg className={styles.svg} viewBox="0 0 204 152">
                        <motion.path
                            className={styles.pathFill}
                            d="M54.5 0.500046V94C54.5 106.167 45.8 126.2 11 109L1.5 142C15.3333 149.667 50.5 159.7 76.5 138.5V148.5H151.5C215.5 148.5 215.5 84.5 174.5 73C205.5 57 205 8.00005 163 0.500046H54.5ZM117.5 115V90H153.5C162.5 95.5 162.5 108.5 153.5 115H117.5ZM148 58.0001H117.5V34.5H148C158.5 41.5 158.5 52.5001 148 58.0001Z"
                        />
                        <motion.path
                            className={styles.path}
                            d="M76.5 148.5V138.5C50.5 159.7 15.3333 149.667 1.5 142L11 109C45.8 126.2 54.5 106.167 54.5 94V0.500046H163C205 8.00005 205.5 57 174.5 73C215.5 84.5 215.5 148.5 151.5 148.5M76.5 148.5C100.667 148.5 149.5 148.5 151.5 148.5M76.5 148.5H151.5M117.5 90V115H153.5C162.5 108.5 162.5 95.5 153.5 90H117.5ZM117.5 58.0001H148C158.5 52.5001 158.5 41.5 148 34.5H117.5V58.0001Z"
                        />
                    </motion.svg>
                </div>

                {/* Navigation Menu */}
                <ul className={styles.menu}>
                    {menuItems.map((item) => {
                        const isActive = active === item.id; // Si el item está activo
                        return (
                            <motion.li
                                key={item.id}
                                className={styles.menuItem}
                                onMouseEnter={() => setActive(item.id)}
                                onMouseLeave={() => setActive(null)}
                                animate={
                                    isActive
                                        ? {
                                              fontSize: "20px",
                                              width: "150px",
                                              height: "75px",
                                          }
                                        : {
                                              fontSize: "10px",
                                              width: "90px",
                                              height: "30px",
                                          }
                                }
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15,
                                }}
                            >
                                <motion.p
                                    className={`${jls.className} ${styles.letter}`}
                                >
                                    {item.label}
                                </motion.p>
                                <motion.div
                                    className={styles.expand}
                                    initial={{ width: 0, height: "10px" }}
                                    animate={
                                        isActive
                                            ? { width: "75px", height: "80px" }
                                            : { width: 0, height: 0 }
                                    }
                                    transition={
                                        isActive
                                            ? {
                                                  type: "spring",
                                                  stiffness: 200,
                                                  damping: 13,
                                              }
                                            : {
                                                  type: "tween",
                                              }
                                    }
                                >
                                    <motion.div
                                        className={styles.top}
                                        initial={{ scaleY: 0 }}
                                        animate={{
                                            scaleY: active === item.id ? 1 : 0,
                                        }}
                                        transition={
                                            isActive
                                                ? {
                                                      type: "spring",
                                                      stiffness: 300,
                                                      damping: 15,
                                                      duration: 0.2,
                                                      delay: 0.15,
                                                  }
                                                : {
                                                      type: "keyframes",
                                                      duration: 0.1,
                                                      delay: 0,
                                                  }
                                        }
                                    />
                                    <motion.div
                                        className={styles.bottom}
                                        initial={{ scaleY: 0 }}
                                        animate={{
                                            scaleY: active === item.id ? 1 : 0,
                                        }}
                                        transition={{
                                            type:
                                                active === item.id
                                                    ? "spring"
                                                    : "keyframes",
                                            stiffness: 300,
                                            damping: 15,
                                            duration:
                                                active === item.id ? 0.2 : 0.1,
                                            delay:
                                                active === item.id ? 0.15 : 0,
                                        }}
                                    />
                                </motion.div>
                            </motion.li>
                        );
                    })}
                </ul>

                {/* Language Selector */}
                <div className={styles.languages}>
                    <span>EN</span>
                    <span>ES</span>
                </div>
            </motion.div>
        </>
    );
};

export default Sidebar;
