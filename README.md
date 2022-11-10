# useCountdown
React hookt time countdown

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
