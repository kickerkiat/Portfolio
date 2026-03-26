/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
import { useState, useEffect, useRef } from "react";
import Contact from "./Contact"
import styles from "./Home.module.css";

const BubbleField = () => {

    const bubblesRef = useRef([]);

    const [bubbles, setBubbles] = useState(() => 
        Array.from({ length: 12 }, createBubble)
    );
    useEffect(() => {
        bubblesRef.current = bubbles
    }, [bubbles]);

    useEffect(() => {
        let frame;
        function animate(time) {

            updatePhysics(time);

            frame = requestAnimationFrame(animate);
        }

        frame = animate();
        return () => cancelAnimationFrame(frame);
    }, []);

    const updatePhysics = (now) => {
        const list = bubblesRef.current;
        //const now = performance.now();
        // movement
        for (let b of list) {

            if (b.popping) {

                if (now - b.popTime > 300) {

                    Object.assign(b, createBubble());

                }

                continue;
            }

            b.x += b.vx;
            b.y += b.vy;

            // respawn if off top
            if (b.y < -250) {
                b.y = window.innerHeight + 500;
            }
            // random pop chance
            if (now > b.nextPop) {

                b.popping = true;
                b.popTime = now;
                continue;
            }
            if (b.x > ((window.innerWidth / 2) - (2 * b.radius))) {
                b.x = (window.innerWidth / 2) - (2 * b.radius);
                b.vx = - b.vx;
                continue;
            }
            if (b.x < 0) {
                b.x = 0;
                b.vx = - b.vx;
            }
            
        }

        // collision detection
        for (let i = 0; i < list.length; i++) {
            for (let j = i + 1; j < list.length; j++) {

                const a = list[i];
                const b = list[j]; 

                const dx = b.x - a.x;
                const dy = b.y - a.y;

                const dist2 = (dx * dx) + (dy * dy);
                const minDist = (a.radius + b.radius);

                if (dist2 < minDist * minDist) {
                    // normal vector
                    const dist = Math.sqrt(dist2);
                    if (dist === 0) continue;

                    const nx = dx / dist;
                    const ny = dy / dist;

                    // push apart
                    const overlap = minDist - dist;

                    a.x -= nx * overlap * 0.5;
                    a.y -= ny * overlap * 0.5;

                    b.x += nx * overlap * 0.5;
                    b.y += ny * overlap * 0.5;

                    // bounce velocities
                    const kx = a.vx - b.vx;
                    const ky = a.vy - b.vy;

                    const p = (nx * kx + ny * ky);

                    a.vx -= p * nx;
                    a.vy -= p * ny;

                    b.vx += p * nx;
                    b.vy += p * ny;
                }
            }
        }
        setBubbles([...list]); // trigger React render

    }

    return (
        <div className={styles.bubbleLayer}>
            {bubbles.map((b, i) => (
                <div
                    key={i}
                    className={styles.bubble}
                    style={{
                        transform: `translate(${b.x}px, ${b.y}px)`,
                        width: b.radius * 2,
                        height: b.radius * 2
                    }}
                >
                    <div className={`${styles.bubbleInner} ${b.popping ? styles.pop : ""}`}>
                        {!b.popping && b.label}
                    </div>
                </div>
            ))}
        </div>
    );
}

const createBubble = () => {
    const now = performance.now();
    return {
        x: (Math.random() * (window.innerWidth / 2)) ,
        y: window.innerHeight + 200 + Math.random() * 500,
        vx: (Math.random() - 0.5),
        vy: -(0.3 + Math.random() * 0.5),
        radius: (100.0 + Math.random() * 25.0),
        label: ["C++", "C++", "C# Mono", "OpenGL", "React.js", "Vulkan", "CSS", "HTML", "GRPC", "JavaScript"][Math.floor(Math.random() * 10)],
        alive: true,
        popping: false,
        popTime: 0,
        nextPop: now + 5000 + Math.random() * 10000,
    };
}

export const Home = ({Clicked}) => {
    const [visible, setVisible] = useState(false);
    const [change, setChange] = useState(Clicked);
    const viewContact = () => { setVisible(!visible); }
    useEffect(() => {
        if (change != Clicked) {
            setVisible(true);
            setChange(Clicked);
        }
    }, [Clicked, change]);
    return (
        <div className={styles.home}>

            <div className={styles.hero}>
                <h1>Hi, I'm Jake! 👋</h1>
                <p>Computer Science Fresh Graduate</p>
                <div className="buttons">
                    <button > View My Projects </button>
                    <button className="outline" onClick={viewContact}> { visible ? "Hide":"Get In Touch"} </button>
                </div>
            </div>
            <BubbleField></BubbleField>

            {<Contact visibility={visible} setVisibility={ setVisible }></Contact>}
        </div>
    );
}