import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Blob configuration
    const blobs = [
      { x: 0.2, y: 0.3, radius: 300, color: "rgba(47, 133, 90, 0.15)", speed: 0.0003 },
      { x: 0.8, y: 0.6, radius: 350, color: "rgba(64, 127, 190, 0.12)", speed: 0.0004 },
      { x: 0.5, y: 0.8, radius: 280, color: "rgba(47, 133, 90, 0.1)", speed: 0.0005 },
      { x: 0.3, y: 0.7, radius: 200, color: "rgba(64, 127, 190, 0.08)", speed: 0.0006 },
    ];

    const drawBlob = (
      x: number,
      y: number,
      radius: number,
      color: string,
      offset: number
    ) => {
      ctx.beginPath();
      const points = 6;
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const r =
          radius +
          Math.sin(angle * 3 + offset) * 50 +
          Math.cos(angle * 2 + offset * 1.5) * 30;
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.5);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.filter = "blur(60px)";
      ctx.fill();
      ctx.filter = "none";
    };

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob, index) => {
        const offsetX = Math.sin(time * blob.speed + index) * 100;
        const offsetY = Math.cos(time * blob.speed * 0.8 + index) * 80;
        drawBlob(
          blob.x * canvas.width + offsetX,
          blob.y * canvas.height + offsetY,
          blob.radius,
          blob.color,
          time * blob.speed
        );
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};

export default AnimatedBackground;
