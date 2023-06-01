import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ModalServices = ({ title, imageUrl, close, price }) => {
  const [selectedFloorArea, setSelectedFloorArea] = useState("1-40 sqm");
  const [totalPrice, setTotalPrice] = useState(price);

  const handleFloorAreaChange = (event) => {
    const selectedArea = event.target.value;
    setSelectedFloorArea(selectedArea);
    if (selectedArea === "1-40 sqm") {
      setTotalPrice(price);
    } else if (selectedArea === "41-90 sqm") {
      setTotalPrice(price + 1000);
    } else if (selectedArea === "91-140 sqm") {
      setTotalPrice(price + 2000);
    } else if (selectedArea === "141-200 sqm") {
      setTotalPrice(price + 3000);
    } else if (selectedArea === "201-300 sqm (per sqm)") {
      setTotalPrice(price + 4000);
    } else if (selectedArea === "301 & above sqm (per sqm)") {
      setTotalPrice(price + 5000);
    }
  };

  const citiesInLuzon = [
    "Manila",
    "Quezon City",
    "Caloocan",
    "Taguig",
    "Makati",
    "Pasig",
    "Pasay",
    "Mandaluyong",
    "Marikina",
    // Add more cities as needed
  ];

  return (
    <div
      className="container h-full flex flex-col  bg60 rounded-lg overflow-y-scroll"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="min-h-full">
        <div className={`relative w-full h-[40vh]  `}>
          <img
            className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 w-full h-full object-cover object-top"
            src={imageUrl}
          />
          <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent to-[#1b2a40]"></div>
          <XMarkIcon
            className="absolute top-1 right-1 h-8 w-8 hover:cursor-pointer"
            onClick={close}
          />
        </div>

        <div className="flex flex-col p-8 gap-8 grow">
          <div className="grid lg:grid-flow-col gap-8">
            <div className="flex flex-col lg:justify-evenly">
              <div className="flex flex-col">
                <p className="text-3xl">{title}</p>
                <span className="price text-base">₱ {totalPrice}.00</span>
              </div>

              <div className="flex flex-col ">
                <span className="text-base">
                  For floor areas 201 sqm and above, the price is per sqm.
                </span>
                <label htmlFor="floorArea">Floor Area</label>
                <select
                  className="w-full bg60 text-xs border-[1px] rounded-lg h-8 px-4 focus:outline-none"
                  value={selectedFloorArea}
                  onChange={handleFloorAreaChange}
                >
                  <option>
                    <span>1-40 sqm</span>
                  </option>
                  <option>
                    <span>41-90 sqm</span>
                  </option>
                  <option>
                    <span>91-140 sqm</span>
                  </option>
                  <option>
                    <span>141-200 sqm</span>
                  </option>
                  <option>
                    <span>201-300 sqm (per sqm)</span>
                  </option>
                  <option>
                    <span>301 & above sqm (per sqm)</span>
                  </option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2  text-[whitesmoke] gap-y-4 gap-x-2 ">
              {/* <input
                type="text"
                placeholder="First name"
                className=" focus:outline-none h-8 px-4 rounded-lg bg60 border-[1px]"
                id=""
              />
              <input
                type="text"
                placeholder="Last name"
                className=" focus:outline-none h-8 px-4 rounded-lg bg60 border-[1px]"
                id=""
              /> */}
              <input
                type="text"
                placeholder="Address"
                className="col-span-2 focus:outline-none h-8 px-4 rounded-lg bg60 border-[1px]"
                id=""
              />
              <input
                type="text"
                placeholder="Appartment, suite, etc.(optional)"
                className="col-span-2 focus:outline-none h-8 px-4 rounded-lg bg60 border-[1px]"
                id=""
              />
              <input
                type="text"
                placeholder="Postal code"
                className=" focus:outline-none h-8 px-4 rounded-lg bg60 border-[1px]"
                id=""
              />
              <select className=" focus:outline-none h-8 px-4 rounded-lg bg60 border-[1px] overflow-y-scroll">
                {citiesInLuzon.map((city) => {
                  return <option>{city}</option>;
                })}
              </select>
              <input
                type="text"
                placeholder="Phone"
                className="col-span-2 focus:outline-none h-8 px-4 rounded-lg bg60 border-[1px]"
                id=""
              />
            </div>
          </div>

          <button className="bg-transparent border-2 px-[10px] py-[5px] font-normal rounded-lg transition-all border10 text10 box-glow">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalServices;
