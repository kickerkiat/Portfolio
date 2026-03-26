import { useRef, useState } from 'react'
import './App.css' 
import Header from './Header'
import {Home} from './Home'
import Projects from './Projects'
import JobEx from './JobEx'
import Education from './Education'
import Achievements from './Achievements'

function App() {
    const homeRef = useRef(null);
    const educationRef = useRef(null);
    const projectRef = useRef(null);
    const experienceRef = useRef(null);
    const leadershipRef = useRef(null);
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Header
                HomeClick       ={() => homeRef.current.scrollIntoView({ behavior: "smooth" })}
                EducationClick  ={() => educationRef.current.scrollIntoView({ behavior: "smooth" })}
                ProjectClick    ={() => projectRef.current.scrollIntoView({ behavior: "smooth" })}
                ExperienceClick ={() => experienceRef.current.scrollIntoView({ behavior: "smooth" })}
                LeadershipClick ={() => leadershipRef.current.scrollIntoView({ behavior: "smooth" })}
                ContactMeClick  ={() => {
                    homeRef.current.scrollIntoView({ behavior: "smooth" });
                    setVisible(!visible);
                }}
            ></Header>
            <div className="Container">
                <div ref={homeRef}><Home Clicked={ visible }></Home></div>
                <div ref={educationRef}><Education></Education></div>
                <div ref={projectRef}><Projects></Projects></div>
                <div ref={experienceRef}><JobEx></JobEx></div>
                <div ref={leadershipRef}><Achievements></Achievements></div>
            </div>
        </>
    )
}

export default App
