import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface Particle {
  // Core 3D position & state
  x: number;
  y: number;
  z: number;
  state: 'forming' | 'sphere' | 'leaking';

  // Velocity (primarily for 'leaking' state)
  vx: number;
  vy: number;
  vz: number;

  // Visuals
  radius: number;
  initialRadius: number; // Store original size for growth calculation
  growthFactor: number;  // Random growth multiplier
  opacity: number;
  color: string;

  // Lifespan for 'leaking' particles
  lifespan: number;
  maxLifespan: number;
  
  // Sphere properties
  theta: number; // Y-axis rotation angle
  phi: number;   // Angle from the pole (for positioning on sphere)
  sphereRadius: number; // Distance from center
  targetSphereRadius: number; // The final radius it should have

  // For mouse interaction
  offsetX: number;
  offsetY: number;
  offsetZ: number;
}

interface ParticleSphereProps {
  mousePosition: { x: number; y: number } | null;
}

const ParticleSphere: React.FC<ParticleSphereProps> = ({ mousePosition }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationTimeRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef<{ x: number; y: number } | null>(null);
  const formationStartTimeRef = useRef<number | null>(null);

  // --- Measured & Tuned Parameters from GIF Analysis ---
  const PARTICLE_COUNT = 2400;
  const PARTICLE_COLOR = '#21dfE6'; // Cyan

  // Sphere Physics
  const ROTATION_SPEED = 0.05;
  const BROWNIAN_MOTION = 0.15; // "Boiling" effect on sphere surface
  const FORMATION_DURATION = 2500; // in milliseconds
  const FORMATION_DELAY = 3200; // Delay before the sphere starts forming (matches resume button)

  // Mouse Interaction
  const MOUSE_REPEL_RADIUS = 100;
  const MOUSE_REPEL_STRENGTH = 1.5;
  const OFFSET_DECAY = 0.95; // Damping factor for spring-back effect

  // Leaking Particle Physics
  const LEAK_PROBABILITY = 0.001;
  const LEAK_VELOCITY = 1.0;
  const DRAG_FORCE = 0.985;
  
  const NORMAL_LIFESPAN = 300;
  const LIFESPAN_VARIATION = 150;
  const SHORT_LIFESPAN_THRESHOLD = NORMAL_LIFESPAN + 50;

  // Super Traveler Layer
  const SUPER_TRAVELER_PROBABILITY = 0.20; // Represents 20% of leaks (19% Super + 0.7% Ultra + 0.3% Mega)
  const SUPER_TRAVELER_LIFESPAN = 600;

  // Ultra Traveler Layer (a subset of Super Travelers)
  const ULTRA_TRAVELER_PROBABILITY = 0.05; // 5% of the 20% are Ultra or greater (1% absolute)
  const ULTRA_LIFESPAN_MULTIPLIER_MIN = 5;   // New: 5x lifespan
  const ULTRA_LIFESPAN_MULTIPLIER_MAX = 15;  // New: 15x lifespan
  const ULTRA_GROWTH_FACTOR = 5.0;
  const ULTRA_SHRINK_FACTOR = -1.2;
  
  // Mega Traveler Layer (a subset of Ultra Travelers)
  const MEGA_TRAVELER_PROBABILITY = 0.30; // 30% of the 1% become Mega (0.3% absolute)
  const MEGA_DRIFT_MULTIPLIER = 1.0;      // Fixed 100% extra distance

  // Visuals
  const MIN_RADIUS = 0.5;
  const MAX_RADIUS = 2.0;
  // --- End of Parameters ---

  const createParticle = (index: number): Particle => {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const finalSphereRadius = (canvasRef.current?.width || 0) * 0.25 + (Math.random() - 0.5) * 30;
    const radius = MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);

    return {
      x: 0, y: 0, z: 0, // Initial position will be set by sphere logic
      vx: 0, vy: 0, vz: 0,
      radius: radius,
      initialRadius: radius, // Store initial radius
      growthFactor: 0, // Will be set when particle starts leaking
      opacity: 1,
      color: PARTICLE_COLOR,
      state: 'forming',
      lifespan: 0,
      maxLifespan: 0, // Will be set when particle starts leaking
      theta: theta,
      phi: phi,
      sphereRadius: 0, // Start at the center
      targetSphereRadius: finalSphereRadius, // Store the final destination
      offsetX: 0, // Initialize offsets
      offsetY: 0,
      offsetZ: 0,
    };
  };
  
  useEffect(() => {
    // Keep the ref updated with the latest mouse position prop
    mousePositionRef.current = mousePosition;
  }, [mousePosition]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 0;
      canvas.height = canvas.parentElement?.clientHeight || 0;
      // Re-initialize particles on resize to adjust sphere size
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => createParticle(i));
    };

    const animate = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const perspective = canvas.width * 0.8;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const now = performance.now();
      if (formationStartTimeRef.current === null) {
          formationStartTimeRef.current = now;
      }
      const elapsed = now - formationStartTimeRef.current - FORMATION_DELAY;
      if (elapsed < 0) { // If we are in the delay period, do nothing
          requestAnimationFrame(animate);
          return;
      }
      
      const formationProgress = Math.min(elapsed / FORMATION_DURATION, 1);
      const easedProgress = 1 - Math.pow(1 - formationProgress, 3); // easeOutCubic

      animationTimeRef.current += 0.016; // ~60fps
      const rotation = animationTimeRef.current * ROTATION_SPEED;
      
      particlesRef.current.forEach((p, index) => {
        if (p.state === 'forming') {
          p.sphereRadius = p.targetSphereRadius * easedProgress;
          if (formationProgress >= 1) {
              p.state = 'sphere';
              p.sphereRadius = p.targetSphereRadius; // Ensure it lands perfectly
          }
        }

        if (p.state === 'forming' || p.state === 'sphere') {
          // Add Brownian "boiling" motion
          p.phi += (Math.random() - 0.5) * BROWNIAN_MOTION * 0.01;
          p.theta += (Math.random() - 0.5) * BROWNIAN_MOTION * 0.01;
          
          // Apply main Y-axis rotation
          const rotatedTheta = p.theta + rotation;

          // Convert spherical to 3D cartesian coordinates (Y-up)
          p.x = p.sphereRadius * Math.sin(p.phi) * Math.cos(rotatedTheta);
          p.y = p.sphereRadius * Math.cos(p.phi);
          p.z = p.sphereRadius * Math.sin(p.phi) * Math.sin(rotatedTheta);
          p.opacity = 1.0;

          // Leaking only happens from a fully formed sphere
          if (p.state === 'sphere' && Math.random() < LEAK_PROBABILITY) {
            p.state = 'leaking';
            
            // Assign lifespan and growth factor based on new hierarchical logic
            const isSuperTraveler = Math.random() < SUPER_TRAVELER_PROBABILITY;

            if (isSuperTraveler) {
              const isUltraTraveler = Math.random() < ULTRA_TRAVELER_PROBABILITY;

              if (isUltraTraveler) {
                // Base lifespan for an ultra-traveler (5x to 15x a super traveler)
                const lifespanMultiplier = ULTRA_LIFESPAN_MULTIPLIER_MIN + Math.random() * (ULTRA_LIFESPAN_MULTIPLIER_MAX - ULTRA_LIFESPAN_MULTIPLIER_MIN);
                p.maxLifespan = SUPER_TRAVELER_LIFESPAN * lifespanMultiplier;

                // Check if this ultra-traveler is also a MEGA-traveler (100% farther distance)
                if (Math.random() < MEGA_TRAVELER_PROBABILITY) {
                  p.maxLifespan *= (1 + MEGA_DRIFT_MULTIPLIER); // Doubles the lifespan
                }

                const growthRand = Math.random();
                if (growthRand < 0.4) { // 2/5 of the 5% = 2%
                  p.growthFactor = ULTRA_GROWTH_FACTOR;
                } else if (growthRand < 0.8) { // 2/5 of the 5% = 2%
                  p.growthFactor = ULTRA_SHRINK_FACTOR;
                } else { // 1/5 of the 5% = 1%
                  p.growthFactor = 0;
                }
              } else {
                // Logic for REGULAR super travelers (the other 95% of the 20%)
                p.maxLifespan = SUPER_TRAVELER_LIFESPAN + Math.random() * LIFESPAN_VARIATION;
                p.growthFactor = 0.2 + Math.random() * 2.0;
              }
            } else {
              // Logic for NORMAL particles (the other 80%)
              p.maxLifespan = NORMAL_LIFESPAN + Math.random() * LIFESPAN_VARIATION;
              if (p.maxLifespan < SHORT_LIFESPAN_THRESHOLD) {
                p.growthFactor = 0.03 + Math.random() * 0.05;
              } else {
                p.growthFactor = 0.2 + Math.random() * 2.0;
              }
            }

            p.lifespan = p.maxLifespan;
            
            const norm = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
            p.vx = (p.x / norm) * LEAK_VELOCITY + (Math.random() - 0.5) * 0.2;
            p.vy = (p.y / norm) * LEAK_VELOCITY + (Math.random() - 0.5) * 0.2;
            p.vz = (p.z / norm) * LEAK_VELOCITY + (Math.random() - 0.5) * 0.2;
          }

        } else if (p.state === 'leaking') {
          // Update physics for leaking particles
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;

          p.vx *= DRAG_FORCE;
          p.vy *= DRAG_FORCE;
          p.vz *= DRAG_FORCE;

          p.lifespan--;
          p.opacity = Math.max(0, p.lifespan / p.maxLifespan);
          
          // Particle grows as it fades based on its unique growth factor
          const lifeProgress = 1 - (p.lifespan / p.maxLifespan);
          p.radius = p.initialRadius * (1 + lifeProgress * p.growthFactor);

          // When particle dies, replace it with a new one on the sphere
          if (p.lifespan <= 0) {
            particlesRef.current[index] = createParticle(index);
          }
        }

        // --- Universal Logic (applies to all particles) ---

        // Mouse interaction logic using the ref
        const currentMouse = mousePositionRef.current;
        if (currentMouse) {
          // Project the particle's core 3D position to 2D to calculate distance from mouse
          const scaleForInteraction = perspective / (perspective + p.z);
          const projectedX = centerX + p.x * scaleForInteraction;
          const projectedY = centerY + p.y * scaleForInteraction;
          const dx = projectedX - currentMouse.x;
          const dy = projectedY - currentMouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < MOUSE_REPEL_RADIUS) {
            const force = (1 - distance / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_STRENGTH;
            const angle = Math.atan2(dy, dx);
            p.offsetX += Math.cos(angle) * force;
            p.offsetY += Math.sin(angle) * force;
          }
        }
        
        // Apply spring-back decay to offsets
        p.offsetX *= OFFSET_DECAY;
        p.offsetY *= OFFSET_DECAY;
        p.offsetZ *= OFFSET_DECAY;

        // Project 3D particle to 2D screen, including offsets
        const finalX = p.x + p.offsetX;
        const finalY = p.y + p.offsetY;
        const finalZ = p.z + p.offsetZ;

        const scale = perspective / (perspective + finalZ);
        const screenX = centerX + finalX * scale;
        const screenY = centerY + finalY * scale;
        const radius = Math.max(0, p.radius * scale);

        // Draw particle
        if (p.opacity > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(screenX, screenY, radius, 0, 2 * Math.PI);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();
          ctx.restore();
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default ParticleSphere; 