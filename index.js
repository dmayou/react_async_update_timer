// Example file showing use of useTimer() custom hook

import React, { useState } from 'react';
import useTimer from './usetimer';
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
  const timeLeft = useTimer(10 * oneSecond, 1 * oneSecond, fetchData, false);
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
