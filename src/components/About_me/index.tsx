"use client"
import styles from './About_me.module.scss';
import {useRef} from "react";
import {motion, useInView, useScroll, useTransform} from "framer-motion";
import Image from 'next/image';
import photo from './resources/about-me.png';


// export const About_me = () =>{
//     const ref = useRef(null)
//     const { scrollYProgress } = useScroll(
//         {
//             target:ref,
//             offset: [1, 0]
//         }
//     )
//     const draw = useTransform(scrollYProgress, [0, 0.40], [2200, 0]);
//     const appear_1 = useTransform(scrollYProgress, [0.3, 0.7], [0, 1])
//     const scale_1 = useTransform(scrollYProgress, [0.2, 0.7], [0.5, 1])
//     const appear_2 = useTransform(scrollYProgress, [0.4, 0.8], [0, 1])
//     const appear_3 = useTransform(scrollYProgress, [0.2, 0.7], [0, 1])
//     const translate_1 = useTransform(scrollYProgress, [0.45, 0.7], [-100, 0])
//     const translate_2 = useTransform(scrollYProgress, [0.45, 0.7], [100, 0])  
//     const translate_3 = useTransform(scrollYProgress, [0.55, 0.8], [100, 0])  

//     return(
//         <>
//         <section id="about_me" className={styles.about_me}>
//             <motion.div className={styles.container}>
//                     <motion.svg ref={ref} className={styles.svg} viewBox="0 0 784 198" >
//                         <motion.path
//                         initial={{strokeDashoffset: 2200}}
//                         style={{
//                             strokeDashoffset: draw
//                         }}
//                         className={styles.draw}
//                         d="M72.0276 114.939C59.5276 68.9394 -21.2724 123.639 15.5276 176.439C61.5276 242.439 186.363 76.9394 210.028 14.4394C228.417 -34.1273 178.328 141.417 206.109 172.474C208.979 175.682 213.752 174.104 216.309 170.642L234.659 145.793C235.56 144.573 236.72 143.584 238.05 142.856C257.194 132.362 297.721 103.907 322.028 64.9394C353.397 14.6491 274.686 31.7952 228.603 161.807C228.227 162.866 228.021 164.078 228.049 165.202C229.163 209.254 272.622 163.833 277.028 150.439C289.356 112.962 270.558 155.244 313.685 132.912C314.87 132.299 315.954 131.404 316.803 130.376C321.796 124.32 329.363 115.934 327.528 121.439C325.054 128.861 283.876 200.477 339.211 174.795C340.346 174.268 341.476 173.435 342.317 172.507C394.704 114.656 346.581 97.5989 331.5 116.939C309.667 144.939 315.528 189.5 372.472 163.439C396 152.672 399 113.431 397 116.939C377.333 151.439 369.3 201.739 404.5 172.939C433.181 149.473 436.497 135.921 438.004 129.903C438.502 127.913 438.545 125.739 437.838 127.665C431.615 144.639 407.1 273.711 517.028 64.9394C527 46 483 106.212 522.5 105.439C570.5 104.5 484.5 105.439 458.5 105.439C430 105.439 496.291 103.5 492.408 110.5C479.965 132.934 451.385 205.691 508.5 172.939M125.528 108.439C135.028 90.9394 218.028 114.939 228.028 97.4394M583.028 112.939C582.361 124.939 576.528 154.739 558.528 177.939C536.179 206.744 665.267 1.24111 614.585 166.031C613.943 168.118 610.354 172.282 610.937 170.177C613.315 161.593 716.093 53.759 657.028 161.439C648.336 177.285 659.105 190.826 701.159 144.93C704.32 141.481 709.412 140.721 713.939 141.903C716.231 142.501 718.953 142.939 722.028 142.939C757.028 142.939 768.528 60.9394 710.028 132.439C688.028 165.939 710.028 209.939 770.528 142.939" stroke="black" stroke-width="11" stroke-linecap="round"/>
//                     </motion.svg>
//                 <motion.div className={styles.interiorContainer}>
//                     <motion.div initial= {{opacity: 0, scale:0.5}} style={{opacity: appear_3, scale: scale_1}} className={styles.photoContainer}>
//                         <Image className={styles.photo} src={photo} alt='picture of myself'></Image>
//                     </motion.div>
//                     <div className={styles.textContainer}>
//                         <motion.p initial= {{opacity: 0}} style={{opacity: appear_1}} className={styles.text}>Throughout my career, I have contributed to the development and maintenance of multiple web platforms, ensuring optimal performance and user experience. I have a solid foundation in both front-end and back-end development. Let's connect and build something amazing together!</motion.p>
//                         {/* <motion.p initial= {{ opacity:0, scale: 0.4}} style={{opacity:appear_1,  scale: scale_1}} className={styles.text}>Throughout my career, I have contributed to the development and maintenance of multiple web platforms, ensuring optimal performance and user experience. I have a solid foundation in both front-end and back-end development. Let's connect and build something amazing together!</motion.p> */}
//                         <motion.p initial= {{opacity: 0}} style={{opacity: appear_2}} className={styles.text}>I'm a Junior Full Stack Developer passionate about building web solutions. Proficient in HTML, CSS, JavaScript, React.js, and Next.js, I thrive in both front-end and back-end development. I love learning and collaborating on innovative projects.</motion.p>
//                         {/* <SplitText text="Throughout my career, I have contributed to the development and maintenance of multiple web platforms, ensuring optimal performance and user experience. I have a solid foundation in both front-end and back-end development. Let's connect and build something amazing together!" />
//                         <SplitText text="I'm a Junior Full Stack Developer passionate about building web solutions. Proficient in HTML, CSS, JavaScript, React.js, and Next.js, I thrive in both front-end and back-end development. I love learning and collaborating on innovative projects." /> */}
//                     </div>
//                 </motion.div> 
//             </motion.div>
//         </section>
//         </>
//     )
// }
export const About_me = () =>{
    const ref = useRef(null)
    const refImg = useRef(null)
    const refText1 = useRef(null)
    const refText2 = useRef(null)
    const imgInView = useInView(refImg, { once: false , margin: "100000px 0px -100px 0px"});
    const textInView1 = useInView(refText1, { once: false , margin: "100000px 0px -100px 0px"})
    const textInView2 = useInView(refText2, { once: false , margin: "100000px 0px -100px 0px"})

    const { scrollYProgress } = useScroll(
        {
            target:ref,
            offset: [1, 0]
        }
    )
    const draw = useTransform(scrollYProgress, [0, 0.32], [2200, 0]);


    return(
        <>
        <section id="about_me" className={styles.about_me}>
            <motion.div className={styles.container}>
                    <motion.svg ref={ref} className={styles.svg} viewBox="0 0 784 198" >
                        <motion.path
                        initial={{strokeDashoffset: 2200}}
                        style={{
                            strokeDashoffset: draw
                        }}
                        className={styles.draw}
                        d="M72.0276 114.939C59.5276 68.9394 -21.2724 123.639 15.5276 176.439C61.5276 242.439 186.363 76.9394 210.028 14.4394C228.417 -34.1273 178.328 141.417 206.109 172.474C208.979 175.682 213.752 174.104 216.309 170.642L234.659 145.793C235.56 144.573 236.72 143.584 238.05 142.856C257.194 132.362 297.721 103.907 322.028 64.9394C353.397 14.6491 274.686 31.7952 228.603 161.807C228.227 162.866 228.021 164.078 228.049 165.202C229.163 209.254 272.622 163.833 277.028 150.439C289.356 112.962 270.558 155.244 313.685 132.912C314.87 132.299 315.954 131.404 316.803 130.376C321.796 124.32 329.363 115.934 327.528 121.439C325.054 128.861 283.876 200.477 339.211 174.795C340.346 174.268 341.476 173.435 342.317 172.507C394.704 114.656 346.581 97.5989 331.5 116.939C309.667 144.939 315.528 189.5 372.472 163.439C396 152.672 399 113.431 397 116.939C377.333 151.439 369.3 201.739 404.5 172.939C433.181 149.473 436.497 135.921 438.004 129.903C438.502 127.913 438.545 125.739 437.838 127.665C431.615 144.639 407.1 273.711 517.028 64.9394C527 46 483 106.212 522.5 105.439C570.5 104.5 484.5 105.439 458.5 105.439C430 105.439 496.291 103.5 492.408 110.5C479.965 132.934 451.385 205.691 508.5 172.939M125.528 108.439C135.028 90.9394 218.028 114.939 228.028 97.4394M583.028 112.939C582.361 124.939 576.528 154.739 558.528 177.939C536.179 206.744 665.267 1.24111 614.585 166.031C613.943 168.118 610.354 172.282 610.937 170.177C613.315 161.593 716.093 53.759 657.028 161.439C648.336 177.285 659.105 190.826 701.159 144.93C704.32 141.481 709.412 140.721 713.939 141.903C716.231 142.501 718.953 142.939 722.028 142.939C757.028 142.939 768.528 60.9394 710.028 132.439C688.028 165.939 710.028 209.939 770.528 142.939" stroke="black" stroke-width="11" stroke-linecap="round"/>
                    </motion.svg>
                <motion.div className={styles.interiorContainer}>
                    <motion.div 
                        ref={refImg}
                        animate={imgInView ?{scale:1}:{scale:0}}
                        style={{
                            opacity: imgInView? 1 : 0,
                            transition: "all 0.15s cubic-bezier(0.17, 0.55, 0.55, 1)"
                        }}
                        className={styles.photoContainer}>
                            <Image className={styles.photo} src={photo} alt='picture of myself'></Image>
                    </motion.div>
                    <div className={styles.textContainer}>
                        <motion.p 
                            ref={refText1}
                            initial= {{scale: 0}}
                            animate={textInView1 ?{scale:1}:{scale:0}}
                            style={{
                                opacity: textInView1? 1 : 0,
                                transition: "all 0.15s cubic-bezier(0.17, 0.55, 0.55, 1)"
                            }} 
                            className={styles.text}
                            >Throughout my career, I have contributed to the development and maintenance of multiple web platforms, ensuring optimal performance and user experience. I have a solid foundation in both front-end and back-end development. Let's connect and build something amazing together!
                        </motion.p>
                        
                        <motion.p 
                            ref={refText2}
                            initial= {{scale: 0}}
                            animate={textInView2 ?{scale:1}:{scale:0}}
                            style={{
                                opacity: textInView2 ? 1 : 0,
                                transition: "all 0.15s cubic-bezier(0.17, 0.55, 0.55, 1)" 
                            }} 
                            className={styles.text}
                            >I'm a Junior Full Stack Developer passionate about building web solutions. Proficient in HTML, CSS, JavaScript, React.js, and Next.js, I thrive in both front-end and back-end development. I love learning and collaborating on innovative projects.
                        </motion.p>
                        
                    </div>
                </motion.div> 
            </motion.div>
        </section>
        </>
    )
}