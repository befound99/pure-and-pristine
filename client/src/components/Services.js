import React from "react";
import { motion } from "framer-motion";

const Services = ({ children }) => {
  return (
    <motion.div
      className=" mx-auto min-h-[calc(100vh-80px)]  flex justify-center mt-[80px] mb-[200px]"
      id="services"
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="container mx-4 xl:mx-0 snap-start snap-always flex flex-col  ">
        <h1 className="my-4 text-3xl mx-auto font-bold">Our Services</h1>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-x-4 max-w-7xl mx-auto ">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
