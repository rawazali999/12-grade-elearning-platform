import React from "react";

export default function Collapse({ title, content }) {
  return (
    <div
      tabIndex={0}
      className="collapse  collapse-arrow  w-2/3  border-2"
    >
      <div className="text-md collapse-title text-right font-medium  sm:text-xl">
        {title}
      </div>
      <div className="collapse-content text-right">
        <p>{content}</p>
      </div>
    </div>
  );
}
