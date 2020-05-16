// useTimer() React custom hook
// - callBack function called initially, and repeatedly each {timeOut} ms
// - remaining time is checked/updated every {increment} ms
// - {callBack} defined in separate lexical scope and should be async
// - {useActualElapsed}: flag for how to calculate elapsed time
// - return: remaining time in ms

import { useRef, useState, useEffect } from 'react';

const useTimer = (timeOut, increment, callBack, useActualElapsed = false) => {
  const [actualStartTime, setStartTime] = useState(Date.now());
  const [remainingTime, setRemainingTime] = useState(0);
  const timer = useRef(null);
  
  useEffect(() => {
    timer.current = setTimeout(() => {
      const elapsedTime = useActualElapsed ? 
        timeOut - (Date.now() - actualStartTime) : // actual elapsed time
        remainingTime - increment; // elapsed time subject to background suspend
      setRemainingTime(elapsedTime);
    }, increment);
    
    if (remainingTime <= 0) { // works because actual intervals are never shorter
      setStartTime(Date.now());
      setRemainingTime(timeOut);
      callBack();
    }
    
    return () => clearTimeout(timer.current); // cleanup
    
  }, [remainingTime]);
  
  return remainingTime;
}

export default useTimer;
