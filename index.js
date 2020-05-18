// Example file showing use of useTimer() custom hook

import React, { useState } from 'react';
import useTimer from './useTimer';
const oneSecond = 1000;

const Timer = () => {
  const [data, setData] = React.useState('');
  const fetchData = async () => {
    const asyncDelay = 0.5 * oneSecond;
    await setTimeout( () => {
      const now = Math.floor(performance.now());
      setData(now);
    }, asyncDelay);
  }
  const timeLeft = useTimer(
    10 * oneSecond, // timer counts down for this many ms
    1 * oneSecond,  // hook returns ms left after each interval ms
    fetchData,      // this function is called when the timer expires
    false,          // true: calculate elapsed time from system time. false: calculate from browser run time
    null,           // integer number of repeats, or null = infinite repeat
    false           // true: wait to exectute callback until timer first expires. false: callback exectutes immediately
  );
  return (<div>
            &lt; {timeLeft} ms until next update. Last update time was: {data} ms
          </div>
  );
}

const App = () => {
  return (
    <div>
      <h1>Countdown</h1>
      <Timer />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
