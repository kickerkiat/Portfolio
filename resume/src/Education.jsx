import { useEffect, useState } from "react";
import styles from "./Education.module.css";

export default function Education() {

    const [Data, setData] = useState([]);
    useEffect(() => {
        fetch('./src/Education.json')
            .then(response => {
                if (!response.ok) { throw new Error('Network response was not ok'); }
                return response.json();
            }).then(d => {
                setData(d);
            })
    }, [])
    return (
        <div className={styles.experiencepage}>

            <h1 className={styles.title}>Education</h1>

            <div className={styles.timeline}>
                {Data.map((exp, i) => (
                    <div className={styles.timelineitem} key={i}>
                        <div className={styles.timelinedot} />

                        <div className={styles.card}>
                            <h2>{exp.certification}</h2>
                            <h3>{exp.Institution}</h3>
                            <p className={styles.period}>{exp.period}</p>
                            <p className={styles.desc}>{exp.desc}</p>

                            <div className={styles.tech}>
                                {exp.tech.map((t, idx) => (
                                    <span key={idx}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}