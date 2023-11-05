import React from "react";

export default function Collapse({ title, content }) {
  return (
    <div
      tabIndex={0}
      className="collapse-arrow  collapse  w-2/3  border-2 text-slate-900 dark:text-slate-50 "
    >
      <div className="collapse-title text-right text-xl  font-medium">
        {title}
      </div>
      <div className="collapse-content text-right">
        <p>{content}</p>
      </div>
    </div>
  );
}
