# React Async Update Timer
Many applications need to poll an endpoint to refresh data after a certain interval.

I created a custom React Hook, useTimer, that calls an async callback function repeatedly. The repeat interval is settable.
Additionally, the hook returns the remaining time, which can be used to display 'time until refresh' for the data.
