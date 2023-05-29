import React from "react";

const Modal = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors z-[2] ${
        open ? "visible backdrop-blur-sm bg-black/40" : "invisible"
      }`}
    >
      {children}
    </div>
  );
};

export default Modal;
