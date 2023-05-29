import React from "react";

const ServicesCards = () => {
  return (
    <div>
      <div
        className="flex flex-col  items-center gap-8 md:h-[calc(100vh-80px)] w-full px-2"
        id="services"
      >
        <h1 className="text-1xl md:text-2xl font-semibold text10 mt-8">
          Our Services
        </h1>
        <div className="card-section grid md:grid-cols-2 gap-4 text-white max-w-7xl ">
          {/* Card 1 */}
          <div className="card-1 grid md:grid-flow-col bg30 h-fit rounded-lg overflow-hidden min-h-[30vh]">
            <img
              className="object-cover object-center h-full"
              src="https://images.pexels.com/photos/6195275/pexels-photo-6195275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Residential Cleaning"
            />
            <div className="p-2">
              <span className="text-1xl md:text-2xl font-semibold underline">
                Residential Cleaning
              </span>
              <p>
                {isReadMore1 ? service1Text.slice(0, 150) : service1Text}{" "}
                <span
                  onClick={toggleReadMore1}
                  className="read-or-hide text10 hover:opacity-70 cursor-pointer"
                >
                  {isReadMore1 ? "...read more" : " show less"}
                </span>
              </p>

              <br />
            </div>
          </div>
          {/* Card 2 */}
          <div className="card-2 grid md:grid-flow-col bg30 h-fit rounded-lg overflow-hidden">
            <img
              className="object-cover object-center h-full"
              src="https://images.pexels.com/photos/209230/pexels-photo-209230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Residential Cleaning"
            />
            <div>
              <span className="font-bold">Commercial Cleaning: </span>
              <p>{isReadMore2 ? service2Text.slice(0, 150) : service2Text}</p>
              <span onClick={toggleReadMore2} className="read-or-hide">
                {isReadMore2 ? "...read more" : " show less"}
              </span>
              <br />
              <button className="bg-transparent border-2 px-[10px] py-[5px] font-normal rounded transition-all border10 text10 box-glow">
                BUTTON
              </button>
            </div>
          </div>
          {/* Card 3 */}
          <div className="card-3 grid md:grid-flow-col bg30 h-fit rounded-lg overflow-hidden">
            <img
              className="object-cover object-center h-full"
              src="https://images.pexels.com/photos/6195288/pexels-photo-6195288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Residential Cleaning"
            />
            <div>
              <span className="font-bold">Deep Cleaning: </span>
              <p>{isReadMore3 ? service3Text.slice(0, 150) : service3Text}</p>
              <span onClick={toggleReadMore3} className="read-or-hide">
                {isReadMore3 ? "...read more" : " show less"}
              </span>
              <br />
              <button className="bg-transparent border-2 px-[10px] py-[5px] font-normal rounded transition-all border10 text10 box-glow">
                BUTTON
              </button>
            </div>
          </div>
          {/* Card 4 */}
          <div className="card-4 grid md:grid-flow-col bg30 h-fit rounded-lg overflow-hidden">
            <img
              className="object-cover object-center h-full"
              src="https://images.pexels.com/photos/6196229/pexels-photo-6196229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Residential Cleaning"
            />
            <div>
              <span className="font-bold">Move-In/Move-Out Cleaning: </span>
              <p>{isReadMore4 ? service4Text.slice(0, 150) : service4Text}</p>
              <span onClick={toggleReadMore4} className="read-or-hide">
                {isReadMore4 ? "...read more" : " show less"}
              </span>
              <br />
              <button className="bg-transparent border-2 px-[10px] py-[5px] font-normal rounded transition-all border10 text10 box-glow">
                BUTTON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesCards;
