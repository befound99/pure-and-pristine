import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const TestimonialCarousel = ({ testimonials }) => {
  // Define a functional component named TestimonialCarousel that accepts testimonials as a prop

  return (
    <div className="max-w-lg mx-auto my-8 relative">
      {/* Render a carousel component */}
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        transitionTime={500}
        stopOnHover={true}
        showArrows={testimonials.length > 1}
        showIndicators={testimonials.length > 1}
        swipeable={testimonials.length > 1}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              className="carousel-arrow carousel-arrow-prev invisible"
              onClick={onClickHandler}
              title={label}
            >
              &#8249;
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              className="carousel-arrow carousel-arrow-next invisible"
              onClick={onClickHandler}
              title={label}
            >
              &#8250;
            </button>
          )
        }
      >
        {/* Render testimonials */}
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="flex">
            {/* Display testimonial image, name, and rating */}
            <div className="flex justify-end items-center basis-1/2">
              <div className="w-fit h-fit">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full object-cover object-center"
                />
                <p className="text-sm mt-4 text-center text-white font-bold">
                  {testimonial.name}
                </p>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-yellow-400 ${
                        star <= 5 ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Render a vertical divider */}
            <div className="w-[2px] bg-white/5 mx-[1rem]"></div>

            {/* Display testimonial text */}
            <div className="flex items-center basis-1/2">
              <div className="flex h-full  w-4/5">
                <p className="text-xs text-start text-white max-h-full overflow-y-scroll my-auto">
                  {testimonial.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;
