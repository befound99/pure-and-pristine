import React from "react";
import { motion } from "framer-motion";
const About = () => {
  return (
    <motion.div
      className="bg30 mt-[80px]"
      id="aboutUs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* About Section */}
      <section className="py-10 max-w-7xl mx-auto">
        <div className="container mx-auto mb-6">
          {/* Main Container */}
          <motion.div
            className="bg60 mx-4 xl:mx-0 p-8 rounded-lg"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              About Pure & Pristine Inc.
            </h2>
            <p className="text-lg">
              At Pure & Pristine Inc., we are dedicated to delivering
              exceptional cleaning services that create a cleaner and healthier
              environment for our clients. With a team of skilled professionals,
              we provide unmatched expertise and tailored solutions for both
              residential and commercial spaces.
            </p>
          </motion.div>
        </div>
        <div className="container mx-auto">
          {/* Grid Container */}
          <div className="grid grid-cols-1 mx-4 xl:mx-0 md:grid-cols-2 gap-8">
            {/* First Grid Item */}
            <motion.div
              className="bg60 p-8 rounded-lg"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <img
                src="https://www.svgrepo.com/show/229355/diamond-ring-diamond.svg"
                className="h-20 w-20 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-4">Our Commitment</h3>
              <ul className="list-disc ml-6 marker:text-[#05aab3]">
                <li className="mb-2">
                  Excellence: We strive to exceed expectations and leave a
                  lasting impression.
                </li>
                <li className="mb-2">
                  Reliability: Our highly trained specialists ensure top-notch
                  results.
                </li>
                <li className="mb-2">
                  Customization: We offer personalized cleaning solutions for
                  diverse needs.
                </li>
              </ul>
            </motion.div>
            {/* Second Grid Item */}
            <motion.div
              className="bg60 p-8 rounded-lg"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <img
                src="https://www.svgrepo.com/show/484764/leaf.svg"
                className="h-20 w-20 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-4">
                Environmentally Conscious
              </h3>
              <ul className="list-disc ml-6 marker:text-[#05aab3]">
                <li className="mb-2">
                  Eco-friendly practices minimize our environmental footprint.
                </li>
                <li className="mb-2">
                  We use safe products and sustainable techniques.
                </li>
              </ul>
            </motion.div>
          </div>
          {/* Bottom Container */}
          <motion.div
            className="flex flex-col mt-8 bg60 mx-4 xl:mx-0 p-8 rounded-lg"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h3 className="text-xl font-semibold mb-4">
              Customer Satisfaction
            </h3>
            <p className="text-lg mb-4">
              Our priority is building strong, long-lasting relationships. We
              provide exceptional service and exceed expectations.
            </p>
            <p className="text-lg mb-4">
              Experience the Pure & Pristine Difference:
            </p>
            {/* <button className="bg10 box-glow transition-all text-white font-semibold py-2 px-4 rounded self-center">
              Contact Us
            </button> */}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
