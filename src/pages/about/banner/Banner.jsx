import React from "react";
import { motion } from "framer-motion";
import bannerImage from "../../../assets/blood-donation-3.jpg";

const Banner = () => {
    return (
        <div
            className="hero min-h-[600px] object-fill"
            style={{
                backgroundImage: `url(${bannerImage})`,
            }}
        >
            <div className="hero-overlay"></div>

            <div className="hero-content text-neutral-content">
                <motion.div
                    className="text-left lg:ml-[-300px]"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.h1
                        className="mb-5 text-5xl md:text-7xl font-bold"
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    >
                        About US
                    </motion.h1>

                    <motion.p
                        className="mb-5"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
                        a id nisi.
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};
export default Banner;