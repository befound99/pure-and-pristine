import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors z-[2] ${
        isOpen ? "visible backdrop-blur-sm bg-black/40" : "invisible"
      }`}
    >
      {children}
    </div>
  );
};

export default Modal;
