import React from "react";

const SignupOverlay = ({ closeSignUp, children, isOpen }) => {
  return (
    <div
      onClick={closeSignUp}
      className={`fixed inset-0 flex justify-center items-center transition-colors z-[2] ${
        isOpen ? "visible backdrop-blur-sm bg-black/40" : "invisible"
      }`}
    >
      {children}
    </div>
  );
};

export default SignupOverlay;
