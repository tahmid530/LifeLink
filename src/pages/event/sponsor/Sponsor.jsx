import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Mock sponsor data - replace with your actual sponsors
const sponsors = [
  { id: 1, name: "CREATIVES", category: "Design Agency" },
  { id: 2, name: "DESIGN", category: "Creative Studio" },
  { id: 3, name: "RETRO LOGO", category: "Branding Agency" },
  { id: 4, name: "VINTAGE", category: "Design Collective" },
  { id: 5, name: "HIPSTER", category: "Creative Lab" },
  { id: 6, name: "VINTAGE", category: "Design Partners" },
  { id: 7, name: "CREATIVES", category: "Innovation Hub" },
  { id: 8, name: "DESIGN", category: "Studio Works" },
];

const Sponsor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-base-100" id="sponsors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h1 className="text-2xl font-semibold text-[#B71B1C] lg:mb-6">
              Our Sponsors
            </h1>
            <p className="text-xl lg:text-4xl text-gray-600 font-sans max-w-2xl mx-auto font-bold leading-snug">
              The sponsors who give their valuable amount to fulfill our mission.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-[#B71B1C] mx-auto mb-16 rounded-full"
          />

          {/* Sponsors Swiper */}
          <motion.div variants={itemVariants} className="relative">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 60,
                },
                1280: {
                  slidesPerView: 6,
                  spaceBetween: 70,
                },
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              loop={true}
              speed={800}
              className="sponsors-swiper"
            >
              {sponsors.map((sponsor, index) => (
                <SwiperSlide key={sponsor.id}>
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 h-40 flex flex-col items-center justify-center text-center">
                      <h3 className="text-2xl font-bold text-neutral mb-2 group-hover:text-primary transition-colors duration-300">
                        {sponsor.name}
                      </h3>
                      <p className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {sponsor.category}
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16 pt-12 border-t border-gray-200"
          >
            <p className="text-lg text-gray-600 mb-6">
              Trusted by the world's most innovative companies
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-outline hover:bg-[#B71B1C] hover:text-white text-[#B71B1C] border-[#B71B1C] px-8"
            >
              Become a Sponsor
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx>{`
        .sponsors-swiper {
          padding: 20px 0 60px 0;
        }
        
        .sponsors-swiper :global(.swiper-pagination-bullet) {
          background: #d1d5db;
          opacity: 0.5;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        
        .sponsors-swiper :global(.swiper-pagination-bullet-active) {
          background: #dc2626;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
        
        .sponsors-swiper :global(.swiper-button-next),
        .sponsors-swiper :global(.swiper-button-prev) {
          color: #dc2626;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .sponsors-swiper :global(.swiper-button-next:hover),
        .sponsors-swiper :global(.swiper-button-prev:hover) {
          background: #dc2626;
          color: white;
          transform: scale(1.1);
        }
        
        .sponsors-swiper :global(.swiper-button-next:after),
        .sponsors-swiper :global(.swiper-button-prev:after) {
          font-size: 16px;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
};

export default Sponsor;