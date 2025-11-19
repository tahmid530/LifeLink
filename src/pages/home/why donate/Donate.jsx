import { motion } from "framer-motion";
import { FaTint, FaHeart, FaUserAlt } from "react-icons/fa";
import donateImg from "../../../assets/Donor.jpg";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Donate = () => {
  return (
    <section className="w-full mx-auto space-y-16">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch min-h-[600px]">
          <motion.div
            className="w-full lg:w-2/5 h-fit items-center justify-center px-6 lg:pl-24 py-12 lg:py-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={containerVariants}
          >
            <motion.img
              src={donateImg}
              alt="Donate"
              className="w-full h-[500px] rounded-xl object-cover shadow-md"
              variants={fadeInLeft}
            />
          </motion.div>

          <motion.div
            className="w-full lg:w-3/5 items-center px-6 lg:px-24 py-8 lg:py-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={containerVariants}
          >
            <motion.p
              className="text-2xl font-semibold text-[#B71B1C] lg:mb-12"
              variants={itemVariant}
            >
              Why Donate?
            </motion.p>

            <motion.h2
              className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6"
              variants={itemVariant}
            >
              The Life You Save Could Be Someone You Love
            </motion.h2>

            <motion.p
              className="text-gray-600 mb-8"
              variants={itemVariant}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus
              venenatis elit nostra lacinia inceptos. Nascetur imperdiet
              pellentesque in eget; mauris luctus faucibus pellentesque. Feugiat
              netus viverra ex duis feugiat. Inceptos mus ullamcorper sit iaculis
              orci efficitur senectus.
            </motion.p>

            <motion.div
              className="border-t border-gray-200 pt-8"
              variants={itemVariant}
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={containerVariants}
              >
                <motion.div className="flex gap-4 items-start hover:bg-[#B71B1C] hover:text-white p-4 rounded-md" variants={itemVariant}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fff0f0] flex items-center justify-center">
                    <FaTint className="text-[#B71B1C] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-2xl">Your Blood, Their Second Chance</h4>
                    <p className="text-base mt-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </motion.div>

                <motion.div className="flex gap-4 items-start hover:bg-[#B71B1C] hover:text-white p-4 rounded-md" variants={itemVariant}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fff0f0] flex items-center justify-center">
                    <FaHeart className="text-[#B71B1C] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-2xl">Urgent Need, Every Day</h4>
                    <p className="text-base mt-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </motion.div>

                <motion.div className="flex gap-4 items-start hover:bg-[#B71B1C] hover:text-white p-4 rounded-md" variants={itemVariant}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fff0f0] flex items-center justify-center">
                    <FaUserAlt className="text-[#B71B1C] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-2xl">Save Lives in Minutes</h4>
                    <p className="text-base mt-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Donate;
