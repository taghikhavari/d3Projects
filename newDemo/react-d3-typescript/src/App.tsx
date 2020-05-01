import React from 'react';
import './App.css';
import Chart from './chart';
import data from './data';

function App() {
  return (
    <div className="App">
      <Chart data={data} />
    </div>
  );
}

export default App;
