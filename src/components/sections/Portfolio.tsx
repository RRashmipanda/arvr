"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Virtual Showroom",
    category: "VR Experience",
    description: "Immersive product showcase for luxury brands",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&h=400&fit=crop",
  },
  {
    title: "AR Navigation",
    category: "AR Application",
    description: "Real-time augmented reality wayfinding system",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
  },
  {
    title: "VR Training Simulator",
    category: "Enterprise Solution",
    description: "Professional training in virtual environments",
    image: "https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?w=600&h=400&fit=crop",
  },
  {
    title: "AR Art Gallery",
    category: "Cultural Experience",
    description: "Interactive museum exhibits with AR overlay",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
  },
];

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".portfolio-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".portfolio-heading", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
      });

      gsap.to(".portfolio-bg", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt effect on hover
  const handleMouseMove = (e: any, index: number) => {
    const card = document.getElementById(`card-${index}`);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      rotationY: x / 30,
      rotationX: -y / 30,
      scale: 1.03,
      ease: "power2.out",
      duration: 0.3,
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = document.getElementById(`card-${index}`);
    if (!card) return;
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      ease: "power2.out",
      duration: 0.4,
    });
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative page-section min-h-screen py-24 bg-gradient-to-br from-slate-950 via-black to-gray-900 text-white overflow-hidden"
    >
      {/* Background floating particles */}
      <div className="portfolio-bg absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse" />
        <div className="absolute w-72 h-72 bg-emerald-500/20 rounded-full blur-2xl bottom-[-80px] right-[-80px] animate-ping" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="portfolio-heading text-6xl font-bold text-center mb-20 bg-gradient-to-r from-lime-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Featured Work
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              id={`card-${index}`}
              className="portfolio-card group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/30 to-teal-800/20 border border-emerald-500/10 hover:border-emerald-500/40 transition-all duration-500 cursor-pointer transform-gpu"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Glow ring */}
                <div className="absolute inset-0 border-2 border-emerald-400/20 rounded-3xl opacity-0 group-hover:opacity-50 animate-pulse transition-all duration-700" />
              </div>

              <div className="p-8">
                <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-3xl font-bold mt-2 mb-4 group-hover:text-lime-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-300 mb-6">{project.description}</p>

                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-lime-500 text-white rounded-full hover:shadow-xl hover:shadow-teal-500/50 transition-all duration-300 group-hover:scale-105">
                    <Play className="w-4 h-4" />
                    <span>View Demo</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 border border-emerald-500 rounded-full hover:bg-emerald-500/20 transition-all duration-300 group-hover:scale-105">
                    <ExternalLink className="w-4 h-4" />
                    <span>Learn More</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
