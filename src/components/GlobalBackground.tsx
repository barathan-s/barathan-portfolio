"use client";

import { useEffect, useRef } from "react";

export function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setSize();
    window.addEventListener("resize", setSize);

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse = { x: -1000, y: -1000 };
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const bacteria = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 15 + 10,
      isRod: Math.random() > 0.5,
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.2 + 0.15
    }));

    const particles = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      baseOpacity: Math.random() * 0.5 + 0.1,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: Math.random() * 0.05 + 0.02
    }));

    const dnas = Array.from({ length: 4 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      scale: Math.random() * 0.5 + 0.5,
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.005,
      opacity: Math.random() * 0.1 + 0.05
    }));

    const drawDNA = (x: number, y: number, scale: number, angle: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);
      ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = -100; i < 100; i += 20) {
        ctx.moveTo(i, Math.sin(i * 0.05) * 30);
        ctx.lineTo(i + 20, Math.sin((i + 20) * 0.05) * 30);
        ctx.moveTo(i, Math.cos(i * 0.05) * 30);
        ctx.lineTo(i + 20, Math.cos((i + 20) * 0.05) * 30);
        if (i % 40 === 0) {
          ctx.moveTo(i, Math.sin(i * 0.05) * 30);
          ctx.lineTo(i, Math.cos(i * 0.05) * 30);
        }
      }
      ctx.stroke();
      ctx.shadowColor = "rgba(56, 189, 248, 0.5)";
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      dnas.forEach(dna => {
        dna.angle += dna.vAngle;
        drawDNA(dna.x, dna.y, dna.scale, dna.angle, dna.opacity);
      });

      ctx.fillStyle = "rgba(56, 189, 248, 1)";
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.phaseSpeed;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        const currentOpacity = p.baseOpacity + Math.sin(p.phase) * 0.3;
        ctx.globalAlpha = Math.max(0.05, currentOpacity);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = "rgba(56, 189, 248, 0.8)";
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      bacteria.forEach(b => {
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          b.vx += (dx / dist) * force * 0.5;
          b.vy += (dy / dist) * force * 0.5;
        }

        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.98; 
        b.vy *= 0.98;
        
        if (Math.abs(b.vx) < 0.1) b.vx += (Math.random() - 0.5) * 0.05;
        if (Math.abs(b.vy) < 0.1) b.vy += (Math.random() - 0.5) * 0.05;
        
        b.angle += b.vAngle;

        if (b.x < -50) b.x = width + 50;
        if (b.x > width + 50) b.x = -50;
        if (b.y < -50) b.y = height + 50;
        if (b.y > height + 50) b.y = -50;

        ctx.globalAlpha = b.opacity;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle);

        ctx.fillStyle = "#38bdf8"; 
        ctx.shadowColor = "rgba(56, 189, 248, 0.8)";
        ctx.shadowBlur = 20;

        ctx.beginPath();
        if (b.isRod) {
          if (ctx.roundRect) {
            ctx.roundRect(-b.size, -b.size / 2, b.size * 2, b.size, b.size / 2);
          } else {
            ctx.rect(-b.size, -b.size / 2, b.size * 2, b.size);
          }
        } else {
          ctx.arc(0, 0, b.size, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] bg-[#050B1A]">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40 dark:opacity-60" />
    </div>
  );
}
