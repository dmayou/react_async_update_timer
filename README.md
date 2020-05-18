# React Async Update Timer
Many applications need to poll an endpoint to refresh data after a certain interval.

I created a custom React Hook, useTimer, that calls an async callback function initially and then repeatedly when the timer expires. This hook can be imported into a React functional component.

The repeat interval is settable. Additionally, the hook returns the remaining time, which can be used to display 'time until refresh' for the data.

## Usage
Add to package.json:
```
"react-async-update-timer": "git+https://github.com/dmayou/react_async_update_timer"
```
Add to your React functional component file:
```
import useTimer from 'react-async-update-timer';
```
See example usage in index.js. The callback function is an async function that awaits a setTimer() callback. In actual usage, the callback could await an ajax call.

