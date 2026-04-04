import { useState } from 'react';
import styles from './Projects.module.css';
import TheGridThumbnail from './assets/GameIcon.png';
import ImmortalsThumbnail from './assets/Team_Logo_Orion_PNG.png';
import STeng from './assets/Singapore Tech Engineering Ltd.png';
import Zabbix from './assets/Zabbix.png';
import ThreeTier from './assets/threetier.jpg';
import gRPC from './assets/gRPC.jpg';
import login from './assets/login.gif';
import PDF from './assets/PDFgen.gif';
import Dashboard from './assets/Dashboard.gif';
import HomePage from './assets/HomePage.gif';
import PowerMgmt from './assets/Power.png';
function Card({ Project, setSelected }) {

    return (
        <div key={Project.id} className={styles.card + " frosted"}  >
            <img src={Project.Thumbnail} onClick={() => setSelected(Project)} alt="Project" />
            <h3>{Project.Title}</h3>
            <div className={styles.buttoncontainer}>
                <button onClick={() => setSelected(Project)} > Project Details </button>
                {Project.Download &&
                <a href={Project.Download} className={styles.downloadbtn} target="_blank" download>
                    <svg width="1.2rem" height="1.2rem" viewBox="0 0 48 48">
                        <path fill="#ffffff" d="M20 25.026L5.011 25 5.012 37.744 20 39.818zM22 25.03L22 40.095 42.995 43 43 25.066zM20 8.256L5 10.38 5.014 23 20 23zM22 7.973L22 23 42.995 23 42.995 5z"></path>
                    </svg>
                    <div> Download Windows Build </div>
                </a>
                }
            </div>
        </div>
    )
}

