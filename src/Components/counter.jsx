import React, { useState, useEffect } from 'react';

// props esimerkki: mistä numerosta laskeminen alkaa
function Counter({ initialCount }) {

   // muuttuja joka pitää laskurin nykyistä arvoa
  const [counter, setCounter] = useState(initialCount);

   // useEffect joka käynnistää laskennan intervalin avulla
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // vähentää laskuria yhdellä, ei anna laskurin mennä negatiiviseksi
  const handleDecrement = () => {
    setCounter(prevCounter => Math.max(prevCounter - 1, 0));
  };

  // laskurin nollaaminen
  const handleReset = () => {
    setCounter(0);
  };
  
  // kasvattaa laskuria yhdellä
  const handleIncrement = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  //renderöiminen
  return (
    <div className='counter-container'>
      <p>Count: {counter}</p>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}

export default Counter;