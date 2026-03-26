import { useEffect, useState } from "react";
import styles from "./JobEx.module.css";

export default function ExperiencePage() {

    const [Data, setData] = useState([]);
    useEffect(() => {
        fetch('./src/JobEx.json')
            .then(response => {
                if (!response.ok) { throw new Error('Network response was not ok'); }
                return response.json();
            }).then(d => {
                setData(d);
            })
    }, []);

    return (
        <div className={styles.experiencepage}>

            <h1 className={ styles.title }>Experiences</h1>

            <div className={ styles.timeline }>
                {Data.map((exp, i) => (
                    <div className={ styles.timelineitem} key={i}>
                        <div className={ styles.timelinedot } />

                        <div className={ styles.card }>
                            <h2>{exp.role}</h2>
                            <h3>{exp.company}</h3>
                            <p className={ styles.period }>{exp.period}</p>
                            <p className={ styles.desc }>{exp.desc}</p>

                            <div className={ styles.tech }>
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