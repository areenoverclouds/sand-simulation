import React, { useState, useEffect } from 'react';
import './index.css';

export default function App() {
  const rows = 50, cols = 50;
  const [grid, setGrid] = useState(() => {
    const initialGrid = Array.from({ length: rows }, () => Array(cols).fill({ value: 0, hue: null }));
    return initialGrid;
  });
  const [hueValue, setHueValue] = useState(100);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fallSand();
    }, 50); 
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setHueValue(prev => (prev + 1) % 360);
  }, [grid]);

  function toggleCell(i, j) {
    setGrid(prevGrid => {
      const nextGrid = prevGrid.map(row => [...row]);
      if(nextGrid[i][j].value === 1) return nextGrid;
      nextGrid[i][j] = { value: 1, hue: hueValue };
      if(i-1 >= 0) nextGrid[i-1][j] = { value: 1, hue: hueValue };
      if(j-1 >= 0) nextGrid[i][j-1] = { value: 1, hue: hueValue };
      if(i+1 < rows) nextGrid[i+1][j] = { value: 1, hue: hueValue };
      if(j+1 < cols) nextGrid[i][j+1] = { value: 1, hue: hueValue };
      return nextGrid;
    });
  }

  function fallSand() {
    setGrid(prevGrid => {
      const nextGrid = prevGrid.map(row => [...row]);
      for (let i = rows - 1; i >= 0; i--) {
        for (let j = 0; j < cols; j++) {
          if (prevGrid[i][j].value === 1 && i + 1 < rows && prevGrid[i + 1][j].value === 0) {
            nextGrid[i][j] = { value: 0, hue: prevGrid[i][j].hue };
            nextGrid[i + 1][j] = { value: 1, hue: prevGrid[i][j].hue };
          }
        }
      }
      return nextGrid;
    });
  }

  function renderGrid() {
    const canvas = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const { value, hue } = grid[i][j];
        const bgcolor = value === 0 ? 'white' : `hsl(${hue !== null ? hue : 0}, 100%, 50%)`;
        const cell = (
          <div
            key={`${i}-${j}`}
            className='block'
            style={{ backgroundColor: bgcolor }}
            onMouseEnter={() => toggleCell(i, j)}
          ></div>
        );
        canvas.push(cell);
      }
    }
    return canvas;
  }

  return (
    <div className='playarea'>
      {renderGrid()}
    </div>
  );
}