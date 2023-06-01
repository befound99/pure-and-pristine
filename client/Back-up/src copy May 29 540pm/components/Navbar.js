import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import PurPri from "../components/images/PurPri.png";
import { Link } from "react-router-dom";

export default function Navbar({ onOpen, isLoggedIn, logout, loggedInUser }) {
  const navigation = [
    { name: "Home", href: "#", current: true, to: "/" },
    { name: "Services", href: "#services", current: false },
    { name: "About us", href: "#aboutUs", current: false },
    { name: "Contact", href: "#contactUs", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      {/* Navbar */}
      <Disclosure as="nav" className=" bg60 sitenav fixed top-0 w-full z-[1]">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    {/* Logo */}
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src={PurPri}
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {/* Navigation links */}
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          to={item.to}
                          className={classNames(
                            item.current ? "bg60 " : "  hover:text-white",
                            "rounded-md px-3 py-2 text-xs md:text-base font-medium text-gray-300 box-glow transition-all hover:-translate-y-1 hover:scale-110 focus:scale-110 focus:outline-none"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Signup button */}
                  {isLoggedIn && (
                    <Link
                      to="/booking"
                      className="text-white text-base font-medium transition-all underline"
                    >
                      Hi, {loggedInUser}!
                    </Link>
                  )}

                  {!isLoggedIn && (
                    <a
                      className="rounded-full  hover:scale-110 focus:scale-110 focus:outline-none transition-all box-glow "
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpen();
                      }}
                      to="/"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8 "
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  )}
                  {isLoggedIn && (
                    <Link
                      className="logout ml-4"
                      onClick={() => {
                        logout();
                      }}
                      to="/"
                    >
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <title>ionicons-v5-o</title>
                          <path
                            d="M304,336v40a40,40,0,0,1-40,40H104a40,40,0,0,1-40-40V136a40,40,0,0,1,40-40H256c22.09,0,48,17.91,48,40v40"
                            style={{
                              fill: "none",
                              stroke: "#D1D5DB",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "32px",
                            }}
                          ></path>
                          <polyline
                            points="368 336 448 256 368 176"
                            style={{
                              fill: "none",
                              stroke: "#D1D5DB",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "32px",
                            }}
                          ></polyline>
                          <line
                            x1="176"
                            y1="256"
                            x2="432"
                            y2="256"
                            style={{
                              fill: "none",
                              stroke: "#D1D5DB",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "32px",
                            }}
                          ></line>
                        </g>
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {/* Mobile navigation links */}
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
