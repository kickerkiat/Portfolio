import styles from './Header.module.css'
import { createRef, useState, useEffect , useRef} from 'react'

function Header({ HomeClick, EducationClick, ProjectClick, ExperienceClick, LeadershipClick, ContactMeClick, active, setActive }) {

    const [hovered, setHovered] = useState(null);
    const [style, setStyle] = useState({});
    const [hstyle, sethStyle] = useState({});
    const [open, setOpen] = useState(false);

    const headerref = createRef();
    const refs = {
        home: useRef(null),
        education: useRef(null),
        project: useRef(null),
        experience: useRef(null),
        leadership: useRef(null),
        contact: useRef(null),
    };

    // glowing mouse in header
    useEffect(() => {
        const updateMousePos = (e) => {
            if (!headerref.current) return;
            const { clientX, clientY } = e;
            if (clientY > 400) return;
            headerref.current.style.setProperty('--x', `${clientX}px`);
            headerref.current.style.setProperty('--y', `${clientY}px`);
        };
        window.addEventListener('mousemove', updateMousePos);
        return () => {
            window.removeEventListener('mousemove', updateMousePos)
        };
    }, [headerref]);

    // set active when clicked.
    useEffect(() => {

        const el = refs[active]?.current;
        if (el) {
            setStyle({
                left: el.offsetLeft,
                width: el.offsetWidth,
                height: '70%',
            });
        }
    }, [active]);

    useEffect(() => {
        const el = refs[hovered]?.current;
        if (el) {
            sethStyle({
                width: el.offsetWidth,
                left: el.offsetLeft,
                height: '70%',
            });
        }
    }, [hovered]);

    return (
        <nav ref={headerref} className={styles.headerref}>
            <h2
                ref={refs.home}
                className={styles.topbartext, styles.jake}
                onClick={() => { HomeClick(); setActive("contact"); } }
                
            >Jake Lian</h2>

            <div className={styles.gap}></div>

            {/* Hamburger button (mobile only via CSS) */}
            <div className={styles.menuButton} onClick={() => setOpen(prev => !prev)} >
                ☰
            </div>
            
            <div className={styles.topbarbuttons}>
                <a ref={refs.education}
                    className={styles.topbartext}
                    onClick={() => { if (active != "education") { EducationClick(); setActive("education"); } }}
                    onMouseEnter={() => setHovered("education")}
                    onMouseLeave={() => setHovered(null)}
                > Education </a>
                <a ref={refs.project}
                    className={styles.topbartext}
                    onClick={() => { if (active != "project") { ProjectClick(); setActive("project"); } }}
                    onMouseEnter={() => setHovered("project")}
                    onMouseLeave={() => setHovered(null)}
                > Projects </a>
                <a ref={refs.experience}    
                    className={styles.topbartext} 
                    onClick={() => { if (active != "experience") { ExperienceClick(); setActive("experience"); } }}
                    onMouseEnter={() => setHovered("experience")}
                    onMouseLeave={() => setHovered(null)}
                > Experiences </a>
                <a ref={refs.leadership}    
                    className={styles.topbartext} 
                    onClick={() => {if (active != "leadership") {LeadershipClick();  setActive("leadership"); }}}
                    onMouseEnter={() => setHovered("leadership")}
                    onMouseLeave={() => setHovered(null)}
                > Leadership </a>
                <a ref={refs.contact}
                    className={styles.topbartext} 
                    onClick={() => {ContactMeClick(); setActive("contact")}}
                    onMouseEnter={() => setHovered("contact")}
                    onMouseLeave={() => setHovered(null)}
                > Contact Me </a>
            </div>

            <div className={styles.bubbles+' '+styles.active} style={style} ></div>
            <div className={styles.bubbles} style={hovered ? hstyle : { width: '99%', height: '80%', left: '10px' }} ></div>

            { open && <div className={styles.dropdown}>
                <a className={styles.topbartext} onClick={() => { EducationClick(); setOpen(false); } }
                > Education </a>
                <a className={styles.topbartext} onClick={() => { ProjectClick(); setOpen(false); } }
                > Projects </a>
                <a className={styles.topbartext} onClick={() => { ExperienceClick(); setOpen(false); } }
                > Experiences </a>
                <a className={styles.topbartext} onClick={() => { LeadershipClick(); setOpen(false); } }
                > Leadership </a>
                <a className={styles.topbartext} onClick={() => { ContactMeClick(); setOpen(false); } }
                > Contact Me </a>
                </div>
            }
        </nav>
    
    );
}

export default Header;