import React from "react";
import Image from "next/image";
import Logo from "../../../public/images/a_z.png";
import Link from "next/link";

export default function Footer() {
  return (
    <section className="px-12 mt-20 md:px-24 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-0">
        <div className="grid gap-y-4 mr-20">
          <Image src={Logo} width={200} height={200} alt="Logo" />
          <p className="text-lg">
            Small, artisan label that offers a thoughtfully curated collection
            of high quality everyday essentials made.
          </p>
          <div className="flex">
            <Link target="_blank" href="https://www.facebook.com/saad.butt81">
              <div className="p-2 mr-4 rounded-xl bg-gray-200 hover:scale-105 duration-200">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 320 512"
                  className="text-black h-4 md:h-6 w-4 md:w-6"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                </svg>
              </div>
            </Link>
            <Link
              target="_blank"
              href="https://twitter.com/saad_butt27?t=5bMQrXGokb9zto9P3jZSGg&s=09"
            >
              <div className="p-2 mr-4 rounded-xl bg-gray-200 hover:scale-105 duration-200">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="text-black h-4 md:h-6 w-4 md:w-6"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                </svg>
              </div>
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/saad-butt-29853524a"
            >
              <div className="p-2 mr-4 rounded-xl bg-gray-200 hover:scale-105 duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-linkedin text-black h-4 md:h-6 w-4 md:w-6"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />{" "}
                </svg>
              </div>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-y-0">
          <ul className="space-y-3 text-lg">
            <h3 className="text-2xl font-bold">Company</h3>
            <li>
              <Link href={"/"}>About</Link>
            </li>
            <li>
              <Link href={"/"}>Terms of use</Link>
            </li>
            <li>
              <Link href={"/"}>Privacy policy</Link>
            </li>
            <li>
              <Link href={"/"}>How it works</Link>
            </li>
            <li>
              <Link href={"/"}>Contact us</Link>
            </li>
          </ul>
          <ul className="space-y-3 text-lg">
            <h3 className="text-2xl font-bold">Support</h3>
            <li>
              <Link href={"/"}>Support Center</Link>
            </li>
            <li>
              <Link href={"/"}>24hrs Service</Link>
            </li>
            <li>
              <Link href={"/"}>Quick Chat</Link>
            </li>
          </ul>
          <ul className="space-y-3 text-lg">
            <h3 className="text-2xl font-bold">Contact</h3>
            <li>
              <Link href={"/"}>Whatsapp</Link>
            </li>
            <li>
              <Link href={"/"}>Support 24hrs</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t-2 border-t-gray-400 mt-10 flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between px-0 py-4 md:p-4 text-lg">
        <h4>
          Copyright © 2023 <strong>A-Z STORE</strong>
        </h4>
        <h4>
          Design by. <strong>Saad's Designs</strong>
        </h4>
        <h4>
          Code by. <strong>saadbutt27 - github</strong>
        </h4>
      </div>
    </section>
  );
}
