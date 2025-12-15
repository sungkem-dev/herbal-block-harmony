import { useEffect, useRef, useState, ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  decorations?: "primary" | "secondary" | "mixed" | "none";
}

const ParallaxSection = ({
  children,
  className = "",
  speed = 0.3,
  decorations = "mixed",
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setOffset(scrollProgress * 100 * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  const renderDecorations = () => {
    if (decorations === "none") return null;

    const shapes = [];

    if (decorations === "primary" || decorations === "mixed") {
      shapes.push(
        <div
          key="circle-1"
          className="absolute -top-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"
          style={{ transform: `translateY(${offset * 0.5}px)` }}
        />,
        <div
          key="circle-2"
          className="absolute bottom-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none"
          style={{ transform: `translateY(${-offset * 0.3}px)` }}
        />
      );
    }

    if (decorations === "secondary" || decorations === "mixed") {
      shapes.push(
        <div
          key="circle-3"
          className="absolute top-1/3 -right-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none"
          style={{ transform: `translateY(${offset * 0.4}px)` }}
        />,
        <div
          key="circle-4"
          className="absolute -bottom-20 left-1/4 w-80 h-80 bg-secondary/3 rounded-full blur-3xl pointer-events-none"
          style={{ transform: `translateY(${-offset * 0.6}px)` }}
        />
      );
    }

    return shapes;
  };

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      {renderDecorations()}
      
      {/* Floating geometric shapes */}
      <div
        className="absolute top-20 left-[10%] w-4 h-4 border-2 border-primary/20 rotate-45 pointer-events-none"
        style={{ transform: `translateY(${offset * 0.8}px) rotate(${45 + offset}deg)` }}
      />
      <div
        className="absolute top-[40%] right-[15%] w-6 h-6 border-2 border-secondary/20 rounded-full pointer-events-none"
        style={{ transform: `translateY(${-offset * 0.5}px)` }}
      />
      <div
        className="absolute bottom-[30%] left-[5%] w-3 h-3 bg-primary/10 rounded-full pointer-events-none"
        style={{ transform: `translateY(${offset * 0.7}px)` }}
      />
      <div
        className="absolute top-[60%] right-[8%] w-5 h-5 border border-primary/15 pointer-events-none"
        style={{ transform: `translateY(${-offset * 0.4}px) rotate(${offset * 0.5}deg)` }}
      />
      
      {/* Content with subtle parallax */}
      <div
        className="relative z-10"
        style={{ transform: `translateY(${offset * 0.1}px)` }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
