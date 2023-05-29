import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
const Dialog = (props) => {
  return (
    <div
      className={`relative flex flex-col bg60 rounded-lg min-h-[300px] w-[500px] transition-all p-8 ${
        props.isOpen
          ? "visible translate-y-1-0 opacity-100"
          : "invisible translate-y-full opacity-0"
      }`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <XMarkIcon
        className="absolute top-1 right-1 w-8 h-8 hover:cursor-pointer"
        onClick={props.close}
      />
      <div className="">
        <h1 className="uppercase text-3xl">{props.dialogContent.header}</h1>
      </div>
      <div className="grow flex justify-center items-center">
        <p
          className={`uppercase text-2xl ${
            props.dialogContent.success ? "text-green-400" : "text-red-400"
          }`}
        >
          {props.dialogContent.message}
        </p>
        {props.dialogContent.success && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 ml-2 text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        {!props.dialogContent.success && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 ml-2 text-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Dialog;
