// Tabs.js
"use client";
import React, { useState } from "react";

const Tabs = ({ tab1, tab2,tab3 }) => {
  const tabs = [
    { id: 1, label: "Subjects", content: tab1 },
    { id: 2, label: "Common Questions", content: tab2 },
      { id: 3, label: "Guidance and Motivation", content: tab3 },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-center ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`mr-2 cursor-pointer border-cyan-800  p-2 dark:border-white ${
              tab.id === activeTab.id ? "border-b-2" : ""
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <div className="rounded-lg  p-4 shadow-lg">{activeTab.content}</div>
      </div>
    </div>
  );
};

export default Tabs;
