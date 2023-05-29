import React from "react";

const ModalServicesOverlay = ({ close, children, isOpen }) => {
  return (
    <div
      onClick={() => close()}
      className={`fixed inset-0 flex py-8 justify-center items-center transition-colors z-[2] 
      ${isOpen ? "visible backdrop-blur-sm bg-black/40" : "invisible"}`}
    >
      {children}
    </div>
  );
};

export default ModalServicesOverlay;
