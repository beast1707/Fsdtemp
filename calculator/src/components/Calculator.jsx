import React, { useState } from "react";
import Button from "./Button.jsx";
import Display from "./Display.jsx";
function Calculator() {
  const [input, setInput] = useState("");
  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };
  const clearInput = () => {
    setInput("");
  };
  const calculateResult = () => {
    try {
      const result = eval(input);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };
  return (
    <div className="calculator">
      <Display value={input} />
      <div className="buttons">
        <Button label="7" onClick={handleClick} />
        <Button label="8" onClick={handleClick} />
        <Button label="9" onClick={handleClick} />
        <Button label="/" onClick={handleClick} />

        <Button label="4" onClick={handleClick} />
        <Button label="5" onClick={handleClick} />
        <Button label="6" onClick={handleClick} />
        <Button label="*" onClick={handleClick} />

        <Button label="1" onClick={handleClick} />
        <Button label="2" onClick={handleClick} />
        <Button label="3" onClick={handleClick} />
        <Button label="-" onClick={handleClick} />

        <Button label="0" onClick={handleClick} />
        <Button label="." onClick={handleClick} />
        <Button label="=" onClick={calculateResult} />
        <Button label="+" onClick={handleClick} />

        <Button label="C" onClick={clearInput} />
      </div>
    </div>
  );
}
export default Calculator;