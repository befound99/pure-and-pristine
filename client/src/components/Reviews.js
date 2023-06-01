import React from "react";

const Reviews = ({ children }) => {
  return (
    <div className="relative bg30 hidden sm:flex flex-col   py-8 snap-start snap-always w-full h-[calc(50vh-80px)]">
      <h1 className="text-3xl mx-auto font-bold">Reviews</h1>
      <div className="flex flex-wrap w-fit mx-auto grow items-center">
        {children}
      </div>
    </div>
  );
};

export default Reviews;
