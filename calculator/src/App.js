import logo from './logo.svg';
import './App.css';
import Wrapper from './Wrapper';
import Screen from './Screen';
import ButtonBox from './ButtonBox';
import Button from './Button';
import React, { useState } from 'react';


const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
]

const App = () => {

  // Set the state for sign, num and result
  let [calc, setCalc] = useState({
    sign: "",
    num:0,
    res:0,
  });

    // Create function to handle where number is clicked 
    const numClickHandler = (e) => {
      e.preventDefault();
      const value = e.target.innerHTML;
  
      if (calc.num.length < 16) {
        setCalc({
          ...calc,
          num:
            calc.num === 0 && value === "0"
            ? "0"
            : calc.num % 1 === 0
            ? Number(calc.num + value)
            : calc.num + value,
            res: !calc.sign ? 0 : calc.res,
        });
      }
    };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
