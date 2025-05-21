import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import styles from "./Sidebar.module.scss";
import { Julius_Sans_One } from "next/font/google";

const jls = Julius_Sans_One({ subsets: ["latin"], weight: ["400"] });

const menuItems = [
    { id: 0, label: "PORTFOLIO", href: "#main" },
    { id: 1, label: "ABOUT ME", href: "#about-me"},
    { id: 2, label: "PROJECTS", href: "#projects" },
    { id: 3, label: "TECHNOLOGIES", href: "#technologies" },
    { id: 4, label: "CONTACT", href: "#contact"},
];

const Sidebar = () => {
    const [active, setActive] = useState<Number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [show, setShow] = useState(false);

    // Refs para animaciones GSAP
    const activeZoneRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const menuItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const expandRefs = useRef<(HTMLDivElement | null)[]>([]);
    const topRefs = useRef<(HTMLDivElement | null)[]>([]);
    const bottomRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 2000);
        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            const sections = menuItems.map(item => document.querySelector(item.href));
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            sections.forEach((section, index) => {
                if (section) {
                    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
                    const sectionBottom = sectionTop + (section as HTMLElement).offsetHeight;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        setActive(index);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animación de la zona activa y sidebar
    useEffect(() => {
        if (!show) return;

        let gradTween: gsap.core.Tween | null = null;
        let gradObj = { percent: 50 };

        if (activeZoneRef.current) {
            gsap.killTweensOf(activeZoneRef.current);

            if (isVisible) {
                gsap.to(activeZoneRef.current, {
                    x: "0%",
                    opacity: 0,
                    duration: 0.35,
                    ease: "power2.out",
                    background: "radial-gradient(ellipse at left center, rgba(0, 0, 0, 0.26) 0%, transparent 70%)"
                });
            } else {
                // Animación infinita del gradiente
                gradObj.percent = 50;
                gradTween = gsap.to(gradObj, {
                    percent: 80,
                    duration: 1.2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    onUpdate: () => {
                        if (activeZoneRef.current) {
                            activeZoneRef.current.style.background = `radial-gradient(ellipse at left center, rgba(0, 0, 0, 0.35) 0%, transparent ${gradObj.percent}%)`;
                        }
                    }
                });
                gsap.to(activeZoneRef.current, {
                    x: "0%",
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        }

        if (sidebarRef.current) {
            gsap.killTweensOf(sidebarRef.current);
            gsap.to(sidebarRef.current, {
                x: isVisible ? "0%" : "-150%",
                duration: 0.5,
                ease: "power2.out"
            });
        }

        // Limpieza del tween al desmontar o cambiar visibilidad
        return () => {
            if (gradTween) gradTween.kill();
        };
    }, [isVisible, show]);

    // Animación de los items del menú y expand/top/bottom
    useEffect(() => {
        menuItems.forEach((item, index) => {
            const isActive = (active === item.id && isVisible);
            const menuItem = menuItemRefs.current[index];
            const expand = expandRefs.current[index];
            const top = topRefs.current[index];
            const bottom = bottomRefs.current[index];

            // Animación del item
            if (menuItem) {
                gsap.killTweensOf(menuItem);
                gsap.to(menuItem, {
                    fontSize: isActive ? "20px" : "10px",
                    width: isActive ? "150%" : "100%",
                    height: isActive ? "75px" : "30px",
                    duration: 0.5,
                    ease: "elastic.out(1.1, 0.8)"
                });
            }

            // Animación del expand
            if (expand) {
                gsap.killTweensOf(expand);
                gsap.to(expand, {
                    width: isActive ? "75px" : "0px",
                    height: isActive ? "80px" : "10px",
                    duration: 0.5,
                    ease: "elastic.out(1.1, 0.8)"
                });
            }

            // Animación top
            if (top) {
                gsap.killTweensOf(top);
                gsap.to(top, {
                    scaleY: isActive ? 1 : 0,
                    duration: isActive ? 0.2 : 0.1,
                    delay: isActive ? 0.1 : 0,
                    transformOrigin: "top",
                    ease: "elastic.out(1.1, 0.8)"
                });
            }

            // Animación bottom
            if (bottom) {
                gsap.killTweensOf(bottom);
                gsap.to(bottom, {
                    scaleY: isActive ? 1 : 0,
                    duration: isActive ? 0.2 : 0.1,
                    delay: isActive ? 0.1 : 0,
                    transformOrigin: "bottom",
                    ease: "elastic.out(1.1, 0.8)"
                });
            }
        });
    }, [active, isVisible]);

    return (
        <>
            <div
                ref={activeZoneRef}
                className={styles.activeZone}
                onMouseEnter={() => setIsVisible(true)}
            ></div>
            <div
                ref={sidebarRef}
                className={styles.sidebar}
                onMouseLeave={() => setIsVisible(false)}
                style={show ? {display:"flex"} : {display:"none"}}
            >
                {/* Logo */}
                <div className={styles.logoContainer}>
                    <svg className={styles.svg} viewBox="0 0 204 152">
                        <path
                            className={styles.pathFill}
                            d="M54.5 0.500046V94C54.5 106.167 45.8 126.2 11 109L1.5 142C15.3333 149.667 50.5 159.7 76.5 138.5V148.5H151.5C215.5 148.5 215.5 84.5 174.5 73C205.5 57 205 8.00005 163 0.500046H54.5ZM117.5 115V90H153.5C162.5 95.5 162.5 108.5 153.5 115H117.5ZM148 58.0001H117.5V34.5H148C158.5 41.5 158.5 52.5001 148 58.0001Z"
                        />
                        <path
                            className={styles.path}
                            d="M76.5 148.5V138.5C50.5 159.7 15.3333 149.667 1.5 142L11 109C45.8 126.2 54.5 106.167 54.5 94V0.500046H163C205 8.00005 205.5 57 174.5 73C215.5 84.5 215.5 148.5 151.5 148.5M76.5 148.5C100.667 148.5 149.5 148.5 151.5 148.5M76.5 148.5H151.5M117.5 90V115H153.5C162.5 108.5 162.5 95.5 153.5 90H117.5ZM117.5 58.0001H148C158.5 52.5001 158.5 41.5 148 34.5H117.5V58.0001Z"
                        />
                    </svg>
                </div>

                {/* Navigation Menu */}
                <div className={styles.menu}>
                    {menuItems.map((item, index) => {
                        return (
                            <a
                                key={item.id}
                                ref={(el: HTMLAnchorElement | null): void => {
                                    menuItemRefs.current[index] = el;
                                }}
                                href={item.href}
                                className={styles.menuItem}
                                onMouseEnter={() => setActive(item.id)}
                            >
                                <p className={`${jls.className} ${styles.letter}`}>
                                    {item.label}
                                </p>
                                <div
                                    ref={(el: HTMLDivElement | null): void => {
                                        expandRefs.current[index] = el;
                                    }}
                                    className={styles.expand}
                                >
                                    <div
                                        ref={(el: HTMLDivElement | null): void => {
                                            topRefs.current[index] = el;
                                        }}
                                        className={styles.top}
                                    />
                                    <div
                                        ref={(el: HTMLDivElement | null): void => {
                                            bottomRefs.current[index] = el;
                                        }}
                                        className={styles.bottom}
                                    />
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* Language Selector */}
                <div className={styles.languages}>
                    <span className={styles.active}>EN</span>
                    <span>/</span>
                    <span>ES</span>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
