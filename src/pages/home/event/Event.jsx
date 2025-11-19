import { Parallax } from "react-parallax";
import { motion } from "framer-motion";
import bgImg from "../../../assets/banner.jpg";
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

export default function Event() {
  return (
    <Parallax bgImage={bgImg} strength={400} bgImageStyle={{ objectFit: "cover" }}>
      <section className="relative h-[600px] flex items-center justify-center inset-0 bg-black/60">
        <div className="relative z-10 text-center text-white max-w-4xl px-4 mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Every drop matters! Join us at our next blood drive & Be a Lifesaver!
          </h2>

          <p className="text-base md:text-lg opacity-90 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Senectus id vel
            finibus commodo aenean. Egestas tortor fusce quam urna torquent luctus
            donec.
          </p>
          <MotionLink
            className="btn bg-[#d94949] hover:bg-[#B71B1C] text-white border-0 font-semibold px-6 py-3 rounded-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            as={Link}
            to='/event'
          >
            Find Donation Center
          </MotionLink>
        </div>
      </section>
    </Parallax>
  );
}