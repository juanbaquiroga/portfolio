import { Icon } from '@/components/Icon';
import styles from './Main.module.scss';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export const Main = () => {
    const labelRef = useRef<HTMLSpanElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const codeWindowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.fromTo(labelRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.35, delay: 0.1 }
        )
        .fromTo(headlineRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.4 },
            "-=0.2"
        )
        .fromTo(subtitleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.35 },
            "-=0.25"
        )
        .fromTo(ctaRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)" },
            "-=0.2"
        );

        if (statsRef.current) {
            const statItems = statsRef.current.children;
            tl.fromTo(statItems,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 },
                "-=0.2"
            );
        }

        if (codeWindowRef.current) {
            tl.fromTo(codeWindowRef.current,
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" },
                "-=0.4"
            );
        }
    }, []);

    return (
        <main id='main' className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <span ref={labelRef} className={styles.label} style={{ opacity: 0 }}>
                        Full Stack Developer
                    </span>
                    <h1 ref={headlineRef} className={styles.headline} style={{ opacity: 0 }}>
                        Building Digital Products,{' '}
                        <span className={styles.accent}>Front to Back.</span>
                    </h1>
                    <p ref={subtitleRef} className={styles.subtitle} style={{ opacity: 0 }}>
                        I design and build modern web experiences with clean architecture 
                        and pixel-perfect interfaces.
                    </p>
                    <a ref={ctaRef} href="#projects" className={styles.cta} style={{ opacity: 0 }}>
                        View my work
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                    <div ref={statsRef} className={styles.stats}>
                        <div className={styles.stat} style={{ opacity: 0 }}>
                            <span className={styles.statNumber}>4+</span>
                            <span className={styles.statLabel}>Years Experience</span>
                        </div>
                        <div className={styles.stat} style={{ opacity: 0 }}>
                            <span className={styles.statNumber}>6+</span>
                            <span className={styles.statLabel}>Projects Shipped</span>
                        </div>
                        <div className={styles.stat} style={{ opacity: 0 }}>
                            <span className={styles.statNumber}>∞</span>
                            <span className={styles.statLabel}>Cups of Coffee</span>
                        </div>
                    </div>
                </div>

                <div ref={codeWindowRef} className={styles.codeWindowWrapper} style={{ opacity: 0 }}>
                    <div className={styles.codeWindow}>
                        <div className={styles.windowHeader}>
                            <div className={styles.windowDots}>
                                <span className={`${styles.dot} ${styles.dotRed}`} />
                                <span className={`${styles.dot} ${styles.dotYellow}`} />
                                <span className={`${styles.dot} ${styles.dotGreen}`} />
                            </div>
                            <span className={styles.windowTitle}>portfolio.tsx</span>
                            <div className={styles.badgeJB}>JB</div>
                        </div>

                        <div className={styles.codeBody}>
                            <pre>
                                <code>
                                    <span className={styles.kw}>import</span> {'{'} <span className={styles.ident}>useState</span> {'}'} <span className={styles.kw}>from</span> <span className={styles.str}>&apos;react&apos;</span>{'\n'}
                                    <span className={styles.kw}>import</span> {'{'} <span className={styles.ident}>createProduct</span> {'}'} <span className={styles.kw}>from</span> <span className={styles.str}>&apos;next&apos;</span>{'\n\n'}
                                    <span className={styles.kw}>const</span> <span className={styles.func}>JuanBa</span> = () =&gt; ({'{'}{'\n'}
                                    {'  '}<span className={styles.prop}>role</span>: <span className={styles.str}>&apos;Full Stack Developer&apos;</span>,{'\n'}
                                    {'  '}<span className={styles.prop}>stack</span>: <span className={styles.str}>&apos;React + Next.js + Node&apos;</span>,{'\n'}
                                    {'  '}<span className={styles.prop}>passion</span>: <span className={styles.str}>&apos;building digital products&apos;</span>,{'\n'}
                                    {'  '}<span className={styles.prop}>status</span>: <span className={styles.str}>&apos;open to work&apos;</span>{'\n'}
                                    {'}'}){'\n\n'}
                                    <span className={styles.comment}>// Frontend meets Backend ✦</span>
                                </code>
                            </pre>
                        </div>

                        <div className={styles.windowFooter}>
                            <span className={styles.pillTag}>React.js</span>
                            <span className={styles.pillTag}>Next.js</span>
                            <span className={styles.pillTag}>TypeScript</span>
                            <span className={styles.pillTag}>Node.js</span>
                        </div>
                    </div>

                    <div className={styles.availableBadge}>
                        <span className={styles.pulsingDot} />
                        Available for work
                    </div>
                </div>
            </div>

            <div className={styles.socialLinks}>
                <Icon icon="instagram" delay={0.2} link="https://instagram.com/juanbaquiroga" />
                <Icon icon="linkedin" delay={0.25} link="https://linkedin.com/in/juanbaquiroga" />
                <Icon icon="github" delay={0.3} link="https://github.com/juanbaquiroga" />
            </div>
        </main>
    );
};