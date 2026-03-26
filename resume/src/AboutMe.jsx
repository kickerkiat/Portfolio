import styles from './AboutMe.module.css';
import { useEffect, useState } from 'react';

function Card({ id = 0, Title, content = [] }) {
    return (
        <div className={styles.card}  >
            <h4>{Title}</h4>
            <ul className = {styles.card_content}>
            { content.map((c) => (
                <li key={ '' + id + c.id }>
                    <h2>{c.subtitle}</h2>
                    <p className={styles.info}>{ c.p1 }</p>
                    <p className={styles.desc}>{ c.p2 }</p>
                </li>
            )) }
            </ul>
        </div>
    )
}

function AboutMe() {
    const [Data, setData] = useState([]);
    useEffect(() => {
        fetch('./src/AboutMe.json')
            .then(response => {
                if (!response.ok) { throw new Error('Network response was not ok'); }
                return response.json();
            }).then(d => {
                //console.log(JSON.stringify(d));
                setData(d);
            })
    }, [Data]);
    return (
        <div className={styles.AboutMe}>
            <div className={styles.aboutmeheader}>
                <h1 className={styles.title}> About Me </h1>
                <h2> An Aspiring Software Developer </h2>
            </div>
            <div className={styles.gridlayout}>
            { Data.map((d) => (
                <li key={ d.id }>
                    <Card key={ d.id } Title={d.title} content={ d.content }></Card>
                </li>
            )) }
            </div>
        </div>
    )
}

export default AboutMe;