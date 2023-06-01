import React, { useState } from "react";
import "../App.css";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

const Content = () => {
  return (
    <div className="container">
      <h2>
        <ReadMore>
          Deep Cleaning: Our deep cleaning service is designed to tackle those
          hard-to-reach and neglected areas in a property. We go beyond regular
          cleaning to eliminate dirt, grime, and bacteria. Our team will clean
          and sanitize areas such as baseboards, light fixtures, appliances,
          upholstery, and more, leaving the space refreshed and revitalized.
        </ReadMore>
      </h2>
    </div>
  );
};

export default Content;
