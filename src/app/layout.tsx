import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar/Navbar";

import RegisterModal from "./_components/modals/RegisterModal";
import ToasterProvider from "./_providers/ToasterProvider";
import LoginModal from "./_components/modals/LoginModal";
import { get } from "http";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./_components/modals/RentModal";
import SearchModal from "./_components/modals/SearchModal";
import { Suspense } from "react";


const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <Suspense>
        <SearchModal/>
        </Suspense>
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div
          className="
        pb-20 pt-28
        "
        >
          
          {children}
          
        </div>
      </body>
    </html>
  );
}
