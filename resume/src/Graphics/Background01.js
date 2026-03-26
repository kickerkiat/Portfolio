import * as THREE from "three";

const canvas = document.querySelector("#bg");

const scene = new THREE.Scene();

const camera = new THREE.Camera();
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer({ canvas });

// Fullscreen plane
const geometry = new THREE.PlaneGeometry(2, 2);

const mousep = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
    mousep.x = event.clientX / window.innerWidth;
    mousep.y = 1.0 - event.clientY / window.innerHeight;
});

const material = new THREE.ShaderMaterial({

    uniforms: {
        time: { value: 0 },
        mousepos: {
            value: mousep
        },
        resolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        }
    }, 

    vertexShader: `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `,

    fragmentShader: `
    uniform float time;
    uniform vec2 mousepos;
    uniform vec2 resolution;
    // Simple noise
    float hash(vec2 p){
      return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
    }

    float noise(vec2 p){
      vec2 i = floor(p);
      vec2 f = fract(p);

      float a = hash(i);
      float b = hash(i + vec2(1.0,0.0));
      float c = hash(i + vec2(0.0,1.0));
      float d = hash(i + vec2(1.0,1.0));

      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) +
             (c - a)*u.y*(1.0-u.x) +
             (d - b)*u.x*u.y;
    }

    void main(){
        vec2 uv = gl_FragCoord.xy / resolution.xy;

        float dist = distance(uv, mousepos);

        float n = noise(uv*3.0 + time*0.2);
        float n2 = noise(uv*6.0 - time*0.1);

        float smoke = smoothstep(1.0, 0.0, n + n2*0.5);
        vec3 col = mix(vec3(0.0), vec3(0.2,0.5,1.0), smoke);

        gl_FragColor = vec4(col, 1.0);
    }
  `
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Animation loop
function animate(t) {
    material.uniforms.time.value = t * 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    material.uniforms.resolution.value.set(width, height);
}
animate();
onResize();
window.addEventListener("resize", onResize);