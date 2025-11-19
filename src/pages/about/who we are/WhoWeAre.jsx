import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WhoWeAre = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

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
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7 }
        }
    };

    return (
        <section className="bg-gray-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 lg:mt-16 lg:mb-56">

            <div className="max-w-[1440px] mx-auto" ref={ref}>
                <div className="flex gap-8 md:gap-10">
                    {/* Left Content */}
                    <motion.div
                        className="card bg-base-100 mx-auto card-body w-fit absolute shadow-sm space-y-4 sm:space-y-5 md:space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <motion.div variants={itemVariants}>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                                Who We Are?
                            </h2>
                            <motion.div
                                className="w-12 sm:w-16 h-1 bg-[#B71B1C]"
                                initial={{ width: 0 }}
                                animate={inView ? { width: "4rem" } : { width: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            ></motion.div>
                        </motion.div>

                        <motion.p
                            className="text-gray-600 text-base sm:text-lg leading-relaxed"
                            variants={itemVariants}
                        >
                            Blood Buddies is for public donation center with blood donation members in the <br />
                            changing health care system.
                        </motion.p>

                        <motion.ul
                            className="space-y-3 sm:space-y-4"
                            variants={containerVariants}
                        >
                            {[
                                "Specialist blood donors and clinical supervision.",
                                "Increasing communication with our members.",
                                "High quality assessment, diagnosis and treatment.",
                                "Examine critically to ensure alignment.",
                                "The extra care of a multi-disciplinary team."
                            ].map((text, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start gap-2 sm:gap-3"
                                    variants={itemVariants}
                                >
                                    <span className="w-2 h-2 bg-[#B71B1C] rounded-full mt-2"></span>
                                    <span className="text-gray-700 text-sm sm:text-base">{text}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* Right Image with Play Button */}
                    <motion.div
                        className="lg:relative top-56 left-[550px] mt-8 lg:mt-0"
                        variants={imageVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <div className="relative rounded-lg overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=800&q=80"
                                alt="Blood donation scene with nurse and patient"
                                className="w-full lg:w-[900px] h-auto object-cover"
                            />

                            {/* Play Button Overlay */}
                            <motion.button
                                className="absolute inset-0 flex items-center justify-center group"
                                aria-label="Play video"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 bg-opacity-70 rounded-full flex items-center justify-center"
                                    whileHover={{
                                        scale: 1.1,
                                        backgroundColor: "rgba(31, 41, 55, 0.9)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FaPlay className="text-[#B71B1C] text-xl sm:text-2xl ml-1" />
                                </motion.div>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;