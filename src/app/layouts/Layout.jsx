import Navbar from "@components/Navbar";
import React from "react";

export const metadata = {
  title: "12 Grade E learning platform ",
  description: "12 Grade E learning platform ",
};

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
