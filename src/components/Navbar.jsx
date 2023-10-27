import React, { useState, useEffect } from "react";
import FiverrLogo from "./FiverrLogo";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Image from "next/image";

function Navbar() {
  const router = useRouter();
  const [navFixed, setNavFixed] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [isLoaded, setIsLoaded] = useState(true); // Set to true to always render the design

  const links = [
    { linkName: "Fiverr Business", handler: "#", type: "link" },
    { linkName: "Explore", handler: "#", type: "link" },
    { linkName: "English", handler: "#", type: "link" },
    { linkName: "Become a Seller", handler: "#", type: "link" },
    { linkName: "Sign in", handler: null, type: "button" },
    { linkName: "Join", handler: null, type: "button2" },
  ];

  useEffect(() => {
    if (router.pathname === "/") {
      const positionNavbar = () => {
        window.pageYOffset > 0 ? setNavFixed(true) : setNavFixed(false);
      };
      window.addEventListener("scroll", positionNavbar);
      return () => window.removeEventListener("scroll", positionNavbar);
    } else {
      setNavFixed(true);
    }
  }, [router.pathname]);

  return (
    <>
      {isLoaded && (
        <nav
          className={`w-full px-24 flex justify-between items-center py-6  top-0 z-30 transition-all duration-300 ${
            navFixed
              ? "fixed bg-white border-b border-gray-200"
              : "absolute bg-transparent border-transparent"
          }`}
        >
          <div>
            <Link href="/">
              <FiverrLogo fillColor={!navFixed ? "#ffffff" : "#404145"} />
            </Link>
          </div>
          <div className={`flex ${navFixed ? "opacity-100" : "opacity-0"}`}>
            <input
              type="text"
              placeholder="What service are you looking for today?"
              className="w-[30rem] py-2.5 px-4 border"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button
              className="bg-gray-900 py-1.5 text-white w-16 flex justify-center items-center"
              onClick={() => {
                setSearchData("");
                router.push(`/search?q=${searchData}`);
              }}
            >
              <IoSearchOutline className="fill-white text-white h-6 w-6" />
            </button>
          </div>
          <ul className="flex gap-10 items-center">
            {links.map(({ linkName, handler, type }) => (
              <li
                key={linkName}
                className={`${
                  navFixed ? "text-black" : "text-white"
                } font-medium`}
              >
                {type === "link" && <Link href={handler}>{linkName}</Link>}
                {type === "button" && <button>{linkName}</button>}
                {type === "button2" && (
                  <button
                    className={`border text-md font-semibold py-1 px-3 rounded-sm ${
                      navFixed
                        ? "border-[#1DBF73] text-[#1DBF73]"
                        : "border-white text-white"
                    } hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-500`}
                  >
                    {linkName}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navbar;
