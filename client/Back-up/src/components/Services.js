import React from "react";

const Services = ({ children }) => {
  return (
    <div className=" mx-auto min-h-[calc(100vh-80px)]  flex justify-center ">
      <div
        className="container  mx-4 xl:mx-0 snap-start snap-always flex flex-col  "
        id="services"
      >
        <h1 className="my-8 text-3xl mx-auto font-bold">Our Services</h1>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-x-4 max-w-7xl mx-auto ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Services;
