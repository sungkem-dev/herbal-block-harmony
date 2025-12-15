import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsExiting(true), 300);
          setTimeout(() => onLoadingComplete(), 800);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-all duration-500 ${
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo animation */}
        <div className="relative mb-8">
          {/* Rotating ring */}
          <div
            className={`absolute inset-0 w-32 h-32 border-4 border-transparent border-t-primary border-r-secondary rounded-full transition-all duration-1000 ${
              progress < 100 ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "1.5s" }}
          />
          
          {/* Inner glow circle */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center backdrop-blur-sm border border-border/30">
            {/* Logo text */}
            <div className="text-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                HB
              </span>
            </div>
          </div>

          {/* Pulsing outer ring */}
          <div
            className="absolute inset-0 w-32 h-32 rounded-full border border-primary/30 animate-ping"
            style={{ animationDuration: "2s" }}
          />
        </div>

        {/* Brand name with letter animation */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 overflow-hidden">
          {"HerBlocX".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block animate-slide-up bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "both",
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p
          className="text-muted-foreground text-sm mb-8 animate-blur-in"
          style={{ animationDelay: "0.8s", animationFillMode: "both" }}
        >
          Herbal Supply Chain, Secured by Blockchain
        </p>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <span className="text-xs text-muted-foreground mt-3 font-mono">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-secondary/20 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-secondary/20 rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-lg" />
    </div>
  );
};

export default LoadingScreen;
