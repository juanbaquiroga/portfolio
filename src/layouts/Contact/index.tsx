"use client";
import styles from "./Contact.module.scss";
import { FormEvent, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Ititle } from "@/interfaces/title.interface";
import { Title } from "@/components/Title";

const title: Ititle = {
    d: "M30.9999 9.99979C-16.5 -0.500007 3.99996 53.9999 80.9999 48.9998C97 47.9608 128.7 45.9 139.5 39.5C148 34.463 175.5 6.49985 118.5 6.49999C99.6667 5.83332 53.9004 15.8 21.5004 61C-18.9996 117.5 42.5 139 88 120C124.4 104.8 145.167 82 151 72.5C156.833 63 156.5 58 144.5 86C139.143 98.5 137.7 117.3 166.5 98.5C183 87.7292 198 39.5 161 56C148.5 61.5743 139.5 78.5 154 94C159.145 99.5 173.3 104.8 192.5 86C196.074 82.5 205 75 212.5 60C220 45 219.5 35 203 80C201.35 84.5 199.5 88 194 97C185.75 110.5 176 116 214 75.5C229 59.5132 259.5 39.5 234 76C221.5 93.8922 219 122 253.5 86C262.125 77 275 54 280 46C288.167 24 313 0 277 49.5C273.727 54 249 49.5 270.5 51.5C288.5 52.5 317 50 281 51.5C250.5 73 232 135 287 91C290.049 88.5605 329 27.8 341 53C343.083 57.3733 346 62.5 341.5 52C338.714 45.5 325.7 39.9 302.5 71.5C284.88 95.5 283 130 333 76C363.093 43.5 297 126 346 91C348.1 89.5 351.4 87.7 357 80.5C367.5 63.5 389.5 42 391.5 66.5C392.04 73.112 383 81 391.5 67C392.411 65.5 389 33.5 356 82.5C349.5 92.1515 353.5 130 403.5 82.5C409.5 73.8333 423.759 54.9117 427 46C433 29.5 464.5 -2 423.5 49.5C420.714 53 400 51.5 415.5 51.5C433 51.6667 461.9 51.9 437.5 51.5C406 48.5 370.5 148.5 440.5 83.5C440.833 83.1909 441.5 82 441.5 81.5",
    viewBox: "0 0 453 133",
    strokeDash: 3000,
    color: "accent",
    strokeWidth: 9,
};

function useGsapInView(ref: React.RefObject<HTMLElement>, options: { margin?: string } = {}) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { root: null, rootMargin: options.margin || "0px", threshold: 0 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref, options.margin]);
    return inView;
}

export const Contact = () => {
    const subtitleRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);
    const buttonRef = useRef(null);
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Detectar si los elementos están en vista
    const subtitleInView = useGsapInView(subtitleRef, { margin: "100000px 0px -100px 0px" });
    const nameInView = useGsapInView(nameRef, { margin: "100000px 0px 0px 0px" });
    const emailInView = useGsapInView(emailRef, { margin: "100000px 0px 0px 0px" });
    const messageInView = useGsapInView(messageRef, { margin: "100000px 0px 0px 0px" });
    const buttonInView = useGsapInView(buttonRef, { margin: "100000px 0px 0px 0px" });

    // Animaciones GSAP
    useEffect(() => {
        if (subtitleRef.current && subtitleInView) {
            gsap.fromTo(subtitleRef.current, {scale: 0, opacity: 0}, { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1.1, 0.8)" });
        } else {
            gsap.set(subtitleRef.current, { scale: 0, opacity: 0 });
        }
    }, [subtitleInView]);
    useEffect(() => {
        if (nameRef.current && nameInView) {
            gsap.fromTo(nameRef.current, {scale: 0, opacity: 0}, { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1.1, 0.8)" });
        } else {
            gsap.set(nameRef.current, { scale: 0, opacity: 0 });
        }
    }, [nameInView]);
    useEffect(() => {
        if (emailRef.current && emailInView) {
            gsap.fromTo(emailRef.current,{scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1.1, 0.8)" });
        } else {
            gsap.set(emailRef.current, { scale: 0, opacity: 0 });
        }
    }, [emailInView]);
    useEffect(() => {
        if (messageRef.current && messageInView) {
            gsap.fromTo(messageRef.current, { scale: 0, opacity: 0}, {scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1.1, 0.8)"});
        }else {
            gsap.set(messageRef.current, { scale: 0, opacity: 0 });
        }
    }, [messageInView]);
    
    useEffect(() => {
        if (buttonRef.current && buttonInView) {
            gsap.fromTo(buttonRef.current, { scale: 0, opacity: 0}, {scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1.1, 0.8)"});
        }else {
            gsap.set(buttonRef.current, { scale: 0, opacity: 0 });
        }
    }, [buttonInView]);

    // Animación de focus en inputs y textarea
    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, { scale: 1.02, duration: 0.2, ease: "power2.out" });
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

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
        if (accessKey) {
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
                setFormSubmitted(true);
                setTimeout(() => {
                    setFormSubmitted(false);
                }, 3000);
            }
        } catch (error) {
            console.error("An error occurred during form submission");
        }
    }

    // Animación para mensajes de error
    useEffect(() => {
        const errorEls = document.querySelectorAll(`.${styles.error}`);
        errorEls.forEach((el) => {
            gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        });
    }, [errors]);

    // Animación para mensaje de éxito
    const successRef = useRef(null);
    useEffect(() => {
        if (formSubmitted && successRef.current) {
            gsap.fromTo(successRef.current, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5 });
        }
    }, [formSubmitted]);

    return (
        <>
            <section id="contact" className={styles.contact}>
                <div className={styles.container}>
                    <Title title={title} />
                    <h2
                        className={styles.subtitle}
                        ref={subtitleRef}
                    >
                        Get in touch with me for any inquiries or collaborations.
                    </h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div
                            ref={nameRef}
                            className={styles.formGroup}
                        >
                            <label htmlFor="name" className={styles.label}>
                                Name
                            </label>
                            <input
                                className={styles.input}
                                type="text"
                                name="name"
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div
                            className={styles.formGroup}
                            ref={emailRef}
                        >
                            <label htmlFor="email" className={styles.label}>
                                Email
                            </label>
                            <input
                                className={styles.input}
                                type="email"
                                name="email"
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div
                            className={styles.formGroup}
                            ref={messageRef}
                        >
                            <label htmlFor="message" className={styles.label}>
                                Message
                            </label>
                            <textarea
                                className={styles.message}
                                name="message"
                                id="message"
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className={styles.errorContainer}>
                            {errors.name && (
                                <p className={styles.error}>
                                    * {errors.name}
                                </p>
                            )}
                            {errors.email && (
                                <p className={styles.error}>
                                    * {errors.email}
                                </p>
                            )}
                            {errors.message && (
                                <p className={styles.error}>
                                    * {errors.message}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className={styles.button}
                            ref={buttonRef}
                        >
                            Submit
                        </button>
                    </form>
                </div>
                {formSubmitted && (
                    <div
                        ref={successRef}
                        className={styles.success}
                    >
                        <p>¡Formulario enviado correctamente!</p>
                    </div>
                )}
            </section>
        </>
    );
};
