"use client"
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import styles from "./Technologies.module.scss";
import { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Card } from "./Card";
import {Title} from "@/components/Title";
import { Slider } from "./Slider";
import { Ititle } from "@/interfaces/title.interface";
import { Itechnologie } from "@/interfaces/technologie.interface";

const title:Ititle = {
  d: "M37.8336 74.912C5.33382 74.912 -17.6661 149.912 48.3336 155.412C63.5003 160.245 104.466 155.95 137.834 94.912C155.338 62.8918 165.096 43.3574 172.049 31.912M196.834 18.9134C185.659 15.7615 181.381 16.5491 172.049 31.912M114.334 48.912C94.3339 109.912 28.8339 85.412 57.3339 38.912C66.8103 23.412 103.02 0.311987 172.049 31.912M172.334 31.912C191.334 43.412 238.334 52.412 235.834 32.912M177.834 97.912C183.334 102.579 197.134 107.412 208.334 89.412C222.334 66.912 206.334 62.9119 188.834 78.912C171.334 94.912 158.334 144.912 194.834 129.412C205.834 124.741 230.096 107.912 231.334 102.412C235.834 82.412 288.834 47.912 268.834 90.412C261.834 102.412 292.334 54.412 252.334 77.412C236.834 91.412 211.934 121.212 236.334 128.412C261.334 134.912 290.834 102.912 291.334 100.412C295.667 93.7453 301.334 77.412 305.334 73.912C394.334 45.412 381.834 -56.088 311.834 61.412C302.167 77.912 265.834 162.912 292.334 114.912C293.714 112.412 367.834 34.912 331.834 97.912C320.405 117.912 311.834 149.112 357.834 105.912C363.389 99.7746 370.895 83.1491 375.5 66.5C382 43 359 117 347 129C342.777 133.223 334.5 144 362 104.5C368.266 95.5 442.5 37 391.5 105C389 108.333 372 153 425.5 104.5C434.833 91.3333 450.8 68.4 440 82C426.5 99 408.833 155.679 453 123.5C488 98 476 48 440 73.912C410 95.5053 444 153 494.5 101C632.5 -1.99997 557.5 -40.5 500.5 90C487.667 118.333 478.4 160.9 544 104.5C569.5 70.5 567.5 73.912 552.5 87.5C534.5 123.5 544.41 144.69 572.5 123.5C601 102 605 40 554.5 80.5C534.5 96.5396 559.5 142 604.5 112.5C618.333 91.6961 647.5 52.5 662 61.5C674.674 69.3664 672.12 73.5 671 71.5C664 59 653 48 622 90.5C603.4 116 600.5 158 662 90.5C668.833 83 671 72 657.5 110C650.667 125.333 636.419 158.223 632 166C585.977 247 532.5 192.5 613.5 143.5C633.524 131.387 672.5 125.5 677 117.5C683.5 103 699.261 76.2263 696.5 82C691 93.5 680 104.5 677 119.5C676 126.5 681.2 132.9 710 102.5C718.5 93.5278 706 98 719 101C749.5 108.038 765 45.5 727 78.5C711.455 92 692 136.5 724.5 130.5C739 127.823 768 110 797 62C807 49 806.5 38 797 59C790 82 809.5 124.5 785.5 134C774 138.552 748.5 121.5 775.5 130.5C787.5 134.5 822 125.5 822 114M706 64.5V65.5H707V64.5H706Z",
  viewBox: "0 0 828 213",
  strokeDash: 3500,
  color:"accent",
  strokeWidth: 12
}

export const Technologies = () => {

  const subtitleRef = useRef(null)
  const [items, setItems] = useState<Itechnologie[] | null>(null)
  const subtitleInView = useInView(subtitleRef, { once: false , margin: "100000px 0px -100px 0px"})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "technologies"));
        const documents = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Itechnologie;
          return {
            ...data,
            id: doc.id,
          };
        });
        setItems(documents);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      }
    };
    fetchData();
  }, []);


  return(
    <>
      <section className={styles.technologies}>
        <div className={styles.container}>
          <motion.div className={styles.textContainer}>
            <Title title={title}/>
            <motion.h2 
              className={styles.subtitle}
              ref={subtitleRef}
              initial= {{scale: 0}}
              animate={subtitleInView ?{scale:1}:{scale:0}}
              style={{
                  opacity: subtitleInView ? 1 : 0,
                  transition: "all 0.15s cubic-bezier(0.17, 0.55, 0.55, 1)" 
              }}
              >Tools, frameworks, and languages I use
            </motion.h2>
          </motion.div>
          <Slider items={items} direction="left" speed="normal" pauseOnHover={true} />
        </div>
      </section>
    </>
  )
}
