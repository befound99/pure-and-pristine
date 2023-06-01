import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <motion.div
      className=" heroImage flex justify-center items-center  text-white h-[calc(100vh-80px)] mt-[80px] box-shadow bg-cover bg-center  snap-start snap-always "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex flex-col items-center w-fit px-1 lg:px-0 lg:pl-8">
        {/* Hero title */}
        <motion.h1
          className="monserrat text-[clamp(1.75rem,5vw,4rem)] font-thin text-center uppercase tracking-tighter"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.25 }}
        >
          Experience the Ultimate Cleanliness
        </motion.h1>
        {/* Hero subtitle */}
        <motion.p
          className="monserrat text-base text-center  sm:text-2xl lg:text-3xl w-full "
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.25 }}
        >
          Unleash the Refreshing Power of Clean
        </motion.p>
        {/* CTA button */}
        <Link to="/services">
          <motion.a
            className=" flex justify-center items-center backdrop-blur-sm backdrop-brightness-75 border-2 font-normal px-[10px] py-[5px]  md:px-[20px] md:py-[10px] rounded-lg  border10 text10 mt-8 w-fit"
            href="#services"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 1, opacity: 1 }}
            whileHover={{
              boxShadow: "0 0 25px rgb(5, 170, 179)",
              backgroundColor: "#05aab3",
              color: "whitesmoke",
            }}
            transition={{
              duration: 0.5,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
            }}
          >
            <span className=" text-xs sm:text-sm md:text-base lg:text-xl font-medium">
              Explore Our Services
            </span>
            <i className="fa-solid fa-arrow-up-right-from-square ml-2 text-[12px] sm:text-sm md:text-base lg:text-xl"></i>
          </motion.a>
        </Link>
      </div>
    </motion.div>
  );
};

export default Hero;
