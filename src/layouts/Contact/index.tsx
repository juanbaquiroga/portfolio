"use client"
import styles from './Contact.module.scss';
import {FormEvent, useRef, useState} from "react";
import {motion, useInView} from "framer-motion";
import { Ititle } from '@/interfaces/title.interface';
import { Title } from '@/components/Title';

const title:Ititle = {
    d: "M30.9999 9.99979C-16.5 -0.500007 3.99996 53.9999 80.9999 48.9998C97 47.9608 128.7 45.9 139.5 39.5C148 34.463 175.5 6.49985 118.5 6.49999C99.6667 5.83332 53.9004 15.8 21.5004 61C-18.9996 117.5 42.5 139 88 120C124.4 104.8 145.167 82 151 72.5C156.833 63 156.5 58 144.5 86C139.143 98.5 137.7 117.3 166.5 98.5C183 87.7292 198 39.5 161 56C148.5 61.5743 139.5 78.5 154 94C159.145 99.5 173.3 104.8 192.5 86C196.074 82.5 205 75 212.5 60C220 45 219.5 35 203 80C201.35 84.5 199.5 88 194 97C185.75 110.5 176 116 214 75.5C229 59.5132 259.5 39.5 234 76C221.5 93.8922 219 122 253.5 86C262.125 77 275 54 280 46C288.167 24 313 0 277 49.5C273.727 54 249 49.5 270.5 51.5C288.5 52.5 317 50 281 51.5C250.5 73 232 135 287 91C290.049 88.5605 329 27.8 341 53C343.083 57.3733 346 62.5 341.5 52C338.714 45.5 325.7 39.9 302.5 71.5C284.88 95.5 283 130 333 76C363.093 43.5 297 126 346 91C348.1 89.5 351.4 87.7 357 80.5C367.5 63.5 389.5 42 391.5 66.5C392.04 73.112 383 81 391.5 67C392.411 65.5 389 33.5 356 82.5C349.5 92.1515 353.5 130 403.5 82.5C409.5 73.8333 423.759 54.9117 427 46C433 29.5 464.5 -2 423.5 49.5C420.714 53 400 51.5 415.5 51.5C433 51.6667 461.9 51.9 437.5 51.5C406 48.5 370.5 148.5 440.5 83.5C440.833 83.1909 441.5 82 441.5 81.5",
    viewBox: "0 0 453 133",
    strokeDash: 3000,
    color:"accent",
    strokeWidth: 9
}


export const Contact = () =>{
    const subtitleRef = useRef(null)
    const subtitleInView = useInView(subtitleRef, { once: false , margin: "100000px 0px -100px 0px"})
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    

    
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const name = formData.get("name")?.toString();
        const email = formData.get("email")?.toString();
        const message = formData.get("message")?.toString();
        let formErrors: { name?: string; email?: string; message?: string } = {};

        if (!name || name.trim() === "") {
            formErrors.name = "Name is required";
          }
      
          if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            formErrors.email = "A valid email is required";
          }
      
          if (!message || message.trim() === "") {
            formErrors.message = "Message is required";
          }
      
          if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
          }
        
        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
        if(accessKey){
            formData.append("access_key", accessKey);
        }
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: json,
          });
    
          const result = await response.json();
          
          if (result.success) {
            console.log("Formulario enviado correctamente", result);
            setFormSubmitted(true);

            setTimeout(() => {
              setFormSubmitted(false);
            }, 3000);
          }
        } catch (error) {
          console.error("An error occurred during form submission");
        }
    }


    return(
      <>
        <section id="contact" className={styles.contact}>
          <motion.div className={styles.container}>
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
              >Get in touch with me for any inquiries or collaborations.
            </motion.h2>
            <motion.form className={styles.form} onSubmit={handleSubmit}>
            <motion.div className={styles.formGroup}>
              <motion.label htmlFor='name' className={styles.label}>Name</motion.label>
              <motion.input 
                className={styles.input} 
                type="text" 
                name='name'
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <motion.div className={styles.formGroup}>
              <motion.label htmlFor='email' className={styles.label}>Email</motion.label>
              <motion.input 
                className={styles.input} 
                type="email" 
                name='email'
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <motion.div className={styles.formGroup}>
              <motion.label htmlFor='message' className={styles.label}>Message</motion.label>
              <motion.textarea 
                className={styles.message} 
                name="message" 
                id="message"
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <motion.div  className={styles.errorContainer}>
              {errors.name && (
                <motion.p initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={styles.error}
                >* {errors.name}
                  </motion.p>
              )}
              {errors.email && (
                <motion.p initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={styles.error}
                >* {errors.email}
                  </motion.p>
              )}
              {errors.message && (
                <motion.p initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={styles.error}
                >* {errors.message}
                  </motion.p>
              )}
            </motion.div>
            <motion.button 
              type="submit"
              className={styles.button}
            >
              Submit
            </motion.button>
          </motion.form>
        </motion.div>
    </section>
    {formSubmitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.success}
        >
          <p>Formulario enviado correctamente!</p>
        </motion.div>
      )}
  </>
)
}
