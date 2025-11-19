import { motion } from "framer-motion";
import { FaPhoneAlt, FaHeart } from "react-icons/fa";
import storyImg from "../../../assets/Screenshot 2025-11-02 204537.png";
import CountUp from "react-countup";
import { Link } from "react-router";

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
});

const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay } }
});

const MotionLink = motion(Link);

const Story = () => {
    return (
        <section className="w-full py-25">
            <div className="max-w-[1440px] mx-auto space-y-16">

                <div className="gap-12 items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 space-y-6">

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="my-auto"
                        >

                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#fff9f9] text-center rounded-xl lg:p-8 lg:mb-12"
                            >
                                {[
                                    { num: 75, label: "Blood Cooperations" },
                                    { num: 90, label: "Expert Staff" },
                                    { num: 320, label: "Blood Donations" },
                                ].map((item, i) => (
                                    <motion.div key={i} variants={fadeUp(i * 0.2)}>
                                        <h2 className="text-6xl font-bold">
                                            <CountUp end={item.num} />+
                                        </h2>
                                        <p className="font-semibold text-[#B71B1C] opacity-70 mt-1">
                                            {item.label}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <motion.img
                                    src={storyImg}
                                    alt="Blood Bag"
                                    className="rounded-xl w-full h-full object-cover"
                                    variants={fadeIn(0.2)}
                                />

                                <motion.div
                                    className="bg-[#B71B1C] text-white rounded-xl p-6 space-y-3 h-full flex flex-col justify-center"
                                    variants={fadeUp(0.4)}
                                >
                                    <h4 className="text-xl font-semibold">Why We Do It</h4>
                                    <p className="text-sm opacity-90 leading-relaxed">
                                        Every 2 seconds, someone needs a blood transfusion. Yet, less than 5%
                                        of eligible donors give blood. We're here to bridge that gap, making
                                        donation simple, safe, and rewarding.
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <motion.h3
                                className="text-2xl font-semibold text-[#B71B1C] lg:mb-12"
                                variants={fadeUp(0)}
                            >
                                Our Story
                            </motion.h3>

                            <motion.h1
                                className="text-4xl font-bold leading-snug"
                                variants={fadeUp(0.15)}
                            >
                                Dedicated to Life, The Story of Our Blood Drive Initiative
                            </motion.h1>

                            <motion.p
                                className="opacity-80 leading-relaxed lg:my-6"
                                variants={fadeUp(0.25)}
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Fringilla curabitur adipiscing pulvinar nisi natoque odio cursus.
                                Consectetur lacus ridiculus sagittis nisi non euismod euismod molestie.
                            </motion.p>

                            <motion.div
                                className="flex w-fit bg-base-100 card-xs shadow-sm lg:px-4 lg:py-4"
                                variants={fadeUp(0.35)}
                            >
                                <div className="bg-base-200 rounded-xl p-6 space-y-5 w-1/2">
                                    <h4 className="text-xl font-semibold">Have a Question?</h4>
                                    <p className="opacity-80">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <div className="bg-[#B71B1C] text-white p-3 rounded-lg text-2xl">
                                            <FaPhoneAlt />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Call Us</p>
                                            <p className="text-sm opacity-80">+98 765 43210</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <motion.ul className="space-y-3">
                                        {[
                                            "Torquent sem ligula ultrices odio",
                                            "Integer aliquet enim conubia",
                                            "Massa eleifend dapibus litora",
                                            "Aptent morbi duis pharetra vel",
                                        ].map((text, i) => (
                                            <motion.li
                                                key={i}
                                                className="flex items-center gap-2"
                                                variants={fadeUp(0.45 + i * 0.1)}
                                            >
                                                <FaHeart className="text-[#B71B1C]" /> {text}
                                            </motion.li>
                                        ))}
                                    </motion.ul>

                                    <MotionLink
                                        className="btn bg-[#B71B1C] text-white border-0 my-4"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        as={Link}
                                        to='/about'
                                    >
                                        Discover More
                                    </MotionLink>
                                </div>
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section >
    );
};

export default Story;