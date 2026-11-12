import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Keyboard, Mousewheel } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// Import custom styles (Create this file next)
import './Photography.css';

const Photography = () => {
  const TOTAL_IMAGES = 20;
  const currentYear = new Date().getFullYear();

  return (
    <div className="antialiased min-h-screen flex flex-col items-center bg-[#030614] text-[#E0E7FF] font-sans overflow-x-hidden">
      <div className="bg-glow"></div>

      {/* Header & Back Button */}
      <header className="w-full max-w-7xl mx-auto p-6 md:p-12 flex justify-between items-center z-10 relative mt-4">
        <div className="font-bold text-2xl tracking-widest text-[#79E2F2]">
          K<span className="text-white">.</span>
        </div>
        
        <Link to="/" className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0a0f1d] border border-[#79E2F2]/30 text-white font-medium hover:border-[#79E2F2] hover:bg-[#79E2F2]/10 transition-all duration-300 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Return to Core
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col justify-center items-center relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
            Visual <span className="text-[#79E2F2]">Logs</span>
          </h1>
          <p className="text-sm font-mono tracking-[0.2em] text-[#79E2F2]/70 uppercase">
            Capturing light in 20 frames
          </p>
        </div>

        {/* Swiper Carousel Container */}
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          initialSlide={2}
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 250,
            modifier: 1.5,
            slideShadows: true,
          }}
          keyboard={{ enabled: true }}
          mousewheel={{ forceToAxis: true }}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[EffectCoverflow, Pagination, Keyboard, Mousewheel]}
          className="mySwiper w-full py-12"
        >
          {Array.from({ length: TOTAL_IMAGES }).map((_, index) => {
            const i = index + 1;
            return (
              <SwiperSlide key={i} className="photography-slide">
                <img 
                  src={`/photos/${i}.jpg`} 
                  alt={`Photography frame ${i}`} 
                  loading="lazy" 
                  onError={(e) => { e.target.src = '/photos/1.jpg'; }} 
                />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 transition-opacity duration-300 slide-caption">
                  <span className="text-xs font-mono bg-black/50 backdrop-blur-md px-2 py-1 rounded border border-white/10 text-white">
                    FRAME // {i.toString().padStart(2, '0')}
                  </span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </main>

      <footer className="py-8 text-center text-xs font-mono text-white/30 tracking-widest uppercase z-10 relative mt-auto">
        Optical Archives &copy; {currentYear}
      </footer>
    </div>
  );
};

export default Photography;