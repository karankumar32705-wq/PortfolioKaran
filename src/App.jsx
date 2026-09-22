import React, { useState, useEffect, useRef } from 'react';
import profilePic from './assets/karan.jpeg';

// ==========================================
// ZERO-DEPENDENCY INLINE ICONS
// ==========================================
const SVGProps = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" };

const IconMenu = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const IconX = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconCode = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const IconDatabase = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>;
const IconTerminal = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>;
const IconLayout = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;
const IconActivity = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const IconCpu = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>;
const IconLayers = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>;
const IconChevronRight = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><polyline points="9 18 15 12 9 6"></polyline></svg>;
const IconExternalLink = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
const IconMail = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const IconMapPin = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const IconSmartphone = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
const IconGithub = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const IconLinkedin = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const IconInstagram = ({ size = 24, className = "" }) => <svg width={size} height={size} className={className} {...SVGProps}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
// ==========================================

// Custom hook for scroll reveal animations
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// Reveal Wrapper Component
const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SECTIONS = ['Home', 'About', 'Education', 'Skills', 'Projects', 'Hackathons', 'Services', 'Experience', 'Contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll events for navbar styling and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = SECTIONS.map(s => document.getElementById(s.toLowerCase()));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1128] text-[#FDFBF7] font-sans selection:bg-[#E06D53]/30 overflow-hidden relative">
      
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#E06D53]/15 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C05746]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0A1128]/80 backdrop-blur-md border-b border-[#FDFBF7]/10 py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#E06D53] to-[#E88D72] cursor-pointer" onClick={() => scrollToSection('Home')}>
            Karan<span className="text-[#FDFBF7]">.</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-6">
            {SECTIONS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-sm font-medium transition-colors hover:text-[#E06D53] ${
                  activeSection === item ? 'text-[#E06D53]' : 'text-[#FDFBF7]/70'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Nav Toggle */}
          <button className="lg:hidden text-[#FDFBF7]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <IconX size={24} /> : <IconMenu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#050914]/95 backdrop-blur-xl border-b border-[#FDFBF7]/10 py-4 px-6 flex flex-col space-y-4 shadow-2xl">
            {SECTIONS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-left text-base font-medium ${
                  activeSection === item ? 'text-[#E06D53]' : 'text-[#FDFBF7]/70'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content container */}
      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 md:px-12">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text Content */}
            <Reveal>
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#E06D53]/10 border border-[#E06D53]/20 text-[#E06D53] text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#E06D53] animate-pulse mr-2"></span>
                  Available for opportunities
                </div>
                
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                  Hi, I'm <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E06D53] via-[#E88D72] to-[#FDFBF7]">
                    Karan Kumar
                  </span>
                </h1>
                
                <h2 className="text-xl md:text-2xl font-medium text-[#FDFBF7]/90">
                  Aspiring Data Scientist | AI/ML Enthusiast | UI/UX & Web Developer
                </h2>
                
                <p className="text-[#FDFBF7]/70 max-w-lg text-base md:text-lg leading-relaxed">
                  I'm a Computer Science & Engineering student at IIIT Kalyani passionate about AI/ML, Data Science, and modern web experiences. I enjoy learning, building projects, participating in hackathons, and turning ideas into interactive digital experiences.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <button onClick={() => scrollToSection('Projects')} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E06D53] to-[#C05746] text-[#FDFBF7] font-medium hover:shadow-[0_0_20px_rgba(224,109,83,0.4)] hover:-translate-y-1 transition-all duration-300">
                    View My Projects
                  </button>
                  <button onClick={() => scrollToSection('Contact')} className="px-6 py-3 rounded-xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 text-[#FDFBF7] font-medium hover:bg-[#FDFBF7]/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                    Let's Connect
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Right: Profile Visual */}
            <Reveal delay={200}>
              <div className="relative flex justify-center items-center h-[400px] md:h-[500px]">
                {/* Glowing Background Ring */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#E06D53]/20 to-[#FDFBF7]/10 rounded-full blur-3xl animate-pulse"></div>
                
                {/* Profile Picture Frame */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-br from-[#FDFBF7]/20 to-[#FDFBF7]/5 backdrop-blur-xl border border-[#FDFBF7]/20 shadow-[0_0_40px_rgba(224,109,83,0.2)] z-10 flex items-center justify-center overflow-hidden group">
                  <div className="w-full h-full rounded-full bg-[#050914] flex items-center justify-center relative overflow-hidden">
                     <img 
                       src={profilePic} 
                       alt="Karan Kumar" 
                       className="w-full h-full object-cover object-top scale-110 rounded-full group-hover:scale-115 transition-transform duration-500"
                     />
                  </div>
                </div>

                {/* Floating Elements (Orbiting) */}
                <style>{`
                  @keyframes float-1 { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-20px) translateX(10px); } }
                  @keyframes float-2 { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(20px) translateX(-15px); } }
                  @keyframes float-3 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(10deg); } }
                `}</style>

                <div className="absolute top-10 left-10 md:top-20 md:left-20 p-4 rounded-xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 backdrop-blur-md shadow-lg z-20" style={{ animation: 'float-1 6s ease-in-out infinite' }}>
                  <IconActivity className="text-[#E06D53]" size={28} />
                </div>
                <div className="absolute bottom-10 left-4 md:bottom-20 md:left-10 p-3 rounded-xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 backdrop-blur-md shadow-lg z-20" style={{ animation: 'float-2 7s ease-in-out infinite' }}>
                  <IconCode className="text-[#E88D72]" size={24} />
                </div>
                <div className="absolute top-1/2 right-4 md:right-10 p-4 rounded-xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 backdrop-blur-md shadow-lg z-20" style={{ animation: 'float-3 5s ease-in-out infinite' }}>
                  <IconDatabase className="text-[#FDFBF7]/90" size={28} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="py-24 px-6 md:px-12 relative">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">About <span className="text-[#E06D53]">Me</span></h2>
                <div className="h-px bg-gradient-to-r from-[#E06D53]/50 to-transparent flex-1"></div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="p-8 md:p-10 rounded-3xl bg-[#FDFBF7]/[0.03] border border-[#FDFBF7]/10 backdrop-blur-xl relative overflow-hidden group hover:border-[#FDFBF7]/20 transition-colors duration-500">
                {/* Decorative background shape */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#E06D53]/10 rounded-full blur-[80px] group-hover:bg-[#E06D53]/20 transition-colors duration-500"></div>
                
                <div className="relative z-10 text-[#FDFBF7]/80 text-lg leading-relaxed space-y-6">
                  <p>
                    I am a B.Tech Computer Science & Engineering student at the 
                    <strong className="text-[#FDFBF7]"> Indian Institute of Information Technology, Kalyani (IIIT Kalyani)</strong>, 
                    with an expected graduation in 2029. 
                  </p>
                  <p>
                    My core interests lie at the intersection of intelligence and design. I have a strong passion for 
                    <strong className="text-[#FDFBF7]"> AI/ML and Data Science</strong>, continuously working towards my career goal of becoming a Data Scientist. I love analyzing data, building predictive models, and uncovering insights.
                  </p>
                  <p>
                    Simultaneously, I am actively developing my skills in <strong className="text-[#FDFBF7]">web development and UI/UX design</strong>. I believe that powerful algorithms are most effective when paired with intuitive, beautifully designed user interfaces. I enjoy learning new technologies, building practical projects, and participating in hackathons to test my skills in real-world scenarios.
                  </p>

                  <div className="pt-6 border-t border-[#FDFBF7]/10">
                    <h3 className="text-sm uppercase tracking-wider text-[#FDFBF7]/50 mb-4 font-semibold">Currently Learning & Exploring</h3>
                    <div className="flex flex-wrap gap-3">
                      {['AI/ML', 'Data Science', 'Web Development', 'UI/UX'].map((item) => (
                        <span key={item} className="px-4 py-2 rounded-lg bg-[#E06D53]/10 border border-[#E06D53]/20 text-[#E88D72] text-sm font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E06D53]"></span>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="py-24 px-6 md:px-12 relative bg-black/20">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-4 mb-16">
                <h2 className="text-3xl md:text-4xl font-bold">Academic <span className="text-[#E06D53]">Journey</span></h2>
                <div className="h-px bg-gradient-to-r from-[#E06D53]/50 to-transparent flex-1"></div>
              </div>
            </Reveal>

            <div className="relative pl-8 md:pl-0">
              {/* Vertical Timeline Line (Desktop centered, Mobile left) */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#E06D53] via-[#E88D72] to-transparent md:-translate-x-1/2"></div>

              <Reveal delay={100}>
                <div className="relative md:w-1/2 md:pr-12 md:ml-auto md:pl-12 flex flex-col md:items-start items-start mb-12">
                  {/* Timeline Dot */}
                  <div className="absolute left-[-33px] md:left-0 top-6 w-4 h-4 rounded-full bg-[#0A1128] border-2 border-[#E06D53] md:-translate-x-1/2 shadow-[0_0_10px_rgba(224,109,83,0.8)] z-10"></div>
                  
                  <div className="w-full p-6 md:p-8 rounded-2xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 backdrop-blur-md hover:-translate-y-1 hover:border-[#E06D53]/50 transition-all duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#E06D53]/20 text-[#E88D72] text-xs font-bold mb-4 tracking-wider">EXPECTED: 2029</span>
                    <h3 className="text-xl md:text-2xl font-bold text-[#FDFBF7] mb-2">B.Tech in Computer Science & Engineering</h3>
                    <p className="text-[#E06D53] font-medium mb-4">Indian Institute of Information Technology, Kalyani (IIIT Kalyani)</p>
                    <p className="text-[#FDFBF7]/70 text-sm">
                      Focusing on core computer science fundamentals, artificial intelligence, and software engineering principles.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 px-6 md:px-12 relative">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-4 mb-16">
                <h2 className="text-3xl md:text-4xl font-bold">Technical <span className="text-[#E06D53]">Skills</span></h2>
                <div className="h-px bg-gradient-to-r from-[#E06D53]/50 to-transparent flex-1"></div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Programming */}
              <Reveal delay={100} className="h-full">
                <div className="h-full p-6 rounded-2xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 backdrop-blur-sm hover:bg-[#FDFBF7]/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#E06D53]/15 border border-[#E06D53]/30 flex items-center justify-center mb-6">
                    <IconTerminal className="text-[#E06D53]" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#FDFBF7] mb-6">Programming</h3>
                  <div className="space-y-4">
                    {[{name: 'Python', level: 'Strong Base'}, {name: 'C', level: 'Core'}, {name: 'SQL / MySQL', level: 'Database'}].map(skill => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#FDFBF7]/90">{skill.name}</span>
                          <span className="text-[#E06D53] text-xs">{skill.level}</span>
                        </div>
                        <div className="w-full bg-[#FDFBF7]/10 rounded-full h-1.5">
                          <div className="bg-[#E06D53] h-1.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Data Science */}
              <Reveal delay={200} className="h-full">
                <div className="h-full p-6 rounded-2xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 backdrop-blur-sm hover:bg-[#FDFBF7]/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#E06D53]/15 border border-[#E06D53]/30 flex items-center justify-center mb-6">
                    <IconDatabase className="text-[#E06D53]" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#FDFBF7] mb-6">Data Science / Libraries</h3>
                  <div className="space-y-4">
                    {['NumPy', 'Pandas', 'Matplotlib'].map(skill => (
                      <div key={skill}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#FDFBF7]/90">{skill}</span>
                          <span className="text-[#E06D53] text-xs">Basic Knowledge</span>
                        </div>
                        <div className="w-full bg-[#FDFBF7]/10 rounded-full h-1.5 relative overflow-hidden">
                          <div className="bg-[#E06D53] h-1.5 rounded-full absolute left-0 top-0 opacity-80" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Web Dev */}
              <Reveal delay={300} className="h-full">
                <div className="h-full p-6 rounded-2xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 backdrop-blur-sm hover:bg-[#FDFBF7]/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#E06D53]/15 border border-[#E06D53]/30 flex items-center justify-center mb-6">
                    <IconCode className="text-[#E06D53]" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#FDFBF7] mb-6">Web Development</h3>
                  <div className="space-y-4">
                    {[{name: 'HTML', w: '85%'}, {name: 'CSS', w: '80%'}, {name: 'React', w: '65%'}].map(skill => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#FDFBF7]/90">{skill.name}</span>
                        </div>
                        <div className="w-full bg-[#FDFBF7]/10 rounded-full h-1.5">
                          <div className="bg-[#E06D53] h-1.5 rounded-full" style={{ width: skill.w }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Design */}
              <Reveal delay={400} className="h-full">
                <div className="h-full p-6 rounded-2xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 backdrop-blur-sm hover:bg-[#FDFBF7]/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#E06D53]/15 border border-[#E06D53]/30 flex items-center justify-center mb-6">
                    <IconLayout className="text-[#E06D53]" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#FDFBF7] mb-6">Design</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#FDFBF7]/90">UI/UX Design</span>
                        <span className="text-[#E06D53] text-xs">Developing</span>
                      </div>
                      <div className="w-full bg-[#FDFBF7]/10 rounded-full h-1.5">
                        <div className="bg-[#E06D53] h-1.5 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 px-6 md:px-12 relative bg-black/20">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-4 mb-16">
                <h2 className="text-3xl md:text-4xl font-bold">Featured <span className="text-[#E06D53]">Projects</span></h2>
                <div className="h-px bg-gradient-to-r from-[#E06D53]/50 to-transparent flex-1"></div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Sentix Project */}
              <Reveal delay={100}>
                <div className="group rounded-3xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 backdrop-blur-md overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(224,109,83,0.15)] transition-all duration-500 relative">
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-[#FDFBF7]/10 rounded-full text-xs font-semibold text-[#E88D72] shadow-lg">Hackathon Project</span>
                  </div>
                  
                  {/* Mock Image Area */}
                  <div className="h-64 w-full bg-[#050914] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                    <div className="flex items-end gap-2 h-32 opacity-70">
                      {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                        <div key={i} className="w-8 bg-gradient-to-t from-[#C05746] to-[#E06D53] rounded-t-sm animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}></div>
                      ))}
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-[#FDFBF7]">Sentix</h3>
                      <div className="flex gap-3">
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[#FDFBF7]/70 hover:text-[#E06D53] transition-colors">
                          <IconGithub size={20} />
                        </a>
                        <a href="https://sentix-bit-breakers-innovatex.vercel.app" target="_blank" rel="noreferrer" className="text-[#FDFBF7]/70 hover:text-[#E06D53] transition-colors">
                          <IconExternalLink size={20} />
                        </a>
                      </div>
                    </div>
                    
                    <p className="text-[#E06D53] text-sm mb-4 font-medium">BIT Breakers / InnovateX Hackathon</p>
                    
                    <p className="text-[#FDFBF7]/70 text-sm leading-relaxed mb-6">
                      An intelligent application built during the InnovateX Hackathon. Sentix combines modern web technologies to process and visualize data, showcasing a blend of intelligent features and clean UI/UX design.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {['React', 'Web Development', 'UI/UX', 'Hackathon Prototype'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 rounded-lg text-xs text-[#FDFBF7]/90">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a href="https://sentix-bit-breakers-innovatex.vercel.app" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-gradient-to-r from-[#E06D53] to-[#C05746] text-[#FDFBF7] font-medium hover:opacity-90 transition-opacity gap-2">
                      View Live Demo <IconChevronRight size={16} />
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Future Project Placeholder */}
              <Reveal delay={200}>
                <div className="h-full min-h-[400px] rounded-3xl bg-[#FDFBF7]/[0.02] border border-[#FDFBF7]/5 border-dashed flex flex-col items-center justify-center p-8 text-center hover:bg-[#FDFBF7]/[0.04] transition-colors duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#FDFBF7]/5 flex items-center justify-center mb-6">
                    <IconCode className="text-[#FDFBF7]/50" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#FDFBF7]/90 mb-2">More Projects Coming Soon...</h3>
                  <p className="text-[#FDFBF7]/50 text-sm max-w-sm">
                    I am constantly learning and building. Check back later to see new Data Science models, AI experiments, and web applications.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* HACKATHONS SECTION */}
        <section id="hackathons" className="py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-[#E06D53]/10 border border-[#E06D53]/20 mb-6">
                <IconCpu className="text-[#E06D53]" size={32} />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Hackathon <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E06D53] to-[#E88D72]">Participant</span></h2>
              <p className="text-[#FDFBF7]/70 text-lg max-w-2xl mx-auto mb-12">
                I thrive in high-energy environments. Participating in hackathons allows me to solve complex problems, collaborate under pressure, experiment with new technologies, and turn abstract ideas into working prototypes.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-[#E06D53] to-[#C05746] blur-2xl opacity-20 rounded-full"></div>
                <div className="relative p-6 md:p-8 rounded-3xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 backdrop-blur-xl flex flex-col md:flex-row items-center gap-6 text-left">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C05746] to-[#E06D53] flex items-center justify-center shadow-lg shrink-0">
                    <IconLayers className="text-[#FDFBF7]" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#FDFBF7]">InnovateX Hackathon</h3>
                    <p className="text-[#E06D53] text-sm font-medium mb-2">Team: BIT Breakers</p>
                    <p className="text-[#FDFBF7]/70 text-sm">
                      Collaborated to build <strong className="text-[#FDFBF7]">Sentix</strong>, focusing on robust architecture and an intuitive user interface. This experience strengthened my ability to rapidly prototype and integrate intelligent features into web applications.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SERVICES / WHAT I CAN DO */}
        <section id="services" className="py-24 px-6 md:px-12 bg-black/20 border-t border-b border-[#FDFBF7]/5">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="flex flex-col items-center text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Can <span className="text-[#E06D53]">Do</span></h2>
                <p className="text-[#FDFBF7]/70 max-w-xl text-sm">Leveraging my growing skills in web development and design to create modern digital experiences.</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Service 1 */}
              <Reveal delay={100}>
                <div className="p-8 rounded-3xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 backdrop-blur-sm hover:border-[#E06D53]/30 transition-colors h-full group">
                  <div className="w-14 h-14 rounded-xl bg-[#E06D53]/10 border border-[#E06D53]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconLayout className="text-[#E06D53]" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#FDFBF7] mb-4">UI/UX Design</h3>
                  <p className="text-[#FDFBF7]/70 text-sm leading-relaxed mb-6">
                    I create modern, intuitive, and visually engaging user interfaces with a focus on usability, clean layouts, and contemporary digital aesthetics like glassmorphism and minimal design.
                  </p>
                  <ul className="space-y-2">
                    {['Interactive UI Prototypes', 'User-Centric Layouts', 'Modern Website Design'].map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-[#FDFBF7]/90 gap-2">
                        <IconChevronRight size={14} className="text-[#E06D53]" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Service 2 */}
              <Reveal delay={200}>
                <div className="p-8 rounded-3xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 backdrop-blur-sm hover:border-[#E06D53]/30 transition-colors h-full group">
                  <div className="w-14 h-14 rounded-xl bg-[#E06D53]/10 border border-[#E06D53]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconSmartphone className="text-[#E06D53]" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#FDFBF7] mb-4">Frontend Interface Development</h3>
                  <p className="text-[#FDFBF7]/70 text-sm leading-relaxed mb-6">
                    Translating designs into responsive, interactive, and performant web interfaces using modern frameworks like React and styling libraries like Tailwind CSS.
                  </p>
                  <ul className="space-y-2">
                    {['Responsive Web Interfaces', 'Component-Based Architecture', 'Smooth Animations & Transitions'].map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-[#FDFBF7]/90 gap-2">
                        <IconChevronRight size={14} className="text-[#E06D53]" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* EXPERIENCE & ACTIVITIES */}
        <section id="experience" className="py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-4 mb-16">
                <h2 className="text-3xl md:text-4xl font-bold">Experience & <span className="text-[#E06D53]">Activities</span></h2>
                <div className="h-px bg-gradient-to-r from-[#E06D53]/50 to-transparent flex-1"></div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#E06D53]/10 to-transparent border border-[#E06D53]/20 backdrop-blur-md">
                <h3 className="text-xl font-bold text-[#FDFBF7] mb-4">Self-Directed Learning & Project Building</h3>
                <p className="text-[#FDFBF7]/90 mb-6 leading-relaxed">
                  As a dedicated student, my current "experience" is actively forged through hands-on building, late-night coding sessions, and continuous learning. I am building practical experience by:
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="mt-1 w-8 h-8 rounded-full bg-[#FDFBF7]/5 flex items-center justify-center shrink-0">
                      <IconTerminal size={14} className="text-[#E06D53]" />
                    </div>
                    <div>
                      <h4 className="text-[#FDFBF7] font-medium">Experimenting with Data Science & AI/ML</h4>
                      <p className="text-[#FDFBF7]/70 text-sm mt-1">Applying Python, Pandas, and foundational algorithms to understand and model data.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="mt-1 w-8 h-8 rounded-full bg-[#FDFBF7]/5 flex items-center justify-center shrink-0">
                      <IconCode size={14} className="text-[#E06D53]" />
                    </div>
                    <div>
                      <h4 className="text-[#FDFBF7] font-medium">Developing Web Applications</h4>
                      <p className="text-[#FDFBF7]/70 text-sm mt-1">Creating functional prototypes and responsive interfaces to bring ideas to life.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-1 w-8 h-8 rounded-full bg-[#FDFBF7]/5 flex items-center justify-center shrink-0">
                      <IconLayers size={14} className="text-[#E06D53]" />
                    </div>
                    <div>
                      <h4 className="text-[#FDFBF7] font-medium">Hackathon Participation</h4>
                      <p className="text-[#FDFBF7]/70 text-sm mt-1">Engaging in competitive environments like InnovateX to solve problems under constraints.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 px-6 md:px-12 bg-black/40 relative">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Let's Build Something <span className="text-[#E06D53]">Together</span></h2>
                <p className="text-[#FDFBF7]/70">Feel free to reach out for collaborations, project inquiries, or just to connect!</p>
              </div>
            </Reveal>

            <Reveal delay={100} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Email Card */}
                <a href="mailto:email@example.com" className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 hover:bg-[#FDFBF7]/10 transition-colors group">
                  <div className="w-16 h-16 rounded-full bg-[#E06D53]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconMail className="text-[#E06D53]" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-[#FDFBF7]/50 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-[#FDFBF7] font-medium break-all">[Your Email]</p>
                  </div>
                </a>
                
                {/* Phone Card */}
                <div className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 hover:bg-[#FDFBF7]/10 transition-colors group">
                  <div className="w-16 h-16 rounded-full bg-[#E06D53]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconSmartphone className="text-[#E06D53]" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-[#FDFBF7]/50 uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-[#FDFBF7] font-medium">[Your Phone]</p>
                  </div>
                </div>

                {/* Location Card */}
                <div className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 hover:bg-[#FDFBF7]/10 transition-colors group">
                  <div className="w-16 h-16 rounded-full bg-[#E06D53]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconMapPin className="text-[#E06D53]" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-[#FDFBF7]/50 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-[#FDFBF7] font-medium">Kalyani, India</p>
                  </div>
                </div>
              </div>

              {/* Social Links Centered */}
              <div className="flex justify-center gap-6">
                <a 
                  href="https://www.linkedin.com/in/karan-kumar-202530397/0" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-14 h-14 rounded-full bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 flex items-center justify-center hover:-translate-y-1 hover:bg-[#FDFBF7]/10 text-[#FDFBF7] hover:text-[#E06D53] transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <IconLinkedin size={24} />
                </a>
                
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-14 h-14 rounded-full bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 flex items-center justify-center hover:-translate-y-1 hover:bg-[#FDFBF7]/10 text-[#FDFBF7] hover:text-[#E06D53] transition-all"
                  aria-label="GitHub Profile"
                >
                  <IconGithub size={24} />
                </a>
                
                <a 
                  href="https://www.instagram.com/karankumar_307/?hl=en" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-14 h-14 rounded-full bg-[#FDFBF7]/5 border border-[#FDFBF7]/10 flex items-center justify-center hover:-translate-y-1 hover:bg-[#FDFBF7]/10 text-[#FDFBF7] hover:text-[#E06D53] transition-all"
                  aria-label="Instagram Profile"
                >
                  <IconInstagram size={24} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-[#FDFBF7]/10 bg-[#0A1128] py-8 px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-4">
          <p className="text-[#FDFBF7]/90 font-medium">
            Karan Kumar
          </p>
          <p className="text-[#FDFBF7]/70 text-sm">
            Aspiring Data Scientist • AI/ML Enthusiast • UI/UX Designer
          </p>
          <p className="text-[#FDFBF7]/50 text-xs mt-4">
            © 2026 Karan Kumar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}