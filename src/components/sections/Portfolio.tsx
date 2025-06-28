
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Virtual Showroom",
    category: "VR Experience",
    description: "Immersive product showcase for luxury brands with photorealistic environments",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&h=400&fit=crop",
    gradient: "from-purple-600 to-blue-600",
    accent: "purple",
  },
  {
    title: "AR Navigation",
    category: "AR Application", 
    description: "Real-time augmented reality wayfinding system with AI-powered directions",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
    gradient: "from-emerald-600 to-teal-600",
    accent: "emerald",
  },
  {
    title: "VR Training Simulator",
    category: "Enterprise Solution",
    description: "Professional training in virtual environments with haptic feedback",
    image: "https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?w=600&h=400&fit=crop",
    gradient: "from-orange-600 to-red-600",
    accent: "orange",
  },
  {
    title: "AR Art Gallery",
    category: "Cultural Experience",
    description: "Interactive museum exhibits with AR overlay and gesture recognition",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    gradient: "from-pink-600 to-rose-600",
    accent: "pink",
  },
];

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with typewriter effect
      gsap.from(titleRef.current, {
        y: -80,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Enhanced card animations
      gsap.from(".portfolio-card", {
        y: 120,
        opacity: 0,
        rotationX: 45,
        scale: 0.8,
        duration: 1.4,
        stagger: {
          amount: 1,
          from: "start",
          ease: "power2.out",
        },
        ease: "power4.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Parallax background elements
      gsap.to(".portfolio-bg-element", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Floating animation for cards
      gsap.to(".portfolio-card", {
        y: -8,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.7,
      });

      // Animated mesh gradient
      gsap.to(".mesh-gradient", {
        rotate: 360,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardInteraction = (e: any, index: number, isEntering: boolean) => {
    const card = document.getElementById(`portfolio-card-${index}`);
    const image = card?.querySelector('.portfolio-image');
    const overlay = card?.querySelector('.portfolio-overlay');
    
    if (!card) return;

    if (isEntering) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;

      gsap.to(card, {
        rotationY: x,
        rotationX: -y,
        scale: 1.05,
        z: 50,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(image, {
        scale: 1.15,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        z: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(image, {
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(overlay, {
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative page-section min-h-screen py-28 overflow-hidden bg-black"
    >
      {/* Enhanced background with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        <div className="mesh-gradient absolute inset-0 opacity-30 bg-gradient-conic from-purple-500 via-blue-500 via-emerald-500 to-purple-500 blur-3xl" />
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="portfolio-bg-element absolute w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse" />
        <div className="portfolio-bg-element absolute w-72 h-72 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-2xl bottom-1/4 right-1/4 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 
          ref={titleRef}
          className="text-7xl lg:text-8xl font-black text-center mb-24 bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight"
        >
          Featured Work
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              id={`portfolio-card-${index}`}
              className="portfolio-card group relative overflow-hidden rounded-3xl bg-slate-800/80 border border-slate-600/50 backdrop-blur-lg transition-all duration-700 cursor-pointer transform-gpu hover:border-slate-400/70"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              onMouseMove={(e) => handleCardInteraction(e, index, true)}
              onMouseLeave={(e) => handleCardInteraction(e, index, false)}
            >
              {/* Image container with advanced effects */}
              <div className="aspect-video overflow-hidden relative rounded-t-3xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="portfolio-image w-full h-full object-cover transition-transform duration-700"
                />
                
                {/* Gradient overlay */}
                <div className={`portfolio-overlay absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 mix-blend-multiply transition-opacity duration-600`} />
                
                {/* Glow ring */}
                <div className={`absolute inset-0 border-2 border-${project.accent}-400/50 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-all duration-700`} />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className={`w-20 h-20 bg-gradient-to-r ${project.gradient} rounded-full flex items-center justify-center shadow-2xl shadow-${project.accent}-500/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Content area with enhanced styling */}
              <div className="p-8 relative bg-slate-800/90 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-${project.accent}-400 text-sm font-bold uppercase tracking-wider px-3 py-1 bg-${project.accent}-400/20 rounded-full border border-${project.accent}-400/50`}>
                    {project.category}
                  </span>
                  <div className="flex space-x-2">
                    <div className={`w-2 h-2 bg-${project.accent}-400 rounded-full animate-pulse`} />
                    <div className={`w-2 h-2 bg-${project.accent}-400/60 rounded-full animate-pulse`} style={{ animationDelay: '0.5s' }} />
                    <div className={`w-2 h-2 bg-${project.accent}-400/30 rounded-full animate-pulse`} style={{ animationDelay: '1s' }} />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                  {project.title}
                </h3>
                
                <p className="text-slate-300 mb-8 group-hover:text-slate-100 transition-colors duration-500 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex space-x-4">
                  <button className={`flex items-center space-x-3 px-6 py-3 bg-gradient-to-r ${project.gradient} text-white rounded-2xl hover:shadow-2xl hover:shadow-${project.accent}-500/50 transition-all duration-500 group-hover:scale-105 backdrop-blur-sm font-semibold`}>
                    <Play className="w-5 h-5" />
                    <span>View Demo</span>
                  </button>
                  
                  <button className={`flex items-center space-x-3 px-6 py-3 border-2 border-${project.accent}-500/70 text-${project.accent}-300 rounded-2xl hover:bg-${project.accent}-500/20 hover:border-${project.accent}-400 transition-all duration-500 group-hover:scale-105 backdrop-blur-sm font-semibold`}>
                    <ExternalLink className="w-5 h-5" />
                    <span>Learn More</span>
                  </button>
                </div>
              </div>

              {/* Bottom glow effect */}
              <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;