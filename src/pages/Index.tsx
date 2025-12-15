import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChoose from "@/components/WhyChoose";
import TopHerbs from "@/components/TopHerbs";
import HowItWorks from "@/components/HowItWorks";
import Compliance from "@/components/Compliance";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (isLoading) return;

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Enhanced Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          entry.target.classList.remove("animate-out");
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
      ".scroll-reveal, .fade-in-up, .fade-in, .slide-in-left, .slide-in-right"
    );
    animatedElements.forEach((el) => observer.observe(el));

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${scrollY * 0.5}px`
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <WhyChoose />
        <TopHerbs />
        <HowItWorks />
        <Compliance />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
