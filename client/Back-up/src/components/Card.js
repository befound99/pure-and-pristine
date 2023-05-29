import React, { useState } from "react";
import { motion } from "framer-motion";

const Card = ({ title, imageUrl, description, openModal }) => {
  // State to manage read more/less functionality
  const [isReadMore, setIsReadMore] = useState(true);

  // Function to toggle read more/less
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <motion.div
      className="grid lg:grid-flow-row card bg30 text-white h-fit rounded-lg overflow-hidden min-h-[30vh] md:min-h-[680px] text-center   hover:cursor-pointer mb-4"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgb(5, 170, 179)" }}
      transition={{ duration: 0.1, type: "spring", stiffness: 150 }}
      onClick={() => openModal()}
    >
      {/* Card Image */}
      <img
        className="object-cover object-center h-full"
        src={imageUrl}
        alt={title}
      />
      <div className="flex flex-col gap-8 p-8">
        {/* Card Title */}
        <span className="text-[1.25rem] font-semibold">{title}</span>
        {/* Card Description */}
        <p className="text-base">
          {isReadMore ? description.slice(0, 150) : description}{" "}
          <span
            onClick={(e) => {
              e.stopPropagation();
              toggleReadMore();
            }}
            className="read-or-hide text10 hover:opacity-70 cursor-pointer"
          >
            {isReadMore ? "...read more" : "show less"}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default Card;
