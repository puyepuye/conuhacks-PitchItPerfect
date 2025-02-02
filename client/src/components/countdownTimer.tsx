import { useState, useEffect } from "react";

const CountdownTimer = ({ minutes, seconds, start, stop, onFinish }) => {
  const [time, setTime] = useState({ m: minutes, s: seconds });
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timerId;

    if (start) {
      setRunning(true);
    }

    if (stop) {
      setRunning(false); // Pause at the current time
    }

    if (running) {
      timerId = setInterval(() => {
        setTime((prev) => {
          // If timer reaches 0, go into negative time
          if (prev.m === 0 && prev.s === 0) {
            return { m: -1, s: 59 };
          }
          if (prev.m < 0 && prev.s === 0) {
            return { m: prev.m - 1, s: 59 };
          }
          if (prev.s === 0) {
            return { m: prev.m - 1, s: 59 };
          }
          return { ...prev, s: prev.s - 1 };
        });
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [start, stop, running]);

  return (
    <div>
      <span>
        {time.m}:{time.s < 10 ? `0${time.s}` : time.s}
      </span>
    </div>
  );
};

export default CountdownTimer;
