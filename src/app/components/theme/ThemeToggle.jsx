"use client";
import React from "react";
import { ThemeContext } from "./themeContext";
import { useContext } from "react";
import { BsMoonStars } from "react-icons/bs";
import { ImSun } from "react-icons/im";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      {theme === "dark" ? (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className=" mx-1  cursor-pointer  text-white  shadow-none"
        >
          <ImSun className="text-lg" />
        </button>
      ) : (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mx-1 cursor-pointer   text-white  outline-none"
          area-label="moon"
        >
          <BsMoonStars className="text-lg" />
        </button>
      )}
    </>
  );
};

export default ThemeToggle;
