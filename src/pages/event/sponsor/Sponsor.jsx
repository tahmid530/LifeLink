import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Mock sponsor data with logos and categories
const sponsors = [
  {
    id: 1,
    name: "MediCare Plus",
    category: "Healthcare Partner",
    logo: "🏥",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "LifeSave Org",
    category: "Medical Foundation",
    logo: "💊",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    name: "HealthFirst",
    category: "Insurance Partner",
    logo: "🛡️",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    name: "Red Cross",
    category: "Humanitarian Aid",
    logo: "➕",
    color: "from-red-500 to-rose-500"
  },
  {
    id: 5,
    name: "MedTech",
    category: "Medical Equipment",
    logo: "⚕️",
    color: "from-indigo-500 to-blue-500"
  },
  {
    id: 6,
    name: "Care Foundation",
    category: "Non-Profit",
    logo: "🤝",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 7,
    name: "PharmaPlus",
    category: "Pharmaceutical",
    logo: "💊",
    color: "from-teal-500 to-green-500"
  },
  {
    id: 8,
    name: "Hope Hospital",
    category: "Healthcare Provider",
    logo: "🏨",
    color: "from-amber-500 to-orange-500"
  },
  {
    id: 9,
    name: "BloodBank",
    category: "Medical Services",
    logo: "🩸",
    color: "from-rose-500 to-red-500"
  },
  {
    id: 10,
    name: "LifeStream",
    category: "Health Tech",
    logo: "💙",
    color: "from-cyan-500 to-blue-500"
  },
];

const Sponsor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
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
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const logoVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-red-50 relative overflow-hidden" id="sponsors">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isVisible ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-[#B71B1C] to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <span className="text-2xl text-white">❤️</span>
            </motion.div>

            <h2 className="text-sm font-semibold text-[#B71B1C] uppercase tracking-wider mb-4">
              Our Valued Partners
            </h2>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Generous <span className="text-[#B71B1C]">Sponsors</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Together with our amazing sponsors, we're making a difference in healthcare and saving lives through innovation and compassion.
            </p>
          </motion.div>

          {/* Sponsors Swiper */}
          <motion.div
            variants={itemVariants}
            className="relative mb-20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={2}
              breakpoints={{
                480: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
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
                delay: isHovered ? 5000 : 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 5,
              }}
              navigation={{
                nextEl: '.swiper-button-next-sponsor',
                prevEl: '.swiper-button-prev-sponsor',
              }}
              loop={true}
              speed={1000}
              grabCursor={true}
              className="sponsors-swiper pb-16"
            >
              {sponsors.map((sponsor) => (
                <SwiperSlide key={sponsor.id}>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      y: -8,
                    }}
                    onHoverStart={() => setIsHovered(sponsor.id)}
                    onHoverEnd={() => setIsHovered(null)}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 h-48 flex flex-col items-center justify-center text-center relative overflow-hidden">
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${sponsor.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                      {/* Logo Container */}
                      <motion.div
                        variants={logoVariants}
                        whileHover="hover"
                        className="w-16 h-16 bg-gradient-to-br from-gray-100 to-white rounded-2xl flex items-center justify-center mb-4 shadow-lg border border-gray-200 group-hover:shadow-xl transition-all duration-300"
                      >
                        <span className="text-2xl">{sponsor.logo}</span>
                      </motion.div>

                      {/* Sponsor Name */}
                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#B71B1C] transition-colors duration-300 leading-tight">
                        {sponsor.name}
                      </h3>

                      {/* Category */}
                      <p className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {sponsor.category}
                      </p>

                      {/* Hover Effect Line */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-20 h-1 bg-gradient-to-r from-[#B71B1C] to-red-600 rounded-full transition-all duration-500"></div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev-sponsor absolute top-1/2 -left-4 z-20 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-pointer hover:bg-[#B71B1C] hover:text-white transition-all duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="swiper-button-next-sponsor absolute top-1/2 -right-4 z-20 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-pointer hover:bg-[#B71B1C] hover:text-white transition-all duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx>{`
        .sponsors-swiper {
          padding: 20px 10px 80px 10px;
        }
        
        .sponsors-swiper :global(.swiper-pagination) {
          bottom: 30px;
        }
        
        .sponsors-swiper :global(.swiper-pagination-bullet) {
          background: #d1d5db;
          opacity: 0.5;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        
        .sponsors-swiper :global(.swiper-pagination-bullet-active) {
          background: #B71B1C;
          opacity: 1;
          width: 32px;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(183, 27, 28, 0.3);
        }
        
        .sponsors-swiper :global(.swiper-slide) {
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        
        .sponsors-swiper :global(.swiper-slide-active) {
          opacity: 1;
        }
        
        .sponsors-swiper :global(.swiper-slide-prev),
        .sponsors-swiper :global(.swiper-slide-next) {
          opacity: 0.9;
        }
      `}</style>
    </section>
  );
};

export default Sponsor;