import React from "react";

const Reviews = ({ children }) => {
  return (
    <div className="relative bg30 hidden sm:flex flex-col h-fit pt-8 snap-start snap-always w-full ">
      <h1 className="text-3xl mx-auto font-bold">Reviews</h1>
      <div className="flex flex-wrap w-fit mx-auto">{children}</div>
    </div>
  );
};

export default Reviews;
