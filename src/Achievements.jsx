import React from "react";
import styles from "./Achievements.module.css";

const leadership = [
    
    {
        title: "Graphics Lead",
        period: "DigiPen Institute of Technology",
        desc: "Designed graphics pipeline for game engine. Implemented PBR shaders. Optimised graphics with instance rendering and batch rendering."
    },
    {
        title: "Audio Lead",
        period: "DigiPen Institute of Technology",
        desc: "Designed Audio pipeline for game engine. Arranged music and sfx for the project."
    },
    {
        title: "President, Just Singers",
        period: "Singapore Institute of Technology",
        desc: "Manage and lead a 30-member A cappella group including - training resources, planning club's direction, budgetting, collaboration with other clubs, schools, and other professional locations such as The Esplanade."
    },
    {
        title: "Head of Training, Just Singers",
        period: "Singapore Institute of Technology",
        desc: "Plan weekly training contents including - Arrangenment of songs, training plans, working with professional coach. Lead and participated in an A cappella competition."
    },
    {
        title: "Broadcast Director",
        period: "Victory Family Centre",
        desc: "Oversee live production for sunday church services and adhoc events to make sure the production runs smoothly and in sync. Production includes camera shots, sound engineering, and graphics projections."
    },
    {
        title: "Overseas Integrated Programme",
        period: "DigiPen Institute of Technology",
        desc: "Spent 3 Months in Redmond - Washington, USA, for overseas exchange programme. "
    }
];
export default function MiscPage() {
    return (
        <div className={styles.miscpage}>
            <Section title="Leadership and Achievments" items={leadership} />
        </div>
    );
}

function Section({ title, items }) {
    return (
        <div className={styles.section}>
            <h1 className={styles.sectiontitle}>{title}</h1>
            <div className={styles.cardgrid}>
                {items.map((item, index) => (
                    <div className={styles.misccard + " frosted"} key={index}>
                        <h2>{item.title}</h2>
                        {item.period && <h3 className={styles.meta}>{item.period}</h3>}
                        {item.desc && <p className={styles.desc}>{item.desc}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}