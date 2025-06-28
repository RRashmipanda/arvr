
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Gamepad2, Monitor, Smartphone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Eye,
    title: "AR Development",
    description:
      "Cutting-edge augmented reality solutions that blend digital content with the real world.",
    gradient: "from-purple-500 to-pink-500",
    glowColor: "shadow-purple-500/50",
  },
  {
    icon: Gamepad2,
    title: "VR Experiences",
    description:
      "Immersive virtual reality applications for gaming, training, and entertainment.",
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "shadow-blue-500/50",
  },
  {
    icon: Monitor,
    title: "Web AR/VR",
    description:
      "Browser-based AR/VR experiences accessible on any device without downloads.",
    gradient: "from-green-500 to-emerald-500",
    glowColor: "shadow-green-500/50",
  },
  {
    icon: Smartphone,
    title: "Mobile Solutions",
    description:
      "Native AR/VR applications optimized for iOS and Android platforms.",
    gradient: "from-orange-500 to-red-500",
    glowColor: "shadow-orange-500/50",
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced title animation with split text effect
      gsap.from(titleRef.current, {
        y: 120,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Staggered card animations with enhanced easing
      gsap.from(".service-card", {
        y: 100,
        opacity: 0,
        rotationX: 45,
        duration: 1.2,
        ease: "power4.out",
        stagger: {
          amount: 0.8,
          from: "start",
        },
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Floating animation for cards
      gsap.to(".service-card", {
        y: -10,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

      // Particle animation
      gsap.to(".particle", {
        y: -50,
        x: "random(-30, 30)",
        opacity: "random(0.3, 1)",
        duration: "random(2, 4)",
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          amount: 2,
          repeat: -1,
        },
      });

      // Background gradient animation
      gsap.to(".bg-animate", {
        backgroundPosition: "200% 200%",
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = document.querySelector(`.service-card-${index}`);
    if (!card) return;

    if (isEntering) {
      gsap.to(card, {
        scale: 1.08,
        rotationY: 5,
        rotationX: 5,
        duration: 0.6,
        ease: "power3.out",
      });
      
      gsap.to(card.querySelector('.card-glow'), {
        opacity: 1,
        scale: 1.1,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "power3.out",
      });
      
      gsap.to(card.querySelector('.card-glow'), {
        opacity: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative page-section min-h-screen py-20 overflow-hidden"
    >
      {/* Animated background */}
      <div className="bg-animate absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 via-blue-950/20 to-black bg-[length:400%_400%]" />
      
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2
          ref={titleRef}
          className="text-7xl lg:text-8xl font-black text-center mb-24 bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight"
        >
          Our Services
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card service-card-${index} group relative p-8 bg-gradient-to-br from-slate-800/40 via-slate-700/30 to-slate-900/50 rounded-3xl border border-slate-600/30 backdrop-blur-sm transition-all duration-700 cursor-pointer transform-gpu`}
              style={{ transformStyle: "preserve-3d" }}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
            >
              {/* Glow effect */}
              <div className={`card-glow absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 rounded-3xl blur-xl ${service.glowColor}`} />
              
              {/* Card content */}
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                  {service.title}
                </h3>
                
                <p className="text-slate-400 group-hover:text-slate-200 transition-colors duration-500 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/0 via-purple-500/20 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
