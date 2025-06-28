
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Portfolio from "../components/sections/Portfolio";
import About from "../components/sections/About";
import Contact from "../components/sections/Contact";
import Navigation from "../components/Navigation";
import CustomCursor from "../components/CustomCursor";
import LoadingScreen from "../components/LoadingScreen";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scrolling setup
    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { autoAlpha: 1 });
      
      // Page transition animation
      gsap.from(".page-section", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navigation />
      <div ref={containerRef} className="overflow-hidden">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </div>
    </>
  );
};

export default Index;
