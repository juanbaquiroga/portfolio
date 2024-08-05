// components/SplitText.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from "./Split_text.module.scss"

interface SplitTextProps {
  text: string;
}

const SplitText: React.FC<SplitTextProps> = ({ text }) => {
  const letters = text.split('');

  return (
    <p>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          className={styles.text}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.005 }}
        >
          {letter}
        </motion.span>
      ))}
    </p>
  );
};


export default SplitText;
