/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const AntigravityInner = ({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = "#FF9FFC",
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = "capsule",
  fieldStrength = 10,
}: any) => {
  const meshRef = useRef<any>(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const temp: any[] = [];
    const width = viewport.width || 100;
    const height = viewport.height || 100;

    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        factor: 20 + Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        mx: (Math.random() - 0.5) * width,
        my: (Math.random() - 0.5) * height,
        mz: (Math.random() - 0.5) * 20,
        cx: 0,
        cy: 0,
        cz: 0,
        randomRadiusOffset: (Math.random() - 0.5) * 2,
      });
    }
    return temp;
  }, [count, viewport.width, viewport.height]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { viewport: v, pointer: m } = state;

    let destX = (m.x * v.width) / 2;
    let destY = (m.y * v.height) / 2;

    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
      const t = state.clock.getElapsedTime();
      destX = Math.sin(t * 0.5) * (v.width / 4);
      destY = Math.cos(t) * (v.height / 4);
    }

    virtualMouse.current.x += (destX - virtualMouse.current.x) * 0.05;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * 0.05;

    particles.forEach((p, i) => {
      p.t += p.speed;

      const dx = p.mx - virtualMouse.current.x;
      const dy = p.my - virtualMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let tx = p.mx;
      let ty = p.my;
      let tz = p.mz * depthFactor;

      if (dist < magnetRadius) {
        const angle = Math.atan2(dy, dx);
        const wave = Math.sin(p.t * waveSpeed) * waveAmplitude;
        const r = ringRadius + wave + p.randomRadiusOffset;

        tx = virtualMouse.current.x + r * Math.cos(angle);
        ty = virtualMouse.current.y + r * Math.sin(angle);
        tz += Math.sin(p.t) * waveAmplitude;
      }

      p.cx += (tx - p.cx) * lerpSpeed;
      p.cy += (ty - p.cy) * lerpSpeed;
      p.cz += (tz - p.cz) * lerpSpeed;

      dummy.position.set(p.cx, p.cy, p.cz);
      dummy.scale.setScalar(particleSize);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
};

const Antigravity = (props: any) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 35 }}
      dpr={[1, 1.5]}
    >
      <AntigravityInner {...props} />
    </Canvas>
  );
};

export default Antigravity;
