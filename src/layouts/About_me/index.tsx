import styles from "./About_me.module.scss";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from 'gsap';
import { useGsapInView } from "@/hooks/useGsapInView";

export const About_me = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const photoRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLParagraphElement>(null);

    const [showPopup, setShowPopup] = useState(false);

    const resumeUrls = {
        english: "https://drive.google.com/uc?export=download&id=11h7PnlvkQVuhTTJpvTA4wkilR5dVrWzp",
        spanish: "https://drive.google.com/uc?export=download&id=1W2etoxrqexl8krGqWvh0lbTGNXFNJ_KP" 
    };

    const headingInView = useGsapInView(headingRef as any, { margin: "100000px 0px -60px 0px" });
    const textInView = useGsapInView(textRef as any, { margin: "100000px 0px -60px 0px" });
    const photoInView = useGsapInView(photoRef as any, { margin: "100000px 0px -60px 0px" });
    const buttonsInView = useGsapInView(buttonsRef as any, { margin: "100000px 0px -30px 0px" });

    useEffect(() => {
        if (!headingRef.current) return;
        if (headingInView) {
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.35, delay: 0.15, ease: "power2.out" }
            );
        } else {
            gsap.to(headingRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.22,
                ease: "power2.in"
            });
        }
    }, [headingInView]);

    useEffect(() => {
        if (!textRef.current) return;
        if (textInView) {
            gsap.fromTo(textRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.35, delay: 0.22, ease: "power2.out" }
            );
        } else {
            gsap.to(textRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.22,
                ease: "power2.in"
            });
        }
    }, [textInView]);

    useEffect(() => {
        if (!photoRef.current) return;
        if (photoInView) {
            gsap.fromTo(photoRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.35, delay: 0.18, ease: "power2.out" }
            );
        } else {
            gsap.to(photoRef.current, {
                scale: 0.9,
                opacity: 0,
                duration: 0.22,
                ease: "power2.in"
            });
        }
    }, [photoInView]);

    useEffect(() => {
        if (!buttonsRef.current) return;
        if (buttonsInView) {
            gsap.fromTo(buttonsRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.3, delay: 0.28, ease: "power2.out" }
            );
        } else {
            gsap.to(buttonsRef.current, {
                opacity: 0,
                y: 15,
                duration: 0.2,
                ease: "power2.in"
            });
        }
    }, [buttonsInView]);

    return (
        <>
            <section id="about-me" ref={sectionRef} className={styles.about}>
                <div className={styles.container}>
                    <span className={styles.label}>ABOUT</span>
                    <div className={styles.grid}>
                        <div className={styles.textColumn}>
                            <h2
                                ref={headingRef}
                                className={styles.heading}
                                style={{ opacity: 0 }}
                            >
                                Where clean code meets{' '}
                                <span className={styles.accentText}>purposeful design.</span>
                            </h2>
                            <p
                                ref={textRef}
                                className={styles.description}
                                style={{ opacity: 0 }}
                            >
                                I&apos;m a Full Stack Developer with a strong focus on Frontend development. 
                                I build modern web applications using React, Next.js, and Node.js, always 
                                prioritizing clean architecture, performance, and exceptional user experiences. 
                                I thrive on turning complex problems into simple, elegant solutions.
                            </p>
                            <div
                                ref={buttonsRef}
                                className={styles.buttons}
                                style={{ opacity: 0 }}
                            >
                                <a href="#contact" className={styles.btnOutline}>
                                    Let&apos;s Talk
                                </a>
                                <button
                                    className={styles.btnFilled}
                                    onClick={() => setShowPopup(true)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 384 512" fill="currentColor">
                                        <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z" />
                                    </svg>
                                    Resume
                                </button>
                            </div>
                        </div>
                        <div className={styles.photoColumn}>
                            <div
                                ref={photoRef}
                                className={styles.photoContainer}
                                style={{ opacity: 0 }}
                            >
                                <Image
                                    className={styles.photo}
                                    src="/about-me.png"
                                    alt="picture of myself"
                                    width={4000}
                                    height={9000}
                                />
                            </div>
                        </div>
                    </div>
                    <p ref={footerRef} className={styles.footerText}>
                        Based in Argentina • Available for remote work
                    </p>
                </div>

                {showPopup && (
                    <div className={styles.popupOverlay} onClick={() => setShowPopup(false)}>
                        <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.popupHeader}>
                                <h3>Select Resume Language</h3>
                                <button className={styles.closeButton} onClick={() => setShowPopup(false)}>×</button>
                            </div>
                            <div className={styles.popupContent}>
                                <a 
                                    href={resumeUrls.english}
                                    target="_blank"
                                    className={styles.languageButton}
                                >
                                    English
                                </a>
                                <a 
                                    href={resumeUrls.spanish}
                                    target="_blank"
                                    className={styles.languageButton}
                                >
                                    Español
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};