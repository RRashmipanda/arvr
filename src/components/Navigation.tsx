
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 2.5,
      ease: "power3.out"
    });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out"
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.out"
      });
    }
  };

  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 bg-black/10 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">HIMATION</div>
          
          <div className="hidden md:flex space-x-8">
            {["Home", "Services", "Portfolio", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-purple-400 transition-colors duration-300 interactive"
              >
                {item}
              </a>
            ))}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-white interactive"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-full w-64 bg-black/90 backdrop-blur-md z-30 transform translate-x-full"
      >
        <div className="flex flex-col pt-20 px-6 space-y-6">
          {["Home", "Services", "Portfolio", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white text-xl hover:text-purple-400 transition-colors duration-300"
              onClick={toggleMenu}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
