"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const [isHovering, setIsHovering] = useState(false);

  const variants = {
    hidden: {
      x: -200,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <>
    < ></>
    <motion.div
        style={{ position: 'absolute', top: 50, left: 0, height: '50%', width: '200px', backgroundColor: '#fff' }}
        variants={variants}
        animate={isHovering ? 'visible' : 'hidden'}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
    >
      {/* Sidebar content */}
      <div>
        <img src="logo.png" alt="Logo" />
        <h2>Portfolio</h2>
        <h3>JUAN BAUTISTA QUIROGA</h3>
      </div>
      <nav>
        <ul>
          <li><a href="#">Portfolio</a></li>
          <li><a href="#">Section 2</a></li>
          <li><a href="#">Section 3</a></li>
        </ul>
      </nav>
    </motion.div>
  </>
  );
};

export default Sidebar;
