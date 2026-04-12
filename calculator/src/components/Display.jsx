import React from "react";

function Display({ value }) {
  return (
    <div className="display">
      {value || "0"}
    </div>
  );
}

export default Display;