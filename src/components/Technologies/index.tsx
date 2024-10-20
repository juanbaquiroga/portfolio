// "use client"
// import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
// import styles from "./Technologies.module.scss";
// import { useEffect, useRef, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/config/firebase";
// import { Card } from "./Card";
// import {Title} from "./Title";

// export interface Item {
//     id: string;
//     title: string;
//     d: string;
//     viewbox: string
// }


// export const Technologies = () => {
//     const ref = useRef(null);
//     const [items, setItems] = useState<Item[]>([]);
//     const [offset, setOffset] = useState(0); // Para el desplazamiento continuo
//     const itemWidth = 220; // Ancho de cada item (incluyendo margen)
//     const totalWidth = items.length * itemWidth; // Ancho total del carrusel
//     const { scrollYProgress } = useScroll({ target: ref });

//     useEffect(() => {
//         const fetchData = async () => {
//         try {
//             const querySnapshot = await getDocs(collection(db, "technologies"));
//             const documents = querySnapshot.docs.map((doc) => ({
//             id: doc.id, 
//             ...doc.data() as Item
//             }));
//             console.log(documents);
//             setItems(documents);
//         } catch (error) {
//             console.error("Error fetching technologies:", error);
//         }
//         };
//         fetchData();
//     }, []);


//     useEffect(() => {
//         const interval = setInterval(() => {
//           // Desplazamiento continuo a la izquierda
//           setOffset((prevOffset) => {
//             // Si el desplazamiento llega al final, reciclamos el primer item al final
//             if (prevOffset <= -itemWidth) {
//               setItems((prevItems) => {
//                 const firstItem = prevItems[0]; // Tomamos el primer item
//                 const newItems = [...prevItems.slice(1), firstItem]; // Lo movemos al final
//                 return newItems;
//               });
//               return 0; // Reiniciamos el offset sin reiniciar visualmente el carrusel
//             }
//             return prevOffset - 2; // Ajusta la velocidad aquí
//           });
//         }, 20); // Velocidad del movimiento
    
//         return () => clearInterval(interval); // Limpiamos el intervalo al desmontar el componente
//       }, [items])

//     return(
//         <>
//             <section className={styles.technologies} ref={ref}>
//                 <div className={styles.container}>
//                     <motion.div className={styles.textContainer}>
//                         <Title/>
//                         <motion.h2 className={styles.subtitle}>Tools, frameworks, and languages I use</motion.h2>
//                     </motion.div>
//                     <motion.div 
//                         className={styles.cardsContainer}
//                         style={{
//                             display: "flex",
//                             transform: `translateX(${offset}px)`, // Desplazamos los items con el offset
//                             width: totalWidth + "px", // Ancho del contenedor
//                             transition: "transform 0.1s linear", // Transición suave
//                           }}
//                     >
//                         {items && items.map((item) => (
//                             Card(item)
//                         ))}
//                     </motion.div>
//                 </div>
//             </section>
//         </>
//     )
//}
"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Technologies.module.scss";
import { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Card } from "./Card";
import {Title} from "./Title";

export interface Item {
    id: string;
    title: string;
    d: string;
    viewbox: string
}


export const Technologies = () => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll(
        {
            target:ref,
            offset: [1, 0]
        }
    )
    const draw = useTransform(scrollYProgress, [0.40, 0], [0, 3500])
    const [items, setItems] = useState<Item[] | null>(null)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "technologies"));
            const documents = querySnapshot.docs.map((doc) => ({
              id: doc.id, 
              ...doc.data() as Item
            }));
            console.log(documents);
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
                        <Title/>
                        <motion.h2 className={styles.subtitle}>Tools, frameworks, and languages I use</motion.h2>
                    </motion.div>
                    <motion.div className={styles.cardsContainer}>
                        {items && items.map((item) => (
                            Card(item)
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    )
}
