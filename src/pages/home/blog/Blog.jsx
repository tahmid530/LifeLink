import { FaCalendarAlt, FaFolderOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import blogImg from "../../../assets/test.png"; // adjust path if needed

const posts = [
  {
    title: "How Often Can You Donate Blood? A Complete Guide",
    date: "February 24, 2025",
    category: "Uncategorized",
  },
  {
    title: "Who Can Donate Blood? Eligibility & Requirements Explained",
    date: "February 24, 2025",
    category: "Uncategorized",
  },
  {
    title: "Can Donating Blood Improve Your Health? Here’s What Science Says",
    date: "February 24, 2025",
    category: "Health & Benefits",
  },
];

export default function Blog() {
  return (
    <section className="max-w-[1440px] mx-auto py-20 bg-white">
      <div className="px-4 md:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-2xl font-semibold text-[#B71B1C] lg:mb-12">
            Latest Blog & Update
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stay Connected: News, Events & Blood Drive Updates
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo dignissim consequat 
            mi placerat libero. Magnis justo phasellus mi metus, sollicitudin pretium fermentum erat.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <img
                src={blogImg}
                alt={post.title}
                className="w-full h-64 object-cover"
              />

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 hover:text-red-500 transition-colors cursor-pointer">
                  {post.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center justify-between gap-5 text-gray-400 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt size={14} /> {post.date}
                  </div>
                  <div className="flex items-center  gap-1">
                    <FaFolderOpen size={14} /> {post.category}
                  </div>
                </div>

                {/* Text */}
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Lorem ipsum odor amet, consectetur adipiscing elit. Vivamus quis nibh
                  duis urna; tellus euismod fames…
                </p>

                {/* Read more */}
                <button className="text-red-500 font-medium flex items-center gap-1 group">
                  Read More
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
