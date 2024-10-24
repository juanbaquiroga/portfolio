"use client"
import styles from "./Background.module.scss"; 
//import { motion } from "framer-motion";
//import { useEffect, useState } from "react";




const generateParticles = (count: number) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        id: i,
        // Partículas empiezan a la izquierda (-10vw) y van hacia la derecha (110vw)
        xStart: "-10vw",
        xEnd: "110vw",
        // Posición aleatoria en el eje y (en cualquier lugar de la pantalla)
        yStart: Math.random() * 100 + "vh",
        yEnd: Math.random() * 100 + "vh",
        size: Math.random() * 8 + 2, // Tamaño aleatorio
        delay: Math.random() * 10, // Retraso aleatorio en el inicio
      });
    }
    return particles;
  };
  
export const Background = () => {
  // const [particles, setParticles] = useState(generateParticles(200))
  // const calculateParticleCount = () => {
  //   const width = window.innerWidth;
  //   const height = window.innerHeight;
  //   // Ajusta la cantidad de partículas según el área de la pantalla
  //   const area = width * height;
  //   const baseParticleDensity = 0.00015; // Ajusta este valor para modificar la densidad
  //   const particleCount = Math.floor(area * baseParticleDensity);
  //   return generateParticles(particleCount);
  // };
  // useEffect(() => {
  //   // Establece la cantidad de partículas al cargar la página
  //   setParticles(calculateParticleCount());

  //   // Recalcula la cantidad de partículas cuando la ventana cambia de tamaño
  //   const handleResize = () => {
  //     setParticles(calculateParticleCount());
  //   };
  //   window.addEventListener("resize", handleResize);

  //   // Limpia el event listener cuando el componente se desmonta
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  
    return (
      // <div className={styles.particles_container}>
      //   {particles.map((particle) => (
      //     <motion.div
      //       key={particle.id}
      //       className={styles.particle}
      //       initial={{
      //         opacity: 0.3,
      //         x: particle.xStart,
      //         y: particle.yStart,
      //       }}
      //       animate={{
      //         opacity: [0.3, 1, 0.3],
      //         x: [particle.xStart, particle.xEnd], // De izquierda a derecha
      //         y: [particle.yStart, particle.yEnd], // Mantén una posición aleatoria en Y
      //       }}
      //       transition={{
      //         duration: 10, // Duración del movimiento
      //         ease: "easeInOut",
      //         repeat: Infinity, // Repetir infinitamente
      //         delay: particle.delay, // Retraso en el inicio
      //       }}
      //       style={{
      //         width: particle.size,
      //         height: particle.size,
      //       }}
      //     />
      //   ))}
      // </div>
      <div className={styles.background}>

      </div>
    );
  };
  









// const generateParticles = (count: number) => {
//   const particles = [];
//   for (let i = 0; i < count; i++) {
//     particles.push({
//       id: i,
//       x: Math.random() * 100 + "vw",
//       y: Math.random() * 100 + "vh",
//       size: Math.random() * 5 + 2,
//       delay: Math.random() * 10,
//     });
//   }
//   return particles;
// };


// export const Background = () => {

    
//   const particles = generateParticles(200); 
//   return (
//     <div className={styles.particles_container}>
//       {particles.map((particle) => (
//         <motion.div
//           key={particle.id}
//           className={styles.particle}
//           initial={{
//             opacity: 0,
//             x: particle.x,
//             y: particle.y,
//           }}
//           animate={{
//             opacity: 1,
//             x: ["-10vw", particle.x, "110vw"],
//             y: ["-10vh", particle.y, "110vh"],
//           }}
//           transition={{
//             duration: 10,
//             ease: "easeInOut",
//             repeat: Infinity,
//             delay: particle.delay,
//           }}
//           style={{
//             width: particle.size,
//             height: particle.size,
//           }}
//         />
//       ))}
//     </div>
//   );
// };








// import styles from "./Background.module.scss"

// export const Background = () =>{
//     return(
//         <>
//         <div className={styles.background}></div>
//         </>
//     )
// }