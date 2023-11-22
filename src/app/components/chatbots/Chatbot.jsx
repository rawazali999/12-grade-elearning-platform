"use client";
import React, { useEffect } from "react";

const ChatBot = () => {
  useEffect(() => {
    // ChatBot script
    window.__be = window.__be || {};
    window.__be.id = "655bd412c6c2390007fe9b86";
    (function () {
      var be = document.createElement("script");
      be.type = "text/javascript";
      be.async = true;
      be.src =
        ("https:" == document.location.protocol ? "https://" : "http://") +
        "cdn.chatbot.com/widget/plugin.js";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(be, s);
    })();
  }, []); // Empty dependency array ensures that the effect runs only once after the initial render

  return <>{/* Your React component content goes here */}</>;
};

export default ChatBot;
