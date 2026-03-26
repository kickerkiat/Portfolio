import styles from './Contact.module.css'

export default function Contact({visibility, setVisibility}) {
    const handleClick = () => {
        setVisibility(false)
    };
    return (
        <section className={`${styles.wrapper} ${visibility ? styles.visible : styles.invisible}`} >
            <div className={`${styles.card}`}>
                <a className={styles.close} onClick={() => {handleClick()} }>X</a>
                <h2 className={styles.title}>Contact Me</h2>
                <p className={styles.subtitle}>
                    I'm open to software development, engine develpement, graphics programming or fullstack development.
                </p>
                <div className={styles.actions}>
                    <a href="mailto:jakeliankhaikiat@gmail.com" target="_blank" className={styles.primary}>
                        Email Me
                    </a>
                    <a href="https://linkedin.com/in/khaikiat" target="_blank" className={styles.secondary}>
                        LinkedIn
                    </a>
                    <a href="https://t.me/k_for_kiat" target="_blank" className={styles.secondary}>
                        Telegram
                    </a>
                </div>
            </div>
        </section>
    );
}
