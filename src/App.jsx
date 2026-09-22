import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import your custom PNG icons from the assets folder
import githubIcon from './assets/github.png';
import linkedinIcon from './assets/linkedin.png';
import instagramIcon from './assets/instagram.png';

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-dark bg-gradient-animated font-sans text-gray-200">
      
      {/* RESPONSIVE NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Karan.dev
          </span>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#home" className="hover:text-blue-400 transition">Home</a>
            <a href="#education" className="hover:text-blue-400 transition">Education</a>
            <a href="#tech-stack" className="hover:text-blue-400 transition">Tech Stack</a>
            <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
            <a href="#achievements" className="hover:text-blue-400 transition">Achievements</a>
            <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col gap-1.5 p-2 z-50"
            onClick={toggleMenu}
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full glass-card border-t border-white/10 py-4 px-6 flex flex-col gap-4 md:hidden"
            >
              <a href="#home" onClick={closeMenu} className="block text-lg hover:text-blue-400 transition">Home</a>
              <a href="#education" onClick={closeMenu} className="block text-lg hover:text-blue-400 transition">Education</a>
              <a href="#tech-stack" onClick={closeMenu} className="block text-lg hover:text-blue-400 transition">Tech Stack</a>
              <a href="#projects" onClick={closeMenu} className="block text-lg hover:text-blue-400 transition">Projects</a>
              <a href="#achievements" onClick={closeMenu} className="block text-lg hover:text-blue-400 transition">Achievements</a>
              <a href="#contact" onClick={closeMenu} className="block text-lg hover:text-blue-400 transition">Contact</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 md:w-64 h-48 md:h-64 bg-blue-600/20 rounded-full blur-[80px] md:blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-64 h-48 md:h-64 bg-purple-600/20 rounded-full blur-[80px] md:blur-[100px]" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-blue-400 font-semibold mb-2 text-sm md:text-base">Aspiring Data Scientist | AI/ML Enthusiast</h2>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight text-white">
              Hi, I'm <br className="hidden md:block"/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Karan Kumar
              </span>
            </h1>
            <p className="text-gray-400 mb-8 leading-relaxed text-base md:text-lg px-4 md:px-0">
              A Computer Science & Engineering student at IIIT Kalyani (Class of 2029). I'm passionate about AI/ML, Data Science, and creating modern web experiences. I enjoy turning ideas into interactive digital reality through code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start px-4 md:px-0">
              <a href="#projects" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:scale-105 transition transform shadow-lg shadow-purple-500/30">
                View My Projects
              </a>
              <a href="#contact" className="px-6 py-3 rounded-full glass border border-gray-600 text-white font-medium hover:bg-white/10 transition">
                Let's Connect
              </a>
            </div>
          </motion.div>

          {/* Profile Image Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center mt-8 md:mt-0"
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border-2 border-blue-500/30 animate-[spin_15s_linear_infinite_reverse]" />
              <img 
                src="public/karan.jpg" 
                alt="Karan Kumar" 
                className="absolute inset-8 rounded-full object-cover shadow-2xl glass p-2"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* EDUCATIONAL MILESTONES */}
      <section id="education" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Educational <span className="text-purple-400">Milestones</span></h2>
          </FadeIn>
          
          <div className="space-y-8">
            <FadeIn delay={0.2}>
              <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full" />
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-white">B.Tech in Computer Science & Engineering</h3>
                  <span className="px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium w-max mt-2 md:mt-0">
                    2025 — 2029 (Expected)
                  </span>
                </div>
                <h4 className="text-lg text-purple-400 mb-4">Indian Institute of Information Technology (IIIT), Kalyani</h4>
                <p className="text-gray-400 leading-relaxed">
                  Currently pursuing my undergraduate degree focusing on core computer science fundamentals, data structures, algorithms, and practical software development. Actively participating in hackathons and technical clubs.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-white">Higher Secondary Education (12th Grade)</h3>
                  <span className="px-4 py-1 rounded-full bg-white/10 text-gray-300 text-sm font-medium w-max mt-2 md:mt-0">
                    Completed
                  </span>
                </div>
                <h4 className="text-lg text-gray-400 mb-4">[Your School Name Here]</h4>
                <p className="text-gray-500 leading-relaxed">
                  Completed secondary education with a strong foundation in Mathematics, Physics, and analytical problem-solving, paving the way for my engineering journey.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* TECH STACK I KNOW */}
      <section id="tech-stack" className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Tech Stack <span className="text-blue-400">I Know</span></h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FadeIn delay={0.1}>
              <div className="glass-card p-6 rounded-2xl h-full">
                <h3 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-4">Programming Languages</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 glass rounded-lg text-gray-300">C</span>
                  <span className="px-4 py-2 glass rounded-lg text-blue-300">Python</span>
                  <span className="px-4 py-2 glass rounded-lg text-yellow-300">JavaScript</span>
                  <span className="px-4 py-2 glass rounded-lg text-gray-300">MIPS Assembly</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="glass-card p-6 rounded-2xl h-full">
                <h3 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-4">Web Development</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 glass rounded-lg text-cyan-300">React.js</span>
                  <span className="px-4 py-2 glass rounded-lg text-orange-400">HTML5</span>
                  <span className="px-4 py-2 glass rounded-lg text-blue-400">CSS3</span>
                  <span className="px-4 py-2 glass rounded-lg text-teal-300">Tailwind CSS</span>
                  <span className="px-4 py-2 glass rounded-lg text-purple-300">Three.js / 3D</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="glass-card p-6 rounded-2xl h-full">
                <h3 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-4">Data Science & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 glass rounded-lg text-gray-300">NumPy</span>
                  <span className="px-4 py-2 glass rounded-lg text-gray-300">Pandas</span>
                  <span className="px-4 py-2 glass rounded-lg text-gray-300">Matplotlib</span>
                  <span className="px-4 py-2 glass rounded-lg text-green-300">Tesseract.js</span>
                  <span className="px-4 py-2 glass rounded-lg text-pink-300">Figma (UI/UX)</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured <span className="text-purple-400">Projects</span></h2>
          </FadeIn>

          <div className="space-y-12">
            {/* Project 1: Sentix */}
            <FadeIn delay={0.2}>
              <div className="glass-card rounded-3xl overflow-hidden grid md:grid-cols-2 group">
                <div className="p-6 md:p-12 flex flex-col justify-center">
                  <div className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs md:text-sm font-medium mb-4 w-max border border-purple-500/30">
                    Hackathon Project - InnovateX
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Sentix.ai</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base">
                    A client-side document scanner and lexical sentiment analysis application built using React and Tesseract.js. Developed with team BIT Breakers, it demonstrates the integration of intelligent AI processing with clean, user-centric frontend web design.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="https://sentix-bit-breakers-innovatex.vercel.app" target="_blank" rel="noreferrer" className="flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition">
                      Live Demo
                    </a>
                    {/* GitHub Link Button with custom PNG icon */}
                    <a href="https://github.com/yourusername/sentix" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full glass text-white font-medium hover:bg-white/10 transition">
                      {/* Using inline style filter to make the black github logo white, or assume you downloaded a white PNG */}
                      <img src={githubIcon} alt="GitHub" className="w-5 h-5 brightness-200" />
                      GitHub Repo
                    </a>
                  </div>
                </div>
                <div className="bg-gray-800 relative overflow-hidden min-h-[250px] md:min-h-[300px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="glass p-6 rounded-2xl transform group-hover:scale-105 transition duration-500">
                      <span className="text-xl md:text-2xl font-bold text-white tracking-widest">S E N T I X</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Project 2: Terminal Tetris */}
            <FadeIn delay={0.4}>
              <div className="glass-card rounded-3xl overflow-hidden grid md:grid-cols-2 group flex-col-reverse md:flex-row-reverse">
                <div className="bg-gray-900 relative overflow-hidden min-h-[250px] md:min-h-[300px] border-b md:border-b-0 md:border-r border-white/10">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="w-full h-full border border-green-500/30 bg-black rounded-lg p-4 font-mono text-green-400 text-xs md:text-sm flex flex-col opacity-80">
                      <span>{'>'} ./tetris_game</span>
                      <span>Loading game logic...</span>
                      <span>Collision detection enabled.</span>
                      <span className="mt-4 text-center animate-pulse">Press SPACE to rotate block</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-12 flex flex-col justify-center">
                  <div className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs md:text-sm font-medium mb-4 w-max border border-blue-500/30">
                    C / Linux Development
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Terminal Tetris</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base">
                    A console-based implementation of the classic Tetris game written entirely in C for Linux environments. Features include dynamic block rotation matrices, matrix collision detection, and automated line clearing mechanics.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="https://github.com/yourusername/terminal-tetris" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full glass text-white font-medium hover:bg-white/10 transition">
                      <img src={githubIcon} alt="GitHub" className="w-5 h-5 brightness-200" />
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS & CERTIFICATIONS */}
      <section id="achievements" className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Achievements & <span className="text-pink-400">Certifications</span></h2>
              <p className="text-gray-400 px-4">Milestones from hackathons, competitions, and continuous learning.</p>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.2}>
              <div className="glass p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-l-4 border-l-purple-500 hover:bg-white/5 transition">
                <div>
                  <h4 className="text-lg font-semibold text-white">EdTech 3.0 Global Hackathon</h4>
                  <p className="text-gray-400 text-sm mt-1">Participant - Focused on AI applications for education</p>
                </div>
                <span className="text-xs font-medium px-3 py-1 glass rounded-full text-purple-300">June 2026</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="glass p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-l-4 border-l-blue-500 hover:bg-white/5 transition">
                <div>
                  <h4 className="text-lg font-semibold text-white">Code Canvas - Web Development Competition</h4>
                  <p className="text-gray-400 text-sm mt-1">GDG IIIT Kalyani - Certificate of Participation</p>
                </div>
                <span className="text-xs font-medium px-3 py-1 glass rounded-full text-blue-300">March 2026</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="glass p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-l-4 border-l-pink-500 hover:bg-white/5 transition">
                <div>
                  <h4 className="text-lg font-semibold text-white">InnovateX Hackathon</h4>
                  <p className="text-gray-400 text-sm mt-1">Team BIT Breakers - Developed Sentix.ai Prototype</p>
                </div>
                <span className="text-xs font-medium px-3 py-1 glass rounded-full text-pink-300">2026</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CONTACT (Form Removed) */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Build Something <span className="text-blue-400">Together</span></h2>
            <p className="text-gray-400 mb-12">
              Whether you want to discuss AI, collaborate on a hackathon, or just say hi, my inbox is always open!
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
              <div className="glass-card p-6 rounded-2xl flex items-center justify-center gap-4 w-full md:w-auto">
                <div className="text-left">
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-white font-medium md:text-lg">hello@karankumar.dev</p>
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl flex items-center justify-center gap-4 w-full md:w-auto">
                <div className="text-left">
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-white font-medium md:text-lg">IIIT Kalyani, West Bengal</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* PNG Social Icons */}
          <FadeIn delay={0.4}>
            <div className="flex justify-center gap-6">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="p-4 glass rounded-full hover:bg-white/10 hover:scale-110 transition transform">
                <img src={githubIcon} alt="GitHub" className="w-6 h-6 brightness-200" />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="p-4 glass rounded-full hover:bg-white/10 hover:scale-110 transition transform">
                <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="p-4 glass rounded-full hover:bg-white/10 hover:scale-110 transition transform">
                <img src={instagramIcon} alt="Instagram" className="w-6 h-6" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center glass">
        <p className="text-gray-400 text-xs md:text-sm px-4">
          Karan Kumar <span className="mx-2 hidden md:inline">•</span><br className="md:hidden"/> Aspiring Data Scientist <span className="mx-2 hidden md:inline">•</span><br className="md:hidden"/> UI/UX Developer
        </p>
        <p className="text-gray-600 text-xs mt-3">© 2026 Karan Kumar. All rights reserved.</p>
      </footer>
    </div>
  );
}