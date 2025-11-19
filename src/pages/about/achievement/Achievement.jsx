import React from 'react';
import { FaHeartbeat, FaStethoscope, FaUsers, FaAward } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const Achievement = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const achievements = [
    {
      icon: FaHeartbeat,
      count: 2578,
      label: "Success Smile"
    },
    {
      icon: FaStethoscope,
      count: 3235,
      label: "Happy Donors"
    },
    {
      icon: FaUsers,
      count: 3568,
      label: "Happy Recipient"
    },
    {
      icon: FaAward,
      count: 1364,
      label: "Total Awards"
    }
  ];

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
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="bg-[#F9FAFB] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            OUR ACHIEVEMENTS
          </h2>
          
          {/* Decorative line with icon */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="w-12 sm:w-16 md:w-20 h-0.5 bg-[#B71B1C]"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#B71B1C] rounded-full flex items-center justify-center">
              <FaHeartbeat className="text-white text-sm sm:text-base" />
            </div>
            <div className="w-12 sm:w-16 md:w-20 h-0.5 bg-[#B71B1C]"></div>
          </div>
          
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4">
            We have been working since 2013 with a prestigious vision to helping patient to provide blood.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                  <item.icon className="text-4xl sm:text-5xl text-gray-800" />
                </div>
              </div>

              {/* Count */}
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#B71B1C] mb-2 sm:mb-3">
                {inView && (
                  <CountUp
                    end={item.count}
                    duration={2.5}
                    separator=""
                  />
                )}
              </div>

              {/* Label */}
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                {item.label}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievement;