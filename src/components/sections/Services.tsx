
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Gamepad2, Monitor, Smartphone } from "lucide-react";

const services = [
  {
    icon: Eye,
    title: "AR Development",
    description: "Cutting-edge augmented reality solutions that blend digital content with the real world."
  },
  {
    icon: Gamepad2,
    title: "VR Experiences",
    description: "Immersive virtual reality applications for gaming, training, and entertainment."
  },
  {
    icon: Monitor,
    title: "Web AR/VR",
    description: "Browser-based AR/VR experiences accessible on any device without downloads."
  },
  {
    icon: Smartphone,
    title: "Mobile Solutions",
    description: "Native AR/VR applications optimized for iOS and Android platforms."
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%"
        }
      });

      gsap.from(".service-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="services"
      ref={sectionRef}
      className="page-section min-h-screen py-20 bg-black text-white"
    >
      <div className="container mx-auto px-6">
        <h2 
          ref={titleRef}
          className="text-6xl font-bold text-center mb-20 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          Our Services
        </h2>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-card group p-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 interactive"
            >
              <service.icon className="w-12 h-12 text-purple-400 mb-6 group-hover:text-pink-400 transition-colors duration-300" />
              <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
