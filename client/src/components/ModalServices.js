import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ModalServices = (props) => {
  const [selectedFloorArea, setSelectedFloorArea] = useState("1-40 sqm");
  const [floorAreaValue, setFloorAreaValue] = useState(0);
  const [currentSqmPrice, setCurrentSqmPrice] = useState(props.sqmPrice);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCurrentSqmPrice(props.sqmPrice + floorAreaValue * 100);
  }, [selectedFloorArea]);

  useEffect(() => {
    const calculateSubPrice = () => {
      const areaRanges = {
        "1-40 sqm": 0,
        "41-90 sqm": 1000,
        "91-140 sqm": 2000,
        "141-200 sqm": 3000,
        "201-300 sqm (per sqm)": 4000,
        "301 & above sqm (per sqm)": 5000,
      };

      return props.price + areaRanges[selectedFloorArea];
    };

    const subPrice = calculateSubPrice();
    const newTotalPrice = currentSqmPrice + subPrice;
    setTotalPrice(newTotalPrice);

    props.setBookingInfo((prevValues) => ({
      ...prevValues,
      totalPrice: newTotalPrice,
      service: props.title,
    }));
  }, [
    currentSqmPrice,
    selectedFloorArea,
    props.price,
    props.setBookingInfo,
    props.title,
  ]);

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

  const handleFloorAreaChange = (event) => {
    setSelectedFloorArea(event.target.value);
    inputHandler(event);
  };

  const handleFloorAreaValueChange = (event) => {
    const newValue = event.target.value;
    const parsedValue = parseInt(newValue, 10);

    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setFloorAreaValue(parsedValue);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    props.setBookingInfo((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const isSqmPriceBased =
    selectedFloorArea === "201-300 sqm (per sqm)" ||
    selectedFloorArea === "301 & above sqm (per sqm)";

  return (
    <>
      <div
        className={`container flex flex-col bg60 rounded-lg overflow-y-scroll max-h-full transition-all ease-out duration-700 ${
          props.isServiceModalOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="min-h-full">
          <div className="relative w-full h-[40vh]">
            <img
              className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 w-full h-full object-cover object-top"
              src={props.imageUrl}
              alt=""
            />
            <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent to-[#1b2a40]"></div>
            <XMarkIcon
              className="absolute top-1 right-1 h-8 w-8 hover:cursor-pointer"
              onClick={() => props.close()}
            />
          </div>

          <div className="flex flex-col p-8 gap-8 grow">
            <div className="grid lg:grid-flow-col gap-8">
              <div className="flex flex-col lg:justify-evenly">
                <div className="flex flex-col">
                  <p className="text-3xl">{props.title}</p>
                  <span className="price text-base">₱ {totalPrice}.00</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-base">
                    For floor areas 201 sqm and above, the price is per sqm.
                  </span>
                  <label htmlFor="floorArea">Floor Area</label>
                  <select
                    className="w-full bg60 text-xs border-[1px] rounded-lg h-8 px-4 focus:outline-none"
                    value={selectedFloorArea}
                    onChange={handleFloorAreaChange}
                    name="floorArea"
                  >
                    <option value="1-40 sqm">1-40 sqm</option>
                    <option value="41-90 sqm">41-90 sqm</option>
                    <option value="91-140 sqm">91-140 sqm</option>
                    <option value="141-200 sqm">141-200 sqm</option>
                    <option value="201-300 sqm (per sqm)">
                      201-300 sqm (per sqm)
                    </option>
                    <option value="301 & above sqm (per sqm)">
                      301 & above sqm (per sqm)
                    </option>
                  </select>
                  {isSqmPriceBased && (
                    <div className="flex items-center gap-2">
                      <div className="relative w-fit">
                        <input
                          className="w-50 bg60 text-xs border-[1px] rounded-lg h-8 px-4 focus:outline-none"
                          type="number"
                          name=""
                          id=""
                          value={floorAreaValue}
                          onChange={handleFloorAreaValueChange}
                        />
                        <span className="absolute bottom-1/2 translate-y-1/2 right-2 text-xs">
                          sqm
                        </span>
                      </div>
                      <span className="my-4">₱ {currentSqmPrice}.00</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 text-[whitesmoke] gap-y-4 gap-x-2">
                <input
                  type="text"
                  placeholder="House #, suite, etc."
                  className="col-span-1 focus:outline-none h-8 px-4 rounded-lg bg60 border-[1px]"
                  id=""
                  name="houseNo"
                  value={props.bookingInfo.houseNo}
                  onChange={inputHandler}
                />
                <input
                  type="text"
                  placeholder=" Village, Building etc."
                  className="col-span-1 focus:outline-none h-8 px-4 rounded-lg bg60 border-[1px]"
                  id=""
                  name="street"
                  value={props.bookingInfo.street}
                  onChange={inputHandler}
                />
                <input
                  type="text"
                  placeholder="Barangay"
                  className="col-span-2 focus:outline-none h-8 px-4 rounded-lg bg60 border-[1px]"
                  id=""
                  name="barangay"
                  value={props.bookingInfo.barangay}
                  onChange={inputHandler}
                />
                <input
                  type="text"
                  placeholder="Postal code"
                  className=" focus:outline-none h-8 px-4 rounded-lg bg60 border-[1px]"
                  id=""
                  name="postal"
                  value={props.bookingInfo.postal}
                  onChange={inputHandler}
                />
                <select
                  className=" focus:outline-none h-8 px-4 rounded-lg bg60 border-[1px] overflow-y-scroll"
                  value={props.bookingInfo.city}
                  defaultValue="City"
                  onChange={inputHandler}
                  name="city"
                >
                  <option disabled>City</option>
                  {citiesInLuzon.map((city) => (
                    <option key={city}>{city}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Phone"
                  className="col-span-2 focus:outline-none h-8 px-4 rounded-lg bg60 border-[1px]"
                  id=""
                  name="phone"
                  value={props.bookingInfo.phone}
                  onChange={inputHandler}
                />
              </div>
            </div>

            <button
              className="bg-transparent border-2 px-[10px] py-[5px] font-normal rounded transition-all border10 text10 box-glow"
              onClick={() => {
                if (!props.isLoggedIn) {
                  props.openLogin();
                  return;
                }
                if (
                  props.bookingInfo.houseNo === "" ||
                  props.bookingInfo.street === "" ||
                  props.bookingInfo.barangay === "" ||
                  props.bookingInfo.postal === "" ||
                  props.bookingInfo.city === "" ||
                  props.bookingInfo.phone === ""
                ) {
                  alert("Please fill in all the fields.");
                  return;
                } else {
                  props.openBookingModal();
                }
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalServices;
