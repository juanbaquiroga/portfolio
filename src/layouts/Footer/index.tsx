import { useRef } from "react"
import styles from "./Footer.module.scss"
import { Icon } from "@/components/Icon"

export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer id="footer" className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <span className={styles.logo}>JB<span className={styles.accentDot}>.</span></span>
                        <p className={styles.tagline}>Building digital experiences.</p>
                    </div>
                    <nav className={styles.nav}>
                        <a href="#main" className={styles.navLink}>Home</a>
                        <a href="#about-me" className={styles.navLink}>About</a>
                        <a href="#technologies" className={styles.navLink}>Tools</a>
                        <a href="#projects" className={styles.navLink}>Projects</a>
                        <a href="#contact" className={styles.navLink}>Contact</a>
                    </nav>
                    <div className={styles.socials}>
                        <Icon icon="instagram" delay={0} link="https://instagram.com/juanbaquiroga" />
                        <Icon icon="linkedin" delay={0} link="https://linkedin.com/in/juanbaquiroga" />
                        <Icon icon="github" delay={0} link="https://github.com/juanbaquiroga" />
                    </div>
                </div>
                <div className={styles.divider} />
                <div className={styles.bottom}>
                    <p className={styles.copyright}>&copy; {year} Juan Baquiroga. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};