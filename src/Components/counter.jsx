import React, { useState, useEffect } from 'react';
function Counter() {
   const [counter, setCounter] = useState(0);

   useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

   if (counter < 0) {setCounter(0)}
   return (
      <div className='counter-container'>
         <p>Count: {counter}</p>
         <button onClick={() => setCounter(counter - 1)}>-</button>
         <button onClick={() => setCounter(0)}>Reset</button>
         <button onClick={() => setCounter(counter + 1)}>+</button>
      </div>
   );
}
export default Counter;