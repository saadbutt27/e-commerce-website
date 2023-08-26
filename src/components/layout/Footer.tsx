import React from "react";
import Image from "next/image";
import Logo from "../../../public/images/a_z.png";
import Link from "next/link";
import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <section className="px-8 mt-20 md:px-24">
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
                <Facebook />
              </div>
            </Link>
            <Link
              target="_blank"
              href="https://instagram.com/saadbutt207?igshid=ZDdkNTZiNTM="
            >
              <div className="p-2 mr-4 rounded-xl bg-gray-200 hover:scale-105 duration-200">
                <Instagram />
              </div>
            </Link>
            <Link
              target="_blank"
              href="https://twitter.com/saad_butt27?t=5bMQrXGokb9zto9P3jZSGg&s=09"
            >
              <div className="p-2 mr-4 rounded-xl bg-gray-200 hover:scale-105 duration-200">
                <Twitter className="bg-blue" />
              </div>
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/saad-butt-29853524a"
            >
              <div className="p-2 mr-4 rounded-xl bg-gray-200 hover:scale-105 duration-200">
                <Linkedin />
              </div>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-y-0">
          <ul className="space-y-3 text-lg">
            <h3 className="text-2xl font-bold">Company</h3>
            <li>
              <Link href={"#"}>About</Link>
            </li>
            <li>
              <Link href={"#"}>Terms of use</Link>
            </li>
            <li>
              <Link href={"#"}>Privacy policy</Link>
            </li>
            <li>
              <Link href={"#"}>How it works</Link>
            </li>
            <li>
              <Link href={"#"}>Contact us</Link>
            </li>
          </ul>
          <ul className="space-y-3 text-lg">
            <h3 className="text-2xl font-bold">Support</h3>
            <li>
              <Link href={"#"}>Support Center</Link>
            </li>
            <li>
              <Link href={"#"}>24hrs Service</Link>
            </li>
            <li>
              <Link href={"#"}>Quick Chat</Link>
            </li>
          </ul>
          <ul className="space-y-3 text-lg">
            <h3 className="text-2xl font-bold">Contact</h3>
            <li>
              <Link href={"#"}>Whatsapp</Link>
            </li>
            <li>
              <Link href={"#"}>Support 24hrs</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t-2 border-t-gray-400 mt-10 flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between px-0 py-4 md:p-4 text-lg">
        <h4>
          Copyright © 2023 <strong>A-Z STORE</strong>
        </h4>
        <h4>
          Design by. <strong>Saad&apos;s Designs</strong>
        </h4>
        <h4>
          Code by.{" "}
          <strong>
            <Link
              className="hover:underline duration-300"
              href="https://github.com/saadbutt27/e-commerce-website"
            >
              saadbutt27
            </Link>{" "}
            - github
          </strong>
        </h4>
      </div>
    </section>
  );
}
