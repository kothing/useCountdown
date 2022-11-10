# useCountdown
React hookt time countdown

## Code
```js
const formatMoment = (milliseconds) => {
  if (milliseconds <= 0) {
    return {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0
    };
  }
  let remainTime = milliseconds;
  const day = Math.floor(milliseconds / 1000 / 3600 / 24);
  remainTime = milliseconds % (24 * 60 * 60 * 1000);
  const hour = Math.floor(remainTime / 60 / 60 / 1000);
  remainTime %= 60 * 60 * 1000;
  const minute = Math.floor(remainTime / 60 / 1000);
  remainTime %= 60 * 1000;
  const second = Math.floor(remainTime / 1000);
  return {
    day,
    hour,
    minute,
    second
  };
};
```
**useCountdown**
```js
/**
 * Hook Function: useCountdown
 * @param milliseconds
 * @param onComplete
 * @returns {day, hour, minute, second}
 */
 
import { useRef, useState, useEffect } from "react";

export default function useCountdown(milliseconds, onComplete) {
  const timer = useRef();
  const [countDownTime, setCountDownTime] = useState(milliseconds || 0);

  useEffect(() => {
    const count = (time) => {
      if (Number(time) <= 0) {
        if (timer.current) {
          clearTimeout(timer.current);
        }
        if (typeof onComplete === "function") {
          onComplete();
        }
      } else {
        const remainTime = time - 1000;
        setCountDownTime(remainTime);
        timer.current = setTimeout(() => count(remainTime), 1000);
      }
    };

    count(countDownTime);

    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return formatMoment(countDownTime);
}
```

## Usage

```js
export default ({ remainingTime = 0, onComplete, className }) => {
  const { day, hour, minute, second } = useCountdown(remainingTime, onComplete);
  return (
    <span className={`time-countdown${className ? ` ${className}` : ""}`}>
      {day > 0 ? `${day} days` : ""}
      {hour > 0 ? `${hour} hours` : ""}
      {minute > 0 ? `${minute} minutes` : ""}
      {second} second
    </span>
  );
};

```
