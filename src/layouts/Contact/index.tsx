import styles from "./Contact.module.scss";
import { FormEvent, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGsapInView } from "@/hooks/useGsapInView";

export const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const emailRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const headingInView = useGsapInView(headingRef as any, { margin: "100000px 0px -60px 0px" });
    const nameInView = useGsapInView(nameRef as any, { margin: "100000px 0px 0px 0px" });
    const emailInView = useGsapInView(emailRef as any, { margin: "100000px 0px 0px 0px" });
    const messageInView = useGsapInView(messageRef as any, { margin: "100000px 0px 0px 0px" });
    const buttonInView = useGsapInView(buttonRef as any, { margin: "100000px 0px 0px 0px" });

    useEffect(() => {
        if (!headingRef.current) return;
        if (headingInView) {
            gsap.fromTo(headingRef.current, {opacity: 0, y: 20}, { opacity: 1, y: 0, duration: 0.35, delay: 0.15, ease: "power2.out" });
        } else {
            gsap.to(headingRef.current, { opacity: 0, y: 20, duration: 0.22, ease: "power2.in" });
        }
    }, [headingInView]);

    useEffect(() => {
        if (!subtitleRef.current) return;
        if (headingInView) {
            gsap.fromTo(subtitleRef.current, {opacity: 0, y: 15}, { opacity: 1, y: 0, duration: 0.35, delay: 0.2, ease: "power2.out" });
        } else {
            gsap.to(subtitleRef.current, { opacity: 0, y: 15, duration: 0.22, ease: "power2.in" });
        }
    }, [headingInView]);

    useEffect(() => {
        if (!nameRef.current) return;
        if (nameInView) {
            gsap.fromTo(nameRef.current, {scale: 0.98, opacity: 0}, { scale: 1, opacity: 1, duration: 0.25, delay: 0.18, ease: "power2.out" });
        } else {
            gsap.to(nameRef.current, { scale: 0.98, opacity: 0, duration: 0.2, ease: "power2.in" });
        }
    }, [nameInView]);

    useEffect(() => {
        if (!emailRef.current) return;
        if (emailInView) {
            gsap.fromTo(emailRef.current, {scale: 0.98, opacity: 0}, { scale: 1, opacity: 1, duration: 0.25, delay: 0.22, ease: "power2.out" });
        } else {
            gsap.to(emailRef.current, { scale: 0.98, opacity: 0, duration: 0.2, ease: "power2.in" });
        }
    }, [emailInView]);

    useEffect(() => {
        if (!messageRef.current) return;
        if (messageInView) {
            gsap.fromTo(messageRef.current, {scale: 0.98, opacity: 0}, { scale: 1, opacity: 1, duration: 0.25, delay: 0.26, ease: "power2.out" });
        } else {
            gsap.to(messageRef.current, { scale: 0.98, opacity: 0, duration: 0.2, ease: "power2.in" });
        }
    }, [messageInView]);

    useEffect(() => {
        if (!buttonRef.current) return;
        if (buttonInView) {
            gsap.fromTo(buttonRef.current, {scale: 0.95, opacity: 0}, { scale: 1, opacity: 1, duration: 0.3, delay: 0.3, ease: "power2.out" });
        } else {
            gsap.to(buttonRef.current, { scale: 0.95, opacity: 0, duration: 0.2, ease: "power2.in" });
        }
    }, [buttonInView]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, { scale: 1.01, duration: 0.15, ease: "power2.out" });
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, { scale: 1, duration: 0.15, ease: "power2.out" });
    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const name = formData.get("name")?.toString();
        const email = formData.get("email")?.toString();
        const message = formData.get("message")?.toString();
        let formErrors: { name?: string; email?: string; message?: string } = {};

        if (!name || name.trim() === "") formErrors.name = "Name is required";
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) formErrors.email = "A valid email is required";
        if (!message || message.trim() === "") formErrors.message = "Message is required";

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
        if (accessKey) formData.append("access_key", accessKey);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: json,
            });
            const result = await response.json();
            if (result.success) {
                setFormSubmitted(true);
                setTimeout(() => setFormSubmitted(false), 3000);
            }
        } catch (error) {
            console.error("An error occurred during form submission");
        }
    }

    useEffect(() => {
        const errorEls = document.querySelectorAll(`.${styles.error}`);
        errorEls.forEach((el) => {
            gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2 });
        });
    }, [errors]);

    const successRef = useRef(null);
    useEffect(() => {
        if (formSubmitted && successRef.current) {
            gsap.fromTo(successRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
        }
    }, [formSubmitted]);

    return (
        <section id="contact" ref={sectionRef} className={styles.contact}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>CONTACT</span>
                    <h2
                        ref={headingRef}
                        className={styles.heading}
                        style={{ opacity: 0 }}
                    >
                        Got a project in mind?{' '}
                        <span className={styles.accentText}>Let&apos;s build it.</span>
                    </h2>
                    <p
                        ref={subtitleRef}
                        className={styles.subtitle}
                        style={{ opacity: 0 }}
                    >
                        Drop me a message and let&apos;s discuss how we can work together.
                    </p>
                </div>

                <div className={styles.formCard}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        {/* Web3Forms Honeypot Spam Protection */}
                        <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                        <div ref={nameRef} className={styles.formGroup}>
                            <label htmlFor="contact-name" className={styles.formLabel}>Name</label>
                            <input
                                className={styles.input}
                                type="text"
                                name="name"
                                id="contact-name"
                                placeholder="Your name"
                                maxLength={100}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div ref={emailRef} className={styles.formGroup}>
                            <label htmlFor="contact-email" className={styles.formLabel}>Email</label>
                            <input
                                className={styles.input}
                                type="email"
                                name="email"
                                id="contact-email"
                                placeholder="your@email.com"
                                maxLength={150}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div ref={messageRef} className={styles.formGroup}>
                            <label htmlFor="contact-message" className={styles.formLabel}>Message</label>
                            <textarea
                                className={styles.textarea}
                                name="message"
                                id="contact-message"
                                placeholder="Tell me about your project..."
                                maxLength={3000}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>
                        {(errors.name || errors.email || errors.message) && (
                            <div className={styles.errorContainer}>
                                {errors.name && <p className={styles.error}>* {errors.name}</p>}
                                {errors.email && <p className={styles.error}>* {errors.email}</p>}
                                {errors.message && <p className={styles.error}>* {errors.message}</p>}
                            </div>
                        )}
                        <button
                            type="submit"
                            className={styles.submitButton}
                            ref={buttonRef}
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                <p className={styles.directContact}>
                    Or reach out directly at{' '}
                    <a href="mailto:juanbaquiroga@gmail.com" className={styles.emailLink}>
                        juanbaquiroga@gmail.com
                    </a>
                </p>

                {formSubmitted && (
                    <div ref={successRef} className={styles.success}>
                        <p>✓ Message sent successfully!</p>
                    </div>
                )}
            </div>
        </section>
    );
};
