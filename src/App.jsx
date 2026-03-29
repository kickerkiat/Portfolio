import { useRef, useState, useEffect } from 'react'
import './App.css' 
import Header from './Header'
import {Home} from './Home'
import Projects from './Projects'
import JobEx from './JobEx'
import Education from './Education'
import Achievements from './Achievements'
import initBackground from "./Graphics/Background01";

function ScrollIndicator() {
    return (
        <div className="indicator">
            <div className="mouse">
                <div className="wheel"></div>
            </div>
            <span>Scroll</span>
        </div>
    );
}

function App() {
    
    const sections = {
        home: useRef(null),
        education: useRef(null),
        project: useRef(null),
        experience: useRef(null),
        leadership: useRef(null)
    };
    const [active, setActive] = useState("home");
    const [visible, setVisible] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const cleanup = initBackground(canvasRef.current);
        return cleanup;
    }, []);

    // set active when scrolled
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const key = entry.target.dataset.section;
                        setActive(key);
                    }
                });
            },
            { threshold: 0.5 }
        );

        Object.entries(sections).forEach(([key, ref]) => {
            if (ref.current) {
                ref.current.dataset.section = key;
                observer.observe(ref.current);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <canvas id="bg" ref={canvasRef}></canvas>
            <Header
                HomeClick={() => sections.home.current.scrollIntoView({ behavior: "smooth" })}
                EducationClick={() => sections.education.current.scrollIntoView({ behavior: "smooth" })}
                ProjectClick={() => sections.project.current.scrollIntoView({ behavior: "smooth" })}
                ExperienceClick={() => sections.experience.current.scrollIntoView({ behavior: "smooth" })}
                LeadershipClick={() => sections.leadership.current.scrollIntoView({ behavior: "smooth" })}
                ContactMeClick={() => {
                    sections.home.current.scrollIntoView({ behavior: "smooth" });
                    setVisible(!visible);
                }}
                active={active}
                setActive={setActive}
            ></Header>
            
            <div className="Container">
                <div ref={sections.home}><Home Clicked={ visible }></Home></div>
                <div ref={sections.education}><Education></Education></div>
                <div ref={sections.project}><Projects></Projects></div>
                <div ref={sections.experience}><JobEx></JobEx></div>
                <div ref={sections.leadership}><Achievements></Achievements></div>
            </div>
            {active == "home" && <ScrollIndicator></ScrollIndicator>}
        </>
    )
}

export default App
