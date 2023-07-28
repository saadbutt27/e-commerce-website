"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../../public/Logo.webp";
import Link from "next/link";

export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(false); // make responsive navbar with hamburger menu
  return (
    <header className="sticky top-0 bg-white py-4 px-12 w-full z-50 shadow-md">
      <nav className="flex items-center justify-between my-4 relative">
        <div>
          <Image src={Logo} width={200} height={200} alt="Logo" />
        </div>

        <button
          className={`block lg:hidden ${toggleNav ? "hidden" : "block"}`}
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
          className={`absolute w-full bg-white text-black flex flex-col mx-auto text-center gap-y-8 shadow-lg ${
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
                0
              </div>
            </button>
          </div>
          <div>
            <ul className="text-lg font-semibold">
              <li className="mb-6">
                <Link href={"/MaleProducts"}>Male</Link>
              </li>
              <li className="mb-6">
                <Link href={"/FemaleProducts"}>Female</Link>
              </li>
              <li className="mb-6">
                <Link href={"/KidsProducts"}>Kids</Link>
              </li>
              <li className="mb-6">
                <Link href={"/AllProducts"}>All Products</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* This one is for mobile view */}
        <div className="hidden lg:block">
          <ul className="flex gap-x-10 text-lg font-semibold">
            <li>
              <Link href={"/MaleProducts"}>Male</Link>
            </li>
            <li>
              <Link href={"/FemaleProducts"}>Female</Link>
            </li>
            <li>
              <Link href={"/KidsProducts"}>Kids</Link>
            </li>
            <li>
              <Link href={"/AllProducts"}>All Products</Link>
            </li>
          </ul>
        </div>
        {/* <div className="hidden lg:block relative mt-3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1.1"
              id="search"
              x="0px"
              y="0px"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M20.031,20.79c0.46,0.46,1.17-0.25,0.71-0.7l-3.75-3.76c1.27-1.41,2.04-3.27,2.04-5.31
		c0-4.39-3.57-7.96-7.96-7.96s-7.96,3.57-7.96,7.96c0,4.39,3.57,7.96,7.96,7.96c1.98,0,3.81-0.73,5.21-1.94L20.031,20.79z
		 M4.11,11.02c0-3.84,3.13-6.96,6.96-6.96c3.84,0,6.96,3.12,6.96,6.96c0,3.84-3.12,6.96-6.96,6.96C7.24,17.98,4.11,14.86,4.11,11.02
		z"
                ></path>
              </g>
            </svg>{" "}
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What are you looking for?"
          />
        </div> */}
        <div className="hidden lg:block">
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
              0
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
}
