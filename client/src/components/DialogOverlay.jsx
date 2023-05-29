import React from "react";

const DialogOverlay = (props) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        props.close();
      }}
      className={` fixed inset-0 flex justify-center w-screen h-screen items-center transition-colors z-30 
      ${props.isOpen ? "visible backdrop-blur-sm bg-black/40" : "invisible"}`}
    >
      {props.children}
    </div>
  );
};

export default DialogOverlay;
