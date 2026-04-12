import React from "react";

function Button({ label, onClick }) {
  return (
    <button onClick={() => onClick(label)}>
      {label}
    </button>
  );
}

export default Button;