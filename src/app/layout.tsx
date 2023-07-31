import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// import { Toaster } from "@/components/ui/toaster";
import toast, { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-CommerceApp",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* className={`px-10 ${inter.className}`} */}
      <body>
        <Navbar />
        <main className="p-12">{children}</main>
        <Footer />
        {/* <Toaster /> */}
        <Toaster />
      </body>
    </html>
  );
}
