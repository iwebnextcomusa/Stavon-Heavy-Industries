import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeCanvasProps {
  speedMultiplier?: number;
  colorScheme?: "gold-blue" | "gold-green" | "emerald";
  particleDensity?: number;
}

export default function ThreeCanvas({
  speedMultiplier = 1.0,
  colorScheme = "gold-blue",
  particleDensity = 1200
}: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create Scene
    const scene = new THREE.Scene();

    // Create Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 12;

    // Create Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all objects for rotation
    const group = new THREE.Group();
    scene.add(group);

    // 1. Globe Core (abstract particle system)
    const particleCount = particleDensity;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Standard spherical coordinates
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3.0 + (Math.random() - 0.5) * 0.1; // radius 3 with slight noise

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color nodes based on colorScheme
      if (colorScheme === "emerald") {
        colors[i * 3] = 0.05;     // R
        colors[i * 3 + 1] = 0.65; // G
        colors[i * 3 + 2] = 0.4;  // B (Emerald)
      } else if (colorScheme === "gold-green") {
        const isGold = Math.random() > 0.4;
        if (isGold) {
          colors[i * 3] = 0.83;     // R
          colors[i * 3 + 1] = 0.68; // G
          colors[i * 3 + 2] = 0.21; // B (Gold)
        } else {
          colors[i * 3] = 0.05;     // R
          colors[i * 3 + 1] = 0.45; // G
          colors[i * 3 + 2] = 0.3;  // B (Forest Green)
        }
      } else {
        // gold-blue (default)
        const isGold = Math.random() > 0.4;
        if (isGold) {
          colors[i * 3] = 0.83;     // R
          colors[i * 3 + 1] = 0.68; // G
          colors[i * 3 + 2] = 0.21; // B (Gold: #d4af37)
        } else {
          colors[i * 3] = 0.04;     // R
          colors[i * 3 + 1] = 0.4;  // G
          colors[i * 3 + 2] = 0.55; // B (Industrial Blue: #0b3837)
        }
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom glowing particle material
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    group.add(particles);

    // 2. Wireframe Lattice Sphere
    const sphereGeo = new THREE.SphereGeometry(2.98, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: colorScheme === "emerald" ? 0x10b981 : 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wireframeSphere = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(wireframeSphere);

    // 3. Dual Golden Outer Logistics Rings (representing supply chain orbits)
    const ringGeo1 = new THREE.RingGeometry(3.8, 3.82, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: colorScheme === "emerald" ? 0x059669 : 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.5;
    group.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(4.2, 4.22, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: colorScheme === "emerald" ? 0x10b981 : 0xf7941d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    group.add(ring2);

    // 4. Connective Golden Satellite nodes
    const satelliteCount = 5;
    const satelliteGroup = new THREE.Group();
    const satMeshGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const satMeshMat = new THREE.MeshBasicMaterial({ 
      color: colorScheme === "emerald" ? 0x10b981 : 0xd4af37 
    });

    const satPositions: THREE.Vector3[] = [];

    for (let i = 0; i < satelliteCount; i++) {
      const sat = new THREE.Mesh(satMeshGeo, satMeshMat);
      const angle = (i / satelliteCount) * Math.PI * 2;
      const x = Math.cos(angle) * 3.8;
      const y = Math.sin(angle) * 3.8;
      sat.position.set(x, y, 0);
      satelliteGroup.add(sat);
      satPositions.push(sat.position);
    }
    satelliteGroup.rotation.x = Math.PI / 2.5;
    group.add(satelliteGroup);

    // 5. Connective neon lines
    const lineMat = new THREE.LineBasicMaterial({
      color: colorScheme === "emerald" ? 0x10b981 : 0xd4af37,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    
    // Draw connecting lines between opposite nodes
    for (let i = 0; i < satelliteCount; i++) {
      const p1 = satPositions[i];
      const p2 = satPositions[(i + 2) % satelliteCount];
      const points = [p1, p2];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMat);
      satelliteGroup.add(line);
    }

    // Add Ambient and Point Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(colorScheme === "emerald" ? 0x10b981 : 0xd4af37, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Handle Resize using ResizeObserver as instructed
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        renderer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(container);

    // Track Mouse Move
    const onMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Track Scroll
    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Continuous rotation taking speedMultiplier into account
      particles.rotation.y = elapsedTime * 0.08 * speedMultiplier;
      particles.rotation.x = elapsedTime * 0.02 * speedMultiplier;
      wireframeSphere.rotation.y = -elapsedTime * 0.05 * speedMultiplier;
      satelliteGroup.rotation.z = elapsedTime * 0.06 * speedMultiplier;
      ring1.rotation.z = -elapsedTime * 0.04 * speedMultiplier;
      ring2.rotation.z = elapsedTime * 0.03 * speedMultiplier;

      // Mouse interactive tilt
      const targetRX = mouseRef.current.y * 0.4;
      const targetRY = mouseRef.current.x * 0.4;
      group.rotation.x += (targetRX - group.rotation.x) * 0.05;
      group.rotation.y += (targetRY - group.rotation.y) * 0.05;

      // Scroll reactive translation/zoom
      const scrollRatio = Math.min(scrollYRef.current / 1200, 1.0);
      
      // Rotate group more as user scrolls down
      group.rotation.z = scrollRatio * Math.PI;

      // Adjust camera distance based on scroll
      camera.position.z = 12 - scrollRatio * 3.5;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      particleMaterial.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      satMeshGeo.dispose();
      satMeshMat.dispose();
    };
  }, [speedMultiplier, colorScheme, particleDensity]);

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      {/* Visual background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-gold/10 rounded-full filter blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-accent/5 rounded-full filter blur-[100px] pointer-events-none" />
      
      {/* Actual 3D container */}
      <div ref={containerRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />
    </div>
  );
}
