
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Play } from "lucide-react";

const projects = [
  {
    title: "Virtual Showroom",
    category: "VR Experience",
    description: "Immersive product showcase for luxury brands",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&h=400&fit=crop"
  },
  {
    title: "AR Navigation",
    category: "AR Application",
    description: "Real-time augmented reality wayfinding system",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
  },
  {
    title: "VR Training Simulator",
    category: "Enterprise Solution",
    description: "Professional training in virtual environments",
    image: "https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?w=600&h=400&fit=crop"
  },
  {
    title: "AR Art Gallery",
    category: "Cultural Experience",
    description: "Interactive museum exhibits with AR overlay",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop"
  }
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
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="portfolio"
      ref={sectionRef}
      className="page-section min-h-screen py-20 bg-gradient-to-br from-gray-900 to-black text-white"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-6xl font-bold text-center mb-20 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Featured Work
        </h2>
        
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="portfolio-card group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 hover:from-purple-800/40 hover:to-pink-800/40 transition-all duration-500"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="p-8">
                <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">
                  {project.category}
                </span>
                <h3 className="text-3xl font-bold mt-2 mb-4 group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {project.description}
                </p>
                
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 interactive">
                    <Play className="w-4 h-4" />
                    <span>View Demo</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 border border-purple-500 rounded-full hover:bg-purple-500/20 transition-all duration-300 interactive">
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
