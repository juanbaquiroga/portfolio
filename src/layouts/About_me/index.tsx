"use client";
import styles from "./About_me.module.scss";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import photo from "@/assets/about-me.png";
import { Ititle } from "@/interfaces/title.interface";
import { Title } from "@/components/Title";

const title: Ititle = {
    d: "M72.0276 114.939C59.5276 68.9394 -21.2724 123.639 15.5276 176.439C61.5276 242.439 186.363 76.9394 210.028 14.4394C228.417 -34.1273 178.328 141.417 206.109 172.474C208.979 175.682 213.752 174.104 216.309 170.642L234.659 145.793C235.56 144.573 236.72 143.584 238.05 142.856C257.194 132.362 297.721 103.907 322.028 64.9394C353.397 14.6491 274.686 31.7952 228.603 161.807C228.227 162.866 228.021 164.078 228.049 165.202C229.163 209.254 272.622 163.833 277.028 150.439C289.356 112.962 270.558 155.244 313.685 132.912C314.87 132.299 315.954 131.404 316.803 130.376C321.796 124.32 329.363 115.934 327.528 121.439C325.054 128.861 283.876 200.477 339.211 174.795C340.346 174.268 341.476 173.435 342.317 172.507C394.704 114.656 346.581 97.5989 331.5 116.939C309.667 144.939 315.528 189.5 372.472 163.439C396 152.672 399 113.431 397 116.939C377.333 151.439 369.3 201.739 404.5 172.939C433.181 149.473 436.497 135.921 438.004 129.903C438.502 127.913 438.545 125.739 437.838 127.665C431.615 144.639 407.1 273.711 517.028 64.9394C527 46 483 106.212 522.5 105.439C570.5 104.5 484.5 105.439 458.5 105.439C430 105.439 496.291 103.5 492.408 110.5C479.965 132.934 451.385 205.691 508.5 172.939M125.528 108.439C135.028 90.9394 218.028 114.939 228.028 97.4394M583.028 112.939C582.361 124.939 576.528 154.739 558.528 177.939C536.179 206.744 665.267 1.24111 614.585 166.031C613.943 168.118 610.354 172.282 610.937 170.177C613.315 161.593 716.093 53.759 657.028 161.439C648.336 177.285 659.105 190.826 701.159 144.93C704.32 141.481 709.412 140.721 713.939 141.903C716.231 142.501 718.953 142.939 722.028 142.939C757.028 142.939 768.528 60.9394 710.028 132.439C688.028 165.939 710.028 209.939 770.528 142.939",
    viewBox: "0 0 784 198",
    strokeDash: 2200,
    color: "color-2",
    strokeWidth: 11,
};
export const About_me = () => {
    const refImg = useRef(null);
    const refText1 = useRef(null);
    const refText2 = useRef(null);
    const refButton = useRef(null);
    const imgInView = useInView(refImg, {
        once: false,
        margin: "100000px 0px -100px 0px",
    });
    const textInView1 = useInView(refText1, {
        once: false,
        margin: "100000px 0px -100px 0px",
    });
    const textInView2 = useInView(refText2, {
        once: false,
        margin: "100000px 0px -100px 0px",
    });
    const buttonInView = useInView(refButton, {
        once: false,
        margin: "100000px 0px -100px 0px",
    });

    return (
        <>
            <section id="about_me" className={styles.about_me}>
                <motion.div className={styles.container}>
                    <Title title={title} />
                    <motion.div className={styles.interiorContainer}>
                        <motion.div
                            ref={refImg}
                            animate={imgInView ? { scale: 1 } : { scale: 0 }}
                            style={{
                                opacity: imgInView ? 1 : 0,
                                transition: "all 0.15s cubic-bezier(0.17, 0.55, 0.55, 1)",
                            }}
                            className={styles.photoContainer}
                        >
                            <Image
                                className={styles.photo}
                                src={photo}
                                alt="picture of myself"
                            ></Image>
                        </motion.div>
                        <div className={styles.textContainer}>
                            <motion.p
                                ref={refText1}
                                initial={{ scale: 0 }}
                                animate={textInView1 ? { scale: 1 } : { scale: 0 }}
                                style={{
                                    opacity: textInView1 ? 1 : 0,
                                    transition: "all 0.15s cubic-bezier(0.17, 0.55, 0.55, 1)",
                                }}
                                className={styles.text}
                            >
                                Throughout my career, I have contributed to the development and
                                maintenance of multiple web platforms, ensuring optimal
                                performance and user experience. I have a solid foundation in
                                both front-end and back-end development. Let's connect and build
                                something amazing together!
                            </motion.p>

                            <motion.p
                                ref={refText2}
                                initial={{ scale: 0 }}
                                animate={textInView2 ? { scale: 1 } : { scale: 0 }}
                                style={{
                                    opacity: textInView2 ? 1 : 0,
                                    transition: "all 0.15s cubic-bezier(0.17, 0.55, 0.55, 1)",
                                }}
                                className={styles.text}
                            >
                                I'm a Junior Full Stack Developer passionate about building web
                                solutions. Proficient in HTML, CSS, JavaScript, React.js, and
                                Next.js, I thrive in both front-end and back-end development. I
                                love learning and collaborating on innovative projects.
                            </motion.p>
                        </div>
                    </motion.div>
                    {/* <motion.a
                        className={styles.button}
                        ref={refButton}
                        initial={{ scale: 0 }}
                        animate={buttonInView ? { scale: 1 } : { scale: 0 }}
                        style={{
                            opacity: buttonInView ? 1 : 0,
                            transition: "all 0.15s cubic-bezier(0.17, 0.55, 0.55, 1)",
                        }}
                    >
                        <svg className={styles.svg} viewBox="0 0 384 512">
                            <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z" />
                        </svg>
                        Resume
                    </motion.a> */}
                </motion.div>
            </section>
        </>
    );
};
