// useTimer() React custom hook
// - callBack function called initially, and repeatedly each {timeOut} ms
// - remaining time is checked/updated every {increment} ms
// - {callBack} defined in separate lexical scope and should be async
// - {useActualElapsed}: flag for how to calculate elapsed time
// - {maxUpdates}: maximum number of times to call callBack, including initial.
//                 Cannot be zero. Null = infinite.
// - {callbackWait}: if true, call callBack initially after timer expires
// - return: remaining time in ms

import { useRef, useState, useEffect } from 'react';

const useTimer = (timeOut, increment, callBack, useActualElapsed = false, maxUpdates = null, callbackWait = false) => {
  const [actualStartTime, setStartTime] = useState(Date.now());
  const [remainingTime, setRemainingTime] = useState(callbackWait ? timeOut : 0);
  const timer = useRef(null);
  const timesToUpdate = useRef(maxUpdates);
  const updatesExhausted = useRef(maxUpdates === 0);

  useEffect(() => {
    timer.current = setTimeout(() => {
      const elapsedTime = useActualElapsed ?
        timeOut - (Date.now() - actualStartTime) : // actual elapsed time
        remainingTime - increment; // elapsed time subject to background suspend
      if (!updatesExhausted.current) {
        setRemainingTime(elapsedTime);
      } else {
        setRemainingTime(0); // when all updates expired, remaining time is 0
      }
    }, increment);

    if (remainingTime <= 0 // works because actual intervals are never shorter than increment
      && !updatesExhausted.current
    ) {
      setStartTime(Date.now());
      setRemainingTime(timeOut);
      callBack();
      timesToUpdate.current && timesToUpdate.current--;
      updatesExhausted.current = timesToUpdate.current === 0;
    }

    return () => clearTimeout(timer.current); // cleanup

  }, [remainingTime]);

  return remainingTime;
}

export default useTimer;