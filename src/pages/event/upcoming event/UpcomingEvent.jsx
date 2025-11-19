import { motion } from "framer-motion";
import { useRef } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaHeartbeat,
} from "react-icons/fa";

import event1 from "../../../assets/test.png";
import event2 from "../../../assets/Donor.jpg";
// import event3 from "../../../assets/test.png";
import sideImg from "../../../assets/react.svg";

export default function UpcomingEvents() {
  const sectionRef = useRef(null);

  const events = [
    {
      id: 1,
      title: "A Campus Blood Mission",
      date: "March 18, 2025",
      time: "09:00 AM - 5:30 PM",
      location: "Young School Hall",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
      image: event1,
    },
    {
      id: 2,
      title: "The Big Give - Citywide Blood Drive",
      date: "April 27, 2025",
      time: "06:30 AM - 3:00 PM",
      location: "Pure Life Hospital",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
      image: event2,
    },
    // {
    //   id: 3,
    //   title: "Hope in Every Drop Campaign",
    //   date: "May 15, 2025",
    //   time: "10:00 AM - 4:30 PM",
    //   location: "Sunrise Community Center",
    //   description:
    //     "Join us to make a real impact. Donate blood, save lives, and bring hope to those in need.",
    //   image: event3,
    // },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#fff8f8] py-16 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT — Dynamic Events */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <p className="text-2xl font-semibold text-[#B71B1C] lg:mb-6">
              Upcoming Events & Drives
            </p>
            <h2 className="text-4xl font-bold text-gray-900 leading-snug">
              Don't Miss Out! Upcoming Blood Donations Events
            </h2>
          </div>

          {/* Loop through events */}
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm border p-6 flex flex-col md:flex-row gap-6"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full md:w-1/3 h-[300px] rounded-lg object-cover"
              />

              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-red-500" /> {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-red-500" /> {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-red-500" /> {event.location}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mt-3">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT — Donation Card */}
        <motion.div
          className="relative h-[800px] rounded-xl overflow-hidden lg:my-auto lg:mt-10"
        >
          <img
            src={sideImg}
            alt="Donation"
            className="w-full h-full object-fill rounded-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="absolute inset-0 bg-black/70 text-white rounded-xl flex flex-col justify-center items-center text-center p-8"
          >
            <FaHeartbeat className="text-red-500 text-5xl mb-4" />
            <h3 className="text-2xl font-semibold mb-3 leading-snug">
              Take action now! Your donation could be the reason someone
              survives a medical emergency.
            </h3>
            <p className="text-gray-200 text-sm mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition">
              Start Donate
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}