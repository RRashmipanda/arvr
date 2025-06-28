
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Users, Zap, Target } from "lucide-react";

const stats = [
  { icon: Award, number: "50+", label: "Projects Completed" },
  { icon: Users, number: "25+", label: "Happy Clients" },
  { icon: Zap, number: "3+", label: "Years Experience" },
  { icon: Target, number: "98%", label: "Success Rate" }
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%"
        }
      });

      // Counter animation
      stats.forEach((stat, index) => {
        const element = document.querySelector(`#stat-${index} .stat-number`);
        if (element) {
          gsap.from(element, {
            textContent: 0,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: element,
              start: "top 80%"
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="page-section min-h-screen py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About Himation
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We are pioneers in the AR/VR space, creating immersive experiences that push the boundaries of what's possible. Our team combines cutting-edge technology with creative vision to deliver solutions that transform how people interact with digital content.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              From virtual showrooms to augmented reality applications, we help businesses leverage the power of extended reality to engage customers, train employees, and showcase products in revolutionary ways.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 interactive">
              Learn More About Us
            </button>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                id={`stat-${index}`}
                className="stat-card text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                <stat.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <div className="stat-number text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
