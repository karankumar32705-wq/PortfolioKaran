import React, { useState, useEffect, useRef, useMemo } from 'react';
import profilePic from './assets/karan.jpeg';

// ==========================================
// ZERO-DEPENDENCY INLINE ICONS
// ==========================================
const SVGProps = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" };

const IconMenu = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const IconX = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconMapPin = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const IconGithub = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const IconLinkedin = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const IconInstagram = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const IconArrowUpRight = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>;
const IconCamera = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;

// ==========================================
// PRO HOOKS & COMPONENTS
// ==========================================

const useScrollReveal = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px', ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

const MagneticElement = ({ children, className = "", strength = 40 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX / (width/strength), y: middleY / (height/strength) });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`relative cursor-pointer transition-transform duration-300 ease-out ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </div>
  );
};

const SpotlightCard = ({ children, className = "", delay = 0 }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [ref, isVisible] = useScrollReveal();

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={(el) => { ref.current = el; divRef.current = el; }}
      onMouseMove={handleMouseMove}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0f1d]/50 backdrop-blur-md transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(121, 226, 242, 0.08), transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] transition duration-300 opacity-0"
        style={{
          opacity,
          boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.05)`,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(121, 226, 242, 0.1), transparent 40%)`,
          zIndex: 1
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
const SECTIONS = ['Home', 'About', 'Projects', 'Experience', 'Contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  // Generate random stars for the background
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 5
    }));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);

      const sections = SECTIONS.map(s => document.getElementById(s.toLowerCase()));
      const scrollPosition = currentScrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i]);
          break;
        }
      }
    };

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target;
      setIsHovering(
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') || 
        target.closest('a')
      );
    };

    const handleMouseDown = () => {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
    }
  };

  const SKILLS = ['Python', 'C', 'SQL / MySQL', 'HTML', 'CSS', 'React', 'Tailwind', 'UI/UX Design', 'Photography'];

  return (
    <div className="min-h-screen bg-[#030614] text-[#E0E7FF] font-sans selection:bg-[#79E2F2]/30 overflow-hidden relative">
      
      {/* GLOBAL HIGH-END SPACE STYLES */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: fine) { body { cursor: none; } }
        
        /* Star twinkle animation */
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        /* Spaceship flight path */
        @keyframes flyby {
          0% { transform: translate(-15vw, 60vh) rotate(15deg) scale(0.5); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(115vw, 10vh) rotate(-5deg) scale(1.2); opacity: 0; }
        }

        /* Multiexposure Alien Background Animation */
        @keyframes multiexposure-loom {
          0% { opacity: 0.2; transform: translate(-50%, -45%) scale(0.9); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.05); }
          100% { opacity: 0.2; transform: translate(-50%, -55%) scale(1.15); }
        }

        .alien-background {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 100vw;
          max-width: 800px;
          height: auto;
          pointer-events: none;
          z-index: 0;
          mix-blend-mode: color-dodge; /* Blends better with dark backgrounds */
          animation: multiexposure-loom 12s infinite alternate ease-in-out;
        }

        .ufo-container {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 1;
        }
        
        .ufo {
          position: absolute;
          animation: flyby 25s linear infinite;
          filter: drop-shadow(0 0 15px rgba(121, 226, 242, 0.6));
        }

        /* Futuristic Typography Effect */
        .cyber-text {
          position: relative;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.8);
          background: linear-gradient(180deg, #FFFFFF 0%, #79E2F2 100%);
          -webkit-background-clip: text;
          text-shadow: 0 0 40px rgba(121, 226, 242, 0.4);
          letter-spacing: 0.1em;
        }

        .text-reveal-mask { clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
        .text-reveal-inner { transform: translateY(110%); animation: slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slideUp { to { transform: translateY(0); } }

        /* Infinite Smooth Marquee */
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 25s linear infinite; }
      `}} />

      {/* DYNAMIC STARFIELD BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0a1128] via-[#030614] to-[#010208]">
        {stars.map((star, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle 4s infinite ease-in-out ${star.delay}s`,
              transform: `translateY(${scrollY * (star.size * 0.1)}px)`
            }}
          />
        ))}
      </div>

      {/* MULTIEXPOSURE GHOSTLY ALIEN BACKGROUND */}
      <div className="alien-background">
        <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <defs>
            <radialGradient id="alienGlowBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#79E2F2" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#79E2F2" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#79E2F2" stopOpacity="0" />
            </radialGradient>
            <filter id="blurAlien" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>
          <path d="M100 20 C40 20 20 90 20 150 C20 210 60 240 100 240 C140 240 180 210 180 150 C180 90 160 20 100 20 Z" fill="url(#alienGlowBg)" filter="url(#blurAlien)" />
          <path d="M40 130 C60 110 80 125 75 160 C70 195 30 170 40 130 Z" fill="#030614" filter="url(#blurAlien)" />
          <path d="M160 130 C140 110 120 125 125 160 C130 195 170 170 160 130 Z" fill="#030614" filter="url(#blurAlien)" />
        </svg>
      </div>

      {/* ANIMATED UFO / SPACESHIP */}
      <div className="ufo-container">
        <div className="ufo">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 30 L-20 40 L-20 20 Z" fill="url(#engine-glow)" opacity="0.6" />
            <ellipse cx="60" cy="30" rx="45" ry="12" fill="#1E293B" stroke="#79E2F2" strokeWidth="2" />
            <ellipse cx="60" cy="30" rx="20" ry="5" fill="#79E2F2" opacity="0.8" />
            <path d="M 40 28 C 40 15, 80 15, 80 28" fill="rgba(121, 226, 242, 0.3)" stroke="#79E2F2" strokeWidth="1" />
            <circle cx="60" cy="22" r="2" fill="#FFF" className="animate-pulse" />
            <defs>
              <linearGradient id="engine-glow" x1="20" y1="30" x2="-20" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#79E2F2" />
                <stop offset="1" stopColor="#79E2F2" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* CUSTOM ALIEN CURSOR */}
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:flex items-center justify-center transition-all ease-out mix-blend-screen drop-shadow-[0_0_12px_#79E2F2]"
        style={{ 
          transform: `translate(${mousePos.x - 12}px, ${mousePos.y - 12 - (isJumping ? 30 : 0)}px) scale(${isHovering ? 1.4 : (isJumping ? 0.8 : 1)}) rotate(${isJumping ? 15 : 0}deg)`,
          transitionDuration: isJumping ? '150ms' : '75ms',
          opacity: isHovering ? 0.9 : 1
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8 2 4 6 4 11C4 16 8 22 12 22C16 22 20 16 20 11C20 6 16 2 12 2Z" fill="#79E2F2" fillOpacity={isHovering ? "0.8" : "1"} />
          <path d="M8.5 13C7.1 13 6 11.4 6 9.5C6 7.6 7.1 6 8.5 6C9.9 6 11 7.6 11 9.5C11 11.4 9.9 13 8.5 13ZM15.5 13C14.1 13 13 11.4 13 9.5C13 7.6 14.1 6 15.5 6C16.9 6 18 7.6 18 9.5C18 11.4 16.9 13 15.5 13Z" fill="#030614" />
        </svg>
      </div>
      
      {/* SCROLL PROGRESS BAR */}
      <div className="fixed top-0 left-0 h-1 bg-[#79E2F2] z-[60] transition-all duration-300 ease-out shadow-[0_0_10px_#79E2F2]" style={{ width: `${scrollProgress}%` }} />

      {/* FLOATING PILL NAV */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl hidden md:block transition-transform duration-500" style={{ transform: scrollY > 50 ? 'translate(-50%, 0) scale(0.95)' : 'translate(-50%, 0) scale(1)' }}>
        <div className="flex items-center justify-between px-6 py-3 bg-[#0a0f1d]/60 backdrop-blur-xl border border-[#79E2F2]/20 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <div className="font-bold text-xl cursor-pointer flex gap-1 group tracking-widest text-[#79E2F2]" onClick={() => scrollToSection('Home')}>
            K<span className="text-white group-hover:translate-x-1 transition-transform">.</span>
          </div>
          <div className="flex items-center space-x-2">
            {SECTIONS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                  activeSection === item ? 'bg-[#79E2F2]/20 text-[#79E2F2]' : 'text-white/50 hover:text-[#79E2F2] hover:bg-white/5'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* MOBILE NAV TOGGLE */}
      <div className="md:hidden fixed top-6 right-6 z-50">
        <button className="p-4 bg-[#0a0f1d]/80 backdrop-blur-xl border border-[#79E2F2]/20 rounded-full text-[#79E2F2]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <IconX size={20} /> : <IconMenu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#030614]/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8">
          {SECTIONS.map((item, i) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-4xl font-light tracking-widest uppercase text-reveal-mask"
            >
              <div className="text-reveal-inner" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className={activeSection === item ? 'text-[#79E2F2]' : 'text-white'}>{item}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      <main className="relative z-10 flex flex-col items-center">
        
        {/* SPACE HERO SECTION */}
        <section id="home" className="w-full min-h-[100vh] flex items-center justify-center px-6 md:px-12 pt-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-[#79E2F2]/10 to-transparent rounded-full blur-[100px] pointer-events-none" style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.3}px))` }}></div>

          <div className="max-w-7xl w-full flex flex-col items-center text-center relative z-10" style={{ transform: `translateY(${scrollY * 0.15}px)`, opacity: 1 - scrollY / 800 }}>
            
            <div className="text-reveal-mask mb-10">
              <div className="inline-flex items-center px-5 py-2 rounded-full bg-[#79E2F2]/10 border border-[#79E2F2]/30 text-[#79E2F2] text-xs tracking-[0.2em] uppercase font-semibold text-reveal-inner shadow-[0_0_20px_rgba(121,226,242,0.2)]" style={{ animationDelay: '0.1s' }}>
                <span className="w-2 h-2 rounded-full bg-[#79E2F2] mr-3 animate-pulse shadow-[0_0_8px_#79E2F2]"></span>
                Available for opportunities
              </div>
            </div>

            <h1 className="text-[12vw] md:text-[8vw] font-black leading-[1] uppercase mb-8 flex flex-col items-center">
              <span className="text-reveal-mask">
                <span className="block text-reveal-inner cyber-text" style={{ animationDelay: '0.2s' }}>Karan</span>
              </span>
              <span className="text-reveal-mask -mt-4 md:-mt-8">
                <span className="block text-reveal-inner text-transparent bg-clip-text" style={{ WebkitTextStroke: '2px rgba(121,226,242,0.5)', animationDelay: '0.3s' }}>Kumar</span>
              </span>
            </h1>

            <div className="text-reveal-mask mb-14">
              <h2 className="text-sm md:text-xl font-light text-white/70 tracking-widest text-reveal-inner uppercase flex flex-wrap justify-center items-center gap-3" style={{ animationDelay: '0.4s' }}>
                <span>UI Developer</span>
                <span className="text-[#79E2F2] text-xl opacity-50">•</span>
                <span>UI/UX Designer</span>
                <span className="text-[#79E2F2] text-xl opacity-50">•</span>
                <span className="text-white flex items-center gap-2"><IconCamera size={18} className="text-[#79E2F2]"/> Photographer</span>
              </h2>
            </div>

            <div className="text-reveal-mask">
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-reveal-inner" style={{ animationDelay: '0.5s' }}>
                <MagneticElement>
                  <button onClick={() => scrollToSection('Projects')} className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#79E2F2] text-[#030614] font-bold hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(121,226,242,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]">
                    Explore Missions <IconArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </button>
                </MagneticElement>
                
                {/* NEW PHOTOGRAPHY BUTTON */}
                <MagneticElement>
                 <a href="/photography.html" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0a0f1d]/50 backdrop-blur-md border border-[#79E2F2]/30 text-[#79E2F2] font-medium hover:border-[#79E2F2] hover:bg-[#79E2F2]/10 transition-all duration-300 shadow-[0_0_15px_rgba(121,226,242,0.1)]">
                <IconCamera size={18} /> View Photography
                </a>
                </MagneticElement>

                <MagneticElement>
                  <button onClick={() => scrollToSection('Contact')} className="px-8 py-4 rounded-full bg-[#0a0f1d] border border-white/20 text-white font-medium hover:border-white hover:bg-white/5 transition-all duration-300">
                    Establish Contact
                  </button>
                </MagneticElement>
              </div>
            </div>
            
          </div>
        </section>

        {/* BENTO BOX (ABOUT + SKILLS + EDUCATION) */}
        <section id="about" className="w-full py-32 px-6 md:px-12 relative z-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm md:text-base text-[#79E2F2] font-mono mb-8 tracking-[0.2em] uppercase flex items-center gap-4">
              <span className="w-12 h-px bg-[#79E2F2]"></span> 01. Personnel Data
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
              
              <SpotlightCard delay={100} className="md:col-span-2 md:row-span-2 p-8 md:p-12">
                <div className="flex flex-col h-full justify-between">
                  <div className="w-12 h-12 border border-[#79E2F2]/30 rounded-full flex items-center justify-center mb-8 bg-[#79E2F2]/5">
                    <span className="text-[#79E2F2] text-xl font-bold font-mono">K</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-light tracking-tight mb-6">Driven by logic. <br/><span className="font-bold text-white">Designed for humans.</span></h3>
                    <p className="text-white/60 text-lg leading-relaxed font-light">
                      I am a Computer Science & Engineering student at <strong className="text-white font-medium">IIIT Kalyani</strong> (Class of 2029). My core interests lie at the intersection of web design, creative interface engineering, and capturing moments through photography.
                      <br/><br/>
                      I focus on continuously honing my technical capabilities while building modern, intuitive web experiences and crafting beautiful visual designs.
                    </p>
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard delay={200} className="md:col-span-1 md:row-span-2 p-0 group">
                <div className="w-full h-full relative">
                  <img src={profilePic} alt="Karan Kumar" className="w-full h-full object-cover object-top grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030614] via-transparent to-transparent opacity-90"></div>
                  
                  <div className="absolute top-4 right-4 flex gap-1">
                    <div className="w-1 h-1 bg-[#79E2F2] rounded-full animate-ping"></div>
                    <div className="w-1 h-1 bg-[#79E2F2] rounded-full"></div>
                  </div>

                  <div className="absolute bottom-6 left-6 flex items-center gap-2">
                    <IconMapPin size={16} className="text-[#79E2F2]" />
                    <span className="text-xs font-mono tracking-wider uppercase text-white/90">Kalyani, Sector 3</span>
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard delay={300} className="md:col-span-1 md:row-span-1 p-8 flex flex-col justify-center">
                <p className="text-xs text-[#79E2F2]/70 font-mono tracking-widest uppercase mb-4">Academy</p>
                <h4 className="text-xl font-light mb-1">B.Tech CSE</h4>
                <p className="text-sm font-semibold text-white">IIIT Kalyani</p>
                <p className="text-xs text-white/40 mt-auto pt-4 border-t border-white/10 font-mono">Expected 2029</p>
              </SpotlightCard>

              <SpotlightCard delay={400} className="md:col-span-1 md:row-span-1 p-6 flex flex-col justify-center">
                 <p className="text-xs text-[#79E2F2]/70 font-mono tracking-widest uppercase mb-4">Primary Directives</p>
                 <ul className="space-y-3 text-sm text-white/80 font-light">
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#79E2F2] rounded-full shadow-[0_0_5px_#79E2F2]"></div> UI/UX Design</li>
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#79E2F2] rounded-full shadow-[0_0_5px_#79E2F2]"></div> Frontend Dev</li>
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#79E2F2] rounded-full shadow-[0_0_5px_#79E2F2]"></div> Photography</li>
                 </ul>
              </SpotlightCard>

              <SpotlightCard delay={500} className="md:col-span-4 md:row-span-1 p-0 flex flex-col justify-center relative overflow-hidden h-40">
                <div className="absolute left-8 top-8 z-20">
                  <p className="text-xs text-[#79E2F2]/70 font-mono tracking-[0.2em] uppercase">Tech Arsenal</p>
                </div>
                
                <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#0a0f1d] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#0a0f1d] to-transparent z-10 pointer-events-none"></div>
                
                <div className="flex overflow-hidden pt-6">
                  <div className="animate-marquee items-center gap-12 pr-12">
                    {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
                      <span key={i} className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text uppercase tracking-wider" style={{ WebkitTextStroke: '1px rgba(121, 226, 242, 0.3)' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>

            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="w-full py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm md:text-base text-[#79E2F2] font-mono mb-12 tracking-[0.2em] uppercase flex items-center gap-4">
              <span className="w-12 h-px bg-[#79E2F2]"></span> 02. Mission Logs
            </h2>

            <div className="flex flex-col gap-12">
              <SpotlightCard delay={100} className="w-full p-0 flex flex-col lg:flex-row group">
                
                <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="px-3 py-1 bg-[#79E2F2]/10 border border-[#79E2F2]/30 rounded-full text-xs font-mono text-[#79E2F2] shadow-[0_0_10px_rgba(121,226,242,0.1)]">InnovateX Hackathon</span>
                    <span className="text-xs font-mono text-white/50">BIT Breakers</span>
                  </div>
                  
                  <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 group-hover:text-[#79E2F2] transition-colors duration-500 uppercase">Sentix</h3>
                  
                  <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg font-light">
                    An intelligent application built during the InnovateX Hackathon. Sentix combines modern web technologies to process and visualize data, showcasing a blend of interactive features and clean UI/UX design.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-12">
                    {['React', 'UI/UX', 'Frontend Dev'].map(tag => (
                      <span key={tag} className="text-sm font-mono text-[#79E2F2]/60 bg-[#79E2F2]/5 px-3 py-1 rounded-sm border border-[#79E2F2]/10">
                        {`{ ${tag} }`}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6 items-center">
                    <MagneticElement>
                      <a href="https://sentix-bit-breakers-innovatex.vercel.app" target="_blank" rel="noreferrer" className="flex items-center gap-2 pb-1 border-b border-[#79E2F2] text-[#79E2F2] font-medium hover:pr-4 transition-all duration-300">
                        Launch Prototype <IconArrowUpRight size={16} />
                      </a>
                    </MagneticElement>
                    <MagneticElement>
                      <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                        <IconGithub size={24} />
                      </a>
                    </MagneticElement>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 h-80 lg:h-auto relative bg-[#010208]/50 border-l border-white/5 overflow-hidden flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#79E2F2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative w-full h-full max-w-sm border border-[#79E2F2]/20 bg-[#0a0f1d]/80 backdrop-blur-sm rounded-lg flex flex-col transform group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out shadow-[0_0_30px_rgba(121,226,242,0.1)]">
                    <div className="w-full h-10 border-b border-[#79E2F2]/20 px-4 flex items-center justify-between">
                      <div className="text-[10px] font-mono text-[#79E2F2] uppercase tracking-widest">Sentix_Core.exe</div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-sm bg-[#79E2F2]/40"></div>
                        <div className="w-2 h-2 rounded-sm bg-[#79E2F2]/80 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex-1 p-6 flex flex-col gap-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#79E2F2]/30 w-0 group-hover:w-full transition-all duration-1000" style={{ transitionDelay: `${i * 0.2}s` }}></div>
                        </div>
                      ))}
                      <div className="flex-1 flex items-end gap-3 mt-4">
                        {[40, 70, 45, 90, 65].map((h, i) => (
                          <div key={i} className="flex-1 bg-[#79E2F2]/20 border border-[#79E2F2]/30 rounded-t-sm relative group-hover:bg-[#79E2F2]/50 transition-colors duration-500" style={{ height: `${h}%` }}>
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#79E2F2] opacity-0 group-hover:opacity-100 transition-opacity" style={{ transitionDelay: `${i * 0.1}s` }}>{h}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="w-full py-32 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm md:text-base text-[#79E2F2] font-mono mb-16 tracking-[0.2em] uppercase flex items-center gap-4">
              <span className="w-12 h-px bg-[#79E2F2]"></span> 03. Timeline
            </h2>

            <div className="relative border-l border-[#79E2F2]/20 ml-4 md:ml-0 pl-8 md:pl-16 space-y-20">
              
              <div className="relative group">
                <div className="absolute -left-[37px] md:-left-[69px] top-1 w-3 h-3 rounded-full bg-[#030614] border-2 border-[#79E2F2] group-hover:bg-[#79E2F2] group-hover:scale-150 transition-all duration-300 shadow-[0_0_10px_rgba(121,226,242,0.5)]"></div>
                <div className="absolute -left-[37px] md:-left-[69px] top-1 w-3 h-3 rounded-full bg-transparent border border-[#79E2F2] scale-[2.5] opacity-50 animate-ping"></div>
                
                <p className="text-xs font-mono text-[#79E2F2] mb-2 tracking-widest uppercase">Hackathon</p>
                <h3 className="text-3xl font-bold mb-2 text-white">InnovateX Participant</h3>
                <p className="text-white/40 font-mono text-sm mb-6 uppercase">Team BIT Breakers</p>
                <p className="text-white/60 leading-relaxed font-light max-w-2xl">
                  Thrived in a high-energy competitive environment. Collaborated to build Sentix, focusing on robust architecture and an intuitive user interface. Strengthened rapid prototyping skills and the ability to integrate modern features into web applications under time constraints.
                </p>
              </div>

              <div className="relative group">
                <div className="absolute -left-[37px] md:-left-[69px] top-1 w-3 h-3 rounded-full bg-[#030614] border-2 border-white/30 group-hover:border-[#79E2F2] transition-all duration-300"></div>
                <p className="text-xs font-mono text-white/40 mb-2 tracking-widest uppercase">Ongoing Protocol</p>
                <h3 className="text-3xl font-bold mb-2 text-white">Self-Directed Learning</h3>
                <p className="text-white/40 font-mono text-sm mb-6 uppercase">Continuous Development</p>
                <p className="text-white/60 leading-relaxed font-light max-w-2xl mb-6">
                  Actively forging experience through hands-on building, late-night coding sessions, and continuous learning in modern tech stacks.
                </p>
                <ul className="space-y-4 text-white/60 text-sm font-light">
                  <li className="flex items-center gap-4"><span className="w-8 h-px bg-[#79E2F2]/40"></span> Developing Web Applications (React, Tailwind)</li>
                  <li className="flex items-center gap-4"><span className="w-8 h-px bg-[#79E2F2]/40"></span> Crafting Modern UI/UX Prototypes</li>
                  <li className="flex items-center gap-4"><span className="w-8 h-px bg-[#79E2F2]/40"></span> Combining Photography with Visual Web Design</li>
                </ul>
              </div>
              
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="w-full py-40 px-6 md:px-12 relative overflow-hidden border-t border-white/5 bg-[#010208]">
          <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 text-center">
            
            <h2 className="text-sm md:text-base text-[#79E2F2] font-mono mb-8 tracking-[0.2em] uppercase">
              04. Open Communications
            </h2>
            
            <h3 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
              Transmit <br/> Signal.
            </h3>
            
            <p className="text-lg md:text-xl text-white/50 mb-12 max-w-xl font-light">
              My comms channel is always open for new projects, creative ideas, or opportunities to be part of your next mission.
            </p>

            <div className="flex justify-center gap-8 mt-8">
              <MagneticElement strength={20}>
                <a href="https://www.linkedin.com/in/karan-kumar-202530397/0" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#79E2F2] transition-colors flex flex-col items-center gap-3 group">
                  <IconLinkedin size={28} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">LinkedIn</span>
                </a>
              </MagneticElement>
              <MagneticElement strength={20}>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#79E2F2] transition-colors flex flex-col items-center gap-3 group">
                  <IconGithub size={28} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
                </a>
              </MagneticElement>
              <MagneticElement strength={20}>
                <a href="https://www.instagram.com/karankumar_307/?hl=en" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#79E2F2] transition-colors flex flex-col items-center gap-3 group">
                  <IconInstagram size={28} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">Instagram</span>
                </a>
              </MagneticElement>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 px-6 text-center bg-[#010208] flex flex-col items-center">
        <p className="text-[#79E2F2]/50 text-xs font-mono tracking-[0.2em] uppercase mb-4">
          Engineered by Karan Kumar
        </p>
        <p className="text-white/20 text-xs font-mono">
          © {new Date().getFullYear()} All systems normal.
        </p>
      </footer>
    </div>
  );
}