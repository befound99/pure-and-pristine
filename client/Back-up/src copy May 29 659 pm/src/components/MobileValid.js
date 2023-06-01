import React, { useState } from "react";

const MobileNumberValidator = () => {
  const [number, setNumber] = useState("");
  const [valid, setValid] = useState(false);

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const validateNumber = () => {
    const digitOnlyNumber = number.replace(/\D/g, ""); // Remove non-digit characters
    setValid(digitOnlyNumber.length === 11);
  };

  return (
    <div>
      <input
        type="tel"
        pattern="[0-9]{11}"
        value={number}
        onChange={handleNumberChange}
      />
      <button onClick={validateNumber}>Validate</button>
      {valid ? <p>Valid mobile number</p> : <p>Invalid mobile number</p>}
    </div>
  );
};

export default MobileNumberValidator;