function ProjectDetails({ p, setSelected }) {
    return (
        <div className={styles.overlay} >
            <div className={styles.modal + " frosted"} onClick={(e) => e.stopPropagation()} >
                <div className={styles.sticky}>
                    <button
                        className={styles.close}
                        onClick={() => { setSelected(null) } }
                    >✕</button>
                </div>
                <h2 className={styles.title}>{p.Title}</h2>

                {/*{p.Source && <video src={p.Source} controls className={styles.video} />}*/}
                {p.Source && <iframe className={styles.video}
                    src={p.Source}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>}
                <div className={styles.paragraphs}>
                    {p.Description.map((d, idx) => {
                        if (d.type === "string") {
                            return <p key={idx}>{d.content}</p>;
                        }
                        if (d.type === "image") {
                            return (
                                <img
                                    key={idx}
                                    className={styles.cardImage}
                                    src={d.content}
                                    alt="project visual"
                                />
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    
    const projects = [
        {
            id: 1,
            Title: "The Grid",
            Source: "https://www.youtube.com/embed/C-CO4rUHSuw?si=fq7oPTdQMTvT0ENM",
            Thumbnail: TheGridThumbnail,
            Download: "https://drive.google.com/file/d/1Ef5AOqFu227tXrRlBFpgqt7g-sX1PYGY/view?usp=drive_link",
            Description: [
                { type: "string", content: "The Grid is a sci-fi 3D platformer in which players control a prototype character created by APEX, an entity responsible for maintaining societal progress. As the story unfolds, the protagonist uncovers the truth behind its creation, leading to a conflict between its intended purpose and newfound awareness. Along the journey, the player encounters an ally who aids in locating APEX and ultimately confronting it."},
                { type: "string", content: "This project was developed through interdisciplinary collaboration across multiple programs, including Real-Time Interactive Simulation (RTIS), Interactive Media and Game Design (IMGD), User Experience and Game Design (UXGD), and Fine Arts (BFA). The team worked from the ground up to build both the game engine and the game itself." },
                { type: "string", content: "In the first trimester, the programming team focused on developing the core game engine, while the design teams produced a playable prototype in Unity. In the subsequent phase, the Unity prototype was transitioned into the custom engine, evolving into a fully integrated final product." },
                { type: "string", content: "As Graphics Lead, I was responsible for designing and architecting the rendering pipeline with a strong emphasis on performance and scalability. This included implementing and optimizing techniques such as batch rendering, instanced rendering, frustum and occlusion culling, UUID-based systems, and GUI rendering. I also contributed to the implementation and optimization of physically based rendering (PBR), bloom effects, shadow mapping, and animation systems." },
                { type: "string", content: "In addition to graphics, I contributed to the development of the audio system and took ownership of the particle system, ensuring both systems were efficiently integrated into the engine and aligned with overall performance goals." }
            ]
        },
        {
            id: 2,
            Title:      "Immortals",
            Source:     "https://www.youtube.com/embed/SmJFPrJHTxM?si=vHzKM68FYRwwQXem",
            Thumbnail: ImmortalsThumbnail,
            Download: "https://drive.google.com/file/d/1AvquFEvesFl2GhGRNz2LFEuBBJqmsh1-/view?usp=drive_link",
            Description: [
                { type: "string", content: "Immortals is a 2D adventure game inspired by the Chinese mythology “Ba Xian Guo Hai” (八仙過海), or “The Eight Immortals Cross the Sea.” The game focuses on three of the Eight Immortals: Lü Dongbin, He Xiangu, and Lan Caihe." },
                { type: "string", content: "The story follows Lan Caihe, whose curiosity leads her deep into a forbidden forest. There, she discovers a mysterious tree adorned with beautiful flowers. Drawn in, she approaches and picks them—only to reveal the tree’s true nature as a malevolent entity that consumes her. Elsewhere, Lü Dongbin and He Xiangu hear her scream and rush to investigate, finding only her basket left behind. Driven by urgency and anger, they set out on a journey to rescue her." },
                { type: "string", content: "This project was developed through interdisciplinary collaboration across multiple programs, including Real-Time Interactive Simulation (RTIS), Interactive Media and Game Design (IMGD), User Experience and Game Design (UXGD), and Fine Arts (BFA). The team built both the game engine and the game itself from scratch." },
                { type: "string", content: "During the first trimester, the programming team focused on developing the core engine, while designers created a playable prototype in Unity. In the later phase, the prototype was ported into the custom engine and developed into the final product." },
                { type: "string", content: "As the Audio Lead, I was responsible for designing the architecture of the audio system. Despite the game being 2D, I implemented 3D spatial audio to enhance immersion and provide a more dynamic sound experience. I also composed and produced all music and sound effects using Ableton Live, ensuring cohesive audio direction throughout the game." },
                { type: "string", content: "Beyond audio, I contributed significantly to the graphics pipeline. As this was our first time building an engine, additional effort was required for research and rapid iteration. My contributions included implementing texture rendering, developing sprite animation systems, and fine-tuning shaders to achieve the desired visual quality." }
            ]
        },
        {
            id: 3,
            Title: "System Health Monitoring",
            Source: null,
            Thumbnail: STeng,
            Download: null,
            Description: [
                { type: "string", content: "Due to the company's regulation, I may not be able to show all the materials that I have worked on. However, I will explain the work I have done through diagrams and pictures and words." },
                { type: "string", content: "Overview" },
                { type: "string", content: "ST Engineering Training & Simulation Systems (T&S) utilizes diverse devices with different operating systems to support operations. Increasing reliance on interconnected systems makes system monitoring crucial. Managing these systems presents challenges, particularly in maintaining consistent visibility into their status and performance. Failure or delays in identifying system issues can lead to operational disruptions. Such disruptions can result in significant time and financial losses. So the company needed a centralized system for device health monitoring. Centralized system brings data consistency, device oversight, and user experience. Helps to Enhances operational efficiency, optimizes resource allocation, and reduces manual interventions." },
                { type: "string", content: "Strategy" },
                { type: "image", content: Zabbix },
                { type: "string", content: "The aim of the project is to Develop a System Health Monitoring Web-Application. Enable Threshold based Anomaly Detection and Alerts. Enhance Data Visualization and User Experience. Implement Scheduled Report Generation. Remotely turn on and off devices. I have considered existing solutions that I could use and decided the Zabbix is the most compatible option that could be implement in our project." },
                { type: "string", content: " " },
                { type: "string", content: "Proposed Design Architecture" },
                { type: "image", content: ThreeTier },
                { type: "string", content: "This diagram shows a 3-tier architecture with a React.js client in the Presentation Layer, backend services in the Application Layer, and a MySQL database in the Database Layer. The React client fetches monitoring data via HTTP from the React.js server, sends gRPC requests to the Power Management Backend for remote power actions, and accesses generated PDF reports through URLs. In the Application Layer, the React.js server forwards requests to the Zabbix server, which collects system metrics from Zabbix agents, processes them, and stores them in the database. The Power Management Backend handles power operations by sending UDP (Wake-on-LAN) or TCP/IP commands to a Power Management Agent on target machines. The Zabbix server interacts directly with the MySQL database to read and write monitoring data, ensuring a clear separation between frontend, backend logic, and data storage." },
                { type: "string", content: " " },
                { type: "string", content: "Problem with gRPC" },
                { type: "image", content: gRPC },
                { type: "string", content: "The power management is a different system in itself. React.js does not have local priviledge to sleep, shutdown or reboot a PC. Therefore, we needed another FE-BE system for this remote power management feature. This feature has been done before in the company using C# mono. My job was to create an interface to communicate with the system securely. After some meetings and discussions, gRPC was suggested as a solution to this problem. The power management solution that the company had previously done uses .NET framework. The framework does not support HTTP/2 which was required for gRPC. After some research, I came up with 2 approach. " },
                { type: "string", content: " " },
                { type: "string", content: "Solution #1: gRPC-Web with Envoy" },
                { type: "string", content: "This solution is a proxy-based approach where the gRPC service communicates over HTTP/1.1 using a browser-compatible intermediary. Envoy is needed in this approach because it translates gRPC-Web to gRPC – Browsers cannot make raw gRPC calls because they rely on HTTP/1.1+XHR or Fetch API, which do not fully support HTTP/2. Envoy translates HTTP/1.1 (gRPC-Web) requests to HTTP/2 gRPC for communication with the backend service. it can handles CORS for gRPC-Web – Browsers enforce CORS (Cross-Origin Resource Sharing) policies. Envoy can properly add the required CORS headers to allow browser-based clients to access gRPC services. Envoy also acts as a Load Balancer & Gateway – Envoy can also perform load balancing, authentication, logging, and security for gRPC services, making it more scalable and manageable." },
                { type: "string", content: "However, the limitation to this solution is that it requires to set up a container such as Docker to deploy Envoy. This creates a problem because future clients would need to install and set up a handful of things. Moreover, this solution would have extra latency due to proxy translation. " },
                { type: "string", content: " " },
                { type: "string", content: "Solution #2: Modify company's solution" },
                { type: "string", content: "As mentioned earlier, the solution that I recieved uses .NET framework. Starting from .NET 5 and later, ASP.NET Core includes built-in support for gRPC-Web as it yses Kestrel to handle HTTP requests efficiently. ASP.NET Core natively supports gRPC-Web without needing a proxy which simplifies deployment. The downside to this solution is that there will be a ton of legacy code to refactor. However, without needing to set up a proxy is a benefit to the company in the long run." },
                { type: "string", content: " " },
                { type: "string", content: " " },
                { type: "string", content: "The Frontend" },
                { type: "image", content: login },
                { type: "string", content: "Figure 4. Log in page with authentication, dynamic background and animations." },
                { type: "string", content: " " },
                { type: "image", content: HomePage },
                { type: "string", content: "Figure 5. Home page with animated buttons and side navigation bar." },
                { type: "string", content: " " },
                { type: "image", content: Dashboard },
                { type: "string", content: "Figure 6. Near real-time dashboard with data extracted from Zabbix API." },
                { type: "string", content: " " },
                { type: "image", content: PDF },
                { type: "string", content: "Figure 7. PDF file generated with data extracted from Zabbix API." },
                { type: "string", content: " " },
                { type: "image", content: PowerMgmt },
                { type: "string", content: "Figure 8. Power management frontend" },
                { type: "string", content: " " },
                { type: "string", content: " " },
                { type: "string", content: " " },
                { type: "string", content: " " },
            ]
        }
    ];

    return (
        <div className={styles.container}>
            <h1 className={ styles.title }>Projects</h1>
            <div className={styles.Projects}>
                {projects.map((p) => (
                    <Card
                        key={ p.id }
                        Project={p}
                        setSelected={setSelectedProject}></Card>
                ))}
            </div>
            {selectedProject && <ProjectDetails p={selectedProject} setSelected={setSelectedProject}></ProjectDetails> }
        </div>
    );
}

