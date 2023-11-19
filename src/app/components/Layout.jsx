import Navbar from "@components/Navbar";
import React from "react";
import Footer from "@components/Footer";

export default function Layout({ children }) {
  return (
    <div className="font-sans">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
