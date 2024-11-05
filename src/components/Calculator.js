// src/components/Calculator.js
import React, { useState, useEffect } from 'react';
import { create, all } from 'mathjs';
import Button from './Button';
import Display from './Display';
import './Calculator.css';

const math = create(all);

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        const res = math.evaluate(input);
        setResult(res);
        setHistory([...history, { input, result: res }]);
        setInput('');
      } catch (err) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '√') {
      setInput(`sqrt(${input})`);
    } else if (value === '^') {
      setInput(`${input}^`);
    } else if (value === '%') {
      setInput(`${input}/100`);
    } else {
      setInput(input + value);
    }
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (/[0-9+\-*/.^%=()]/.test(key)) {
      handleButtonClick(key);
    } else if (key === 'Enter') {
      handleButtonClick('=');
    } else if (key === 'Backspace') {
      setInput(input.slice(0, -1));
    } else if (key === 'Escape') {
      handleButtonClick('C');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [input]);

  return (
    <div className="calculator">
      <Display input={input} result={result} />
      <div className="buttons">
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C', '√', '^', '%'].map((button) => (
          <Button key={button} value={button} onClick={() => handleButtonClick(button)} />
        ))}
      </div>
      <div className="history">
        <h2>History</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              {item.input} = {item.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
