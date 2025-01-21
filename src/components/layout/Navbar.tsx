"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/images/a_z.png";
import Link from "next/link";
import { useCart } from "@/components/context/CartContext";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { logoutUser, fetchSession } from "@/app/actions";
import toast from "react-hot-toast";

export default function Navbar({ cartItemsCount }: { cartItemsCount: number }) {
  const [toggleNav, setToggleNav] = useState(false); // make responsive navbar with hamburger menu
  const { name, setName } = useCart()
  const { cartCount, setCartCount } = useCart();
  const pathname = usePathname();

  const links = [
    { linkName: "Male", linkPath: "/MaleProducts" },
    { linkName: "Female", linkPath: "/FemaleProducts" },
    { linkName: "Kids", linkPath: "/KidsProducts" },
    { linkName: "All Products", linkPath: "/AllProducts" },
  ];

  useEffect(() => {
    setCartCount(cartItemsCount);
  }, [cartItemsCount]);

  const handleLinkClick = () => {
    setToggleNav(false); // Close the sidebar when a link is clicked
  };

  const handleLogout = async () => {
    // console.log("Logging out")
    const toastId = toast.loading("Logging out...");
    await logoutUser()
    setName("Login")
    toast.success("Logged out", {
      id: toastId,
  });
  };

  return (
    <header className="sticky top-0 bg-white py-4 px-8 md:px-24 w-full z-50 shadow-md">
      <nav className="flex items-center justify-between my-4 relative">
        <div>
          <Link href={"/"} onClick={handleLinkClick}>
            <Image src={Logo} width={200} height={200} alt="Logo" />
          </Link>
        </div>

        <button
          className={`block md:hidden ${toggleNav ? "hidden" : "block"}`}
          onClick={() => setToggleNav(!toggleNav)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        </button>

        {/* This one is for mobile view */}
        <div
          className={`md:hidden absolute w-full bg-white text-black flex flex-col mx-auto text-center gap-y-8 shadow-lg ${
            toggleNav ? " top-0 duration-300" : " -top-96 duration-300"
          }`}
        >
          <button onClick={() => setToggleNav(!toggleNav)} className="self-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div>
            <Link href={"/Cart"} onClick={handleLinkClick}>
              <button className="bg-gray-100 rounded-full p-2 relative">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="22"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                  {cartCount}
                </div>
              </button>
            </Link>
          </div>
          <div>
            <ul className="text-lg font-semibold">
              {links.map((link, index) => (
                <li key={index} className="mb-6">
                  <Link
                    onClick={handleLinkClick}
                    className={
                      pathname === link.linkPath
                        ? "text-blue-600"
                        : "text-black"
                    }
                    href={link.linkPath}
                  >
                    {link.linkName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* This one is for computer's view */}
        <div className="hidden md:block">
          <ul className="flex gap-x-10 text-lg font-semibold">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  onClick={handleLinkClick}
                  className={
                    pathname === link.linkPath ? "text-blue-600" : "text-black"
                  }
                  href={link.linkPath}
                >
                  {link.linkName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:gap-5 md:flex md:justify-start md:items-center">
          <Link href={"/Cart"} onClick={handleLinkClick}>
            <button className="bg-gray-100 rounded-full p-2 relative">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="22"
                width="22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
                  fill="currentColor"
                ></path>
              </svg>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                {cartCount}
              </div>
            </button>
          </Link>
          {name === 'Login' ? 
            <Link href={'/login'} className="flex flex-col justify-center items-center">
              <button className="flex items-center gap-x-2 bg-gray-100 rounded-lg p-2 relative">
                <p className="text-lg font-semibold">{name}</p>
              </button>
            </Link>
          : 
            <ul className="relative flex space-x-8 sm:space-x-12 text-lg font-medium text-gray-800">
              <li className="group relative cursor-pointer select-none">
                <div className="flex gap-x-1 items-center">
                  <p className="text-lg font-semibold">{name}</p>
                  <ChevronDown className="w-4 h-4 mt-1" />
                </div>
                <div className="sm:min-w-0 absolute right-0">
                  <ul
                    className="flex flex-col group-hover:max-h-max group-hover:py-2 max-h-0 w-24 overflow-hidden 
                      duration-500 bg-slate-50 text-xs sm:text-base font-normal rounded-md
                      group-hover:shadow-md px-1 group-hover:border border-transparent group-hover:border-slate-200 cursor-pointer"
                  >
                      <li className="p-1 shrink-0 duration-200">
                        <button onClick={handleLogout} type="button">Logout</button>
                      </li>
                  </ul>
                </div>
              </li>
            </ul>
          }
        </div>
      </nav>
    </header>
  );
}
