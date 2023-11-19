"use client";
import React from "react";
import { ThemeContext } from "./themeContext";
import { useContext } from "react";
import { BsMoonStars } from "react-icons/bs";
import { IoSunny } from "react-icons/io5";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      {theme === "dark" ? (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className=" mx-1  cursor-pointer  text-white  shadow-none"
        >
          <IoSunny className="text-2xl font-bold" />
        </button>
      ) : (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mx-1 cursor-pointer   text-white  outline-none"
          
        >
          <BsMoonStars className="text-lg" />
        </button>
      )}
    </>
  );
};

export default ThemeToggle;
