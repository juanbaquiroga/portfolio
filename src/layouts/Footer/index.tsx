import { useEffect, useRef, useState } from "react"
import styles from "./Footer.module.scss"
import { Icon } from "@/components/Icon"
import gsap from "gsap"
import { useGsapInView } from "@/hooks/useGsapInView";

export const Footer = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    const svgRef = useRef<SVGSVGElement | null>(null)
    const lineRef = useRef<HTMLDivElement | null>(null)
    const linksRef = useRef<HTMLDivElement | null>(null)
    const rightsRef = useRef<HTMLParagraphElement | null>(null)
    const contactRef = useRef<HTMLParagraphElement | null>(null)
    const mailRef = useRef<HTMLAnchorElement | null>(null)

    const svgInView = useGsapInView(svgRef as React.RefObject<HTMLElement>)
    const lineInView = useGsapInView(lineRef)
    const linksInView = useGsapInView(linksRef)
    const rightsInView = useGsapInView(rightsRef)
    const contactInView = useGsapInView(contactRef)
    const mailInView = useGsapInView(mailRef)

    useEffect(() => {
        if (svgRef.current) {
            if (svgInView) {
                gsap.fromTo(svgRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" })
            } else {
                gsap.set(svgRef.current, { scale: 0, opacity: 0 })
            }
        }
    }, [svgInView])
    useEffect(() => {
        if (lineRef.current) {
            if (lineInView) {
                gsap.fromTo(lineRef.current, { scaleY: 0, scaleX: 1, opacity: 0 }, { scaleY: 1, opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.out", transformOrigin: "center center" })
            } else {
                gsap.set(lineRef.current, { scaleX: 0, scaleY:0, opacity: 0, transformOrigin: "center" })
            }
        }
    }, [lineInView])
    useEffect(() => {
        if (linksRef.current) {
            if (linksInView) {
                gsap.to(linksRef.current.children, { y: 0, opacity: 1, stagger: 0.1, duration: 0.3, ease: "power2.out" })
            } else {
                gsap.set(linksRef.current.children, { y: 20, opacity: 0 })
            }
        }
    }, [linksInView])
    useEffect(() => {
        if (rightsRef.current) {
            if (rightsInView) {
                gsap.to(rightsRef.current, { opacity: 1, y: 0, duration: 0.25, delay: 0.25, ease: "power2.out" })
            } else {
                gsap.set(rightsRef.current, { opacity: 0, y: 20 })
            }
        }
    }, [rightsInView])
    useEffect(() => {
        if (contactRef.current) {
            if (contactInView) {
                gsap.to(contactRef.current, { opacity: 1, y: 0, duration: 0.25, delay: 0.25, ease: "power2.out" })
            } else {
                gsap.set(contactRef.current, { opacity: 0, y: 20 })
            }
        }
    }, [contactInView])
    useEffect(() => {
        if (mailRef.current) {
            if (mailInView) {
                gsap.to(mailRef.current, { opacity: 1, duration: 0.1, delay: 0.25, ease: "power2.out" })
            } else {
                gsap.set(mailRef.current, { opacity: 0 })
            }
        }
    }, [mailInView])

    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { root: null, rootMargin: "0px 0px -100px 0px", threshold: 0 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (isInView) {
            // Animación SVG
            if (svgRef.current) {
                gsap.fromTo(svgRef.current, 
                    { scale: 0, opacity: 0 }, 
                    { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
                )
            }
            // Animación de la línea
            if (lineRef.current) {
                gsap.fromTo(lineRef.current,{
                    scaleY: 0,
                    scaleX: 1,
                    opacity: 0,
                }, {
                    scaleY: 1,
                    opacity: 1,
                    scaleX: 1,
                    duration: 0.5,
                    ease: "power2.out",
                    transformOrigin: "center center"
                })
            }
            // Links animation
            if (linksRef.current) {
                gsap.to(linksRef.current.children, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.3,
                    ease: "power2.out"
                })
            }
            // Rights animation
            if (rightsRef.current) {
                gsap.to(rightsRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.25,
                    delay: 0.25,
                    ease: "power2.out"
                })
            }
            // Contact animation
            if (contactRef.current) {
                gsap.to(contactRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.25,
                    delay: 0.25,
                    ease: "power2.out"
                })
            }
            // Mail animation
            if (mailRef.current) {
                gsap.to(mailRef.current, {
                    opacity: 1,
                    duration: 0.1,
                    delay: 0.25,
                    ease: "power2.out"
                })
            }
        } else {
            // Reset all
            if (svgRef.current) {
                gsap.set(svgRef.current, { scale: 0, opacity: 0 })
            }
            if (lineRef.current) {
                gsap.set(lineRef.current, { scaleX: 0, scaleY:0, opacity: 0, transformOrigin: "center" })
            }
            if (linksRef.current) {
                gsap.set(linksRef.current.children, { y: 20, opacity: 0 })
            }
            if (rightsRef.current) {
                gsap.set(rightsRef.current, { opacity: 0, y: 20 })
            }
            if (contactRef.current) {
                gsap.set(contactRef.current, { opacity: 0, y: 20 })
            }
            if (mailRef.current) {
                gsap.set(mailRef.current, { opacity: 0 })
            }
        }
    }, [isInView])

    return (
        <>
            <footer id="footer" ref={ref} className={styles.footer}>
                <div className={styles.box1}>
                    <a href="#main" className={styles.logoContainer}>
                        <svg 
                            ref={svgRef}
                            className={styles.svg} 
                            viewBox="0 0 204 152"
                            style={{ opacity: 0, transform: "scale(0)" }}
                        >
                            <path className={styles.pathFill} d="M54.5 0.500046V94C54.5 106.167 45.8 126.2 11 109L1.5 142C15.3333 149.667 50.5 159.7 76.5 138.5V148.5H151.5C215.5 148.5 215.5 84.5 174.5 73C205.5 57 205 8.00005 163 0.500046H54.5ZM117.5 115V90H153.5C162.5 95.5 162.5 108.5 153.5 115H117.5ZM148 58.0001H117.5V34.5H148C158.5 41.5 158.5 52.5001 148 58.0001Z"/>
                            <path className={styles.path} d="M76.5 148.5V138.5C50.5 159.7 15.3333 149.667 1.5 142L11 109C45.8 126.2 54.5 106.167 54.5 94V0.500046H163C205 8.00005 205.5 57 174.5 73C215.5 84.5 215.5 148.5 151.5 148.5M76.5 148.5C100.667 148.5 149.5 148.5 151.5 148.5M76.5 148.5H151.5M117.5 90V115H153.5C162.5 108.5 162.5 95.5 153.5 90H117.5ZM117.5 58.0001H148C158.5 52.5001 158.5 41.5 148 34.5H117.5V58.0001Z"/>
                        </svg>
                    </a>
                </div>
                <div 
                    ref={lineRef}
                    className={styles.line}
                ></div>
                <div className={styles.box2}>
                    <div className={styles.container1}>
                        <div 
                            ref={linksRef}
                            className={styles.links}
                        >
                            <a href="#main" className={styles.link} style={{ opacity: 0, transform: "translateY(20px)" }}>Portfolio</a>
                            <a href="#aboutme" className={styles.link} style={{ opacity: 0, transform: "translateY(20px)" }}>About Me</a>
                            <a href="#projects" className={styles.link} style={{ opacity: 0, transform: "translateY(20px)" }}>Projects</a>
                            <a href="#technologies" className={styles.link} style={{ opacity: 0, transform: "translateY(20px)" }}>Technologies</a>
                            <a href="#contact" className={styles.link} style={{ opacity: 0, transform: "translateY(20px)" }}>Contact</a>
                        </div>
                        <p ref={rightsRef} className={styles.rights} style={{ opacity: 0, transform: "translateY(20px)" }}>
                            © Juanbaquiroga 2024. All rights reserved
                        </p>
                    </div>
                    <div 
                        className={styles.lineMobile}
                    ></div>
                    <div className={styles.container2}>
                        <div className={styles.links}>
                            <Icon icon="instagram" delay={0.05} inView={true} link="https://instagram.com/juanbaquiroga"></Icon>
                            <Icon icon="linkedin" delay={0.1} inView={true} link="https://linkedin.com/in/juanbaquiroga"></Icon>
                            <Icon icon="github" delay={0.15} inView={true} link="https://github.com/juanbaquiroga"></Icon>
                        </div>
                        <p ref={contactRef} className={styles.contact} style={{ opacity: 0, transform: "translateY(20px)" }}>
                            Contact: <a ref={mailRef} href="mailto:juanbaquiroga@gmail.com" className={styles.mail} style={{ opacity: 0 }}>juanbaquiroga@gmail.com</a>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}