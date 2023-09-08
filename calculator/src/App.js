import React, { useState } from "react";

import Wrapper from "./Wrapper"
import Screen from "./Screen";
import ButtonBox from "./ButtonBox";
import Button from "./Button";

//values of the buttons on the calculator
const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];


// Take a number, format it into the string format and create the space separators for the thousand mark
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");


 // Change above function and revert from string to number  
const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const math = (a, b, sign) =>
  sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : a / b;

const zeroDivisionError = "Can't divide with 0";

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  // function to deal with event when number is clicked
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };


  // function to deal with event where a comma is clicked i.e. thousand values 
  const comaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };


  // function to deal with event where sign is clicked
  const signClickHandler = (e) => {
    setCalc({
      ...calc,
      sign: e.target.innerHTML,
      res: !calc.num
        ? calc.res
        : !calc.res
        ? calc.num
        : toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign
            )
          ),
      num: 0,
    });
  };


  // function to deal with event when user requests results 
  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? zeroDivisionError
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  // Event handler to provide inverse of value 
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };


  // Event handler for percentage value 
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  // Event handler for resetting calculator 
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  // Menu for button click handler 
  const buttonClickHandler = (e, btn) => {
    btn === "C" || calc.res === zeroDivisionError
    ? resetClickHandler()
    : btn === "+-"
    ? invertClickHandler()
    : btn === "%"
    ? percentClickHandler()
    : btn === "="
    ? equalsClickHandler()
    : btn === "/" || btn === "X" || btn === "-" || btn === "+"
    ? signClickHandler(e)
    : btn === "."
    ? comaClickHandler(e)
    : numClickHandler(e)
  }

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={(e) => buttonClickHandler(e, btn)}
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;