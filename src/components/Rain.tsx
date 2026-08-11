"use client";

import { useEffect, useRef } from "react";

export default function Rain({ isRaining }: { isRaining: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; length: number; speed: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const numDrops = Math.floor(window.innerWidth * 0.15); // Adjust density
      for (let i = 0; i < numDrops; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 20 + 10, // Drop length
          speed: Math.random() * 15 + 10,  // Drop speed
          opacity: Math.random() * 0.3 + 0.1, // Slight variance
        });
      }
    };

    const draw = () => {
      if (!isRaining) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.length * 0.1, p.y + p.length); // Slight slant
        ctx.stroke();

        // Move particle
        p.y += p.speed;
        p.x += p.speed * 0.1; // Slant movement

        // Reset if off screen
        if (p.y > canvas.height) {
          p.y = -p.length;
          p.x = Math.random() * canvas.width;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    initParticles();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRaining]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${
        isRaining ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    />
  );
}
