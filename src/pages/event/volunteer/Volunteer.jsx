import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FaHandHoldingHeart, FaGlobeAmericas, FaCalendarAlt, FaUsers } from "react-icons/fa";

const Volunteer = () => {
    const [isVisible, setIsVisible] = useState(true);
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
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-[#EF3D32] to-primary-[#e47a50] text-primary-content">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="max-w-7xl mx-auto"
                >
                    <div className="items-center text-center">
                        <motion.div variants={itemVariants} className="space-y-8">
                            <div className="space-y-6">
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-4xl lg:text-5xl font-bold leading-tight"
                                >
                                    WE HAVE BEEN HELPING PEOPLE FROM 40 YEARS
                                </motion.h2>

                                <motion.p
                                    variants={itemVariants}
                                    className="text-xl lg:text-2xl leading-relaxed"
                                >
                                    You can give blood at any of our blood donation venues all over the world. We have total sixty thousands donor centers and visit thousands of other venues on various occasions.
                                </motion.p>
                                <button className="btn btn-neutral btn-outline">BECOME VOLUNTEER</button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Volunteer;