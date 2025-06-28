
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LoadingScreen = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Loading animation
    tl.to(progressRef.current, {
      width: "100%",
      duration: 2,
      ease: "power2.inOut"
    })
    .to(textRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.5
    }, "-=0.5")
    .to(loaderRef.current, {
      y: "-100%",
      duration: 1,
      ease: "power3.inOut"
    });

  }, []);

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 flex items-center justify-center"
    >
      <div className="text-center">
        <div ref={textRef} className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">HIMATION</h1>
          <p className="text-xl text-purple-200">AR • VR • FUTURE</p>
        </div>
        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 w-0 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
