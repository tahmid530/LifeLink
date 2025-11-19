import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import bgBanner from "../../../assets/banner.jpg";     // background big image
import testimonialImg from "../../../assets/react.svg";  // right-side image (same height)

// Dynamic list
const testimonials = [
    {
        text: "I proudly donate blood on a regular basis because it gives others something they desperately need to survive. Just knowing I can make a difference in someone else's life makes me feel great!",
        name: "BRANDON MUNSON",
        title: "CTO, FULCRUM DESIGN, USA",
        avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
        text: "Blood donation is a responsibility I take seriously. It's an opportunity to help someone during their most critical moments.",
        name: "ALEXANDER SMITH",
        title: "PRODUCT MANAGER, NOVA TECH",
        avatar: "https://i.pravatar.cc/150?img=32",
    },
    {
        text: "Donating blood gives me a sense of purpose. It’s a small act with a big impact.",
        name: "EMILY CARTER",
        title: "HR, BLUEHILL AGENCY",
        avatar: "https://i.pravatar.cc/150?img=47",
    }
];

const Opinion = () => {
    return (
        <section
            className="relative w-full h-[600px] bg-cover bg-center py-20 lg:py-32 lg:mb-76 object-cover"
            style={{ backgroundImage: `url(${bgBanner})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative max-w-[1300px] mx-auto px-6 text-center">
                {/* Top Text */}
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-white/80 tracking-wide mb-4"
                >
                    Awesome Words From Members
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-white text-4xl md:text-5xl font-bold"
                >
                    JOIN WITH US AND SAVE LIFE
                </motion.h2>

                {/* Swiper Slider */}
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    loop={true}
                    spaceBetween={30}
                    className="pb-14 absolute top-50"
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 bg-white rounded-xl shadow-2xl overflow-hidden">

                                {/* LEFT CARD */}
                                <motion.div
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="p-10 lg:p-14 text-left"
                                >
                                    <h3 className="text-red-600 font-semibold tracking-wide mb-4">
                                        DONOR OPINION
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed mb-8 text-[17px]">
                                        {item.text}
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.avatar}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800 text-[15px]">
                                                {item.name}
                                            </p>
                                            <p className="text-gray-500 text-sm">{item.title}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* RIGHT IMAGE */}
                                <motion.div
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="h-fit"
                                >
                                    <img
                                        src={testimonialImg}
                                        className="w-full h-[400px] object-fill"
                                        alt=""
                                    />
                                </motion.div>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>

            </div>
        </section>
    );
};

export default Opinion;
