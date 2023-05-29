import React, { useState } from "react";

const EmailValidator = () => {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setValid(pattern.test(email));
  };

  return (
    <div>
      <input type="email" value={email} onChange={handleEmailChange} />
      <button onClick={validateEmail}>Validate</button>
      {valid ? <p>Valid email address</p> : <p>Invalid email address</p>}
    </div>
  );
};

export default EmailValidator;
