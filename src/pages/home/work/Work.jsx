import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const WorkSectionWithIcons = () => {
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

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const steps = [
        {
            icon: "👤",
            number: "01",
            title: "Register & Health Check",
            description: "Cras estiamod in lobortis diam, facilisis lectus ex potenti dis. Montes habitant vivamus."
        },
        {
            icon: "💉",
            number: "02",
            title: "Blood Donation",
            description: "Cras estiamod in lobortis diam, facilisis lectus ex potenti dis. Montes habitant vivamus."
        },
        {
            icon: "❤️",
            number: "03",
            title: "Rest & Save Lives",
            description: "Cras estiamod in lobortis diam, facilisis lectus ex potenti dis. Montes habitant vivamus."
        }
    ];

    return (
        <section className="lg:py-20 max-w-lvw bg-[#1D1D1D] to-white" id="how-it-works">
            <div className="container justify-center items-center mx-auto px-6">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="max-w-6xl mx-auto"
                >
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-20"
                    >
                        <h2 className="text-2xl font-semibold text-[#B71B1C] lg:mb-12">
                            How It Works
                        </h2>
                        <p className="text-5xl font-bold text-white mb-8 leading-tight">
                            Giving Blood Made Easy, Here's How
                        </p>
                        <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo dignissim consequat viverra mi placerat libero. Magnis justo phasellus mi metus, sollicitudin pretium fermentum erat.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.05,
                                    y: -5,
                                    transition: { duration: 0.2 }
                                }}
                                className="group relative"
                            >
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center">
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                                        {step.number}
                                    </div>

                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors duration-300 text-3xl"
                                    >
                                        {step.icon}
                                    </motion.div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed flex-grow">
                                        {step.description}
                                    </p>

                                    <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WorkSectionWithIcons;