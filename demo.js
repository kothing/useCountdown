/**
 * 倒计时组件
 * 示例: <TimeCountdown remainingTime={100000} />
 * remainingTime: 剩余时间的时间戳（或两个时间戳差值），注意：不是截止时间
 */
import React from "react";
import useCountdown from "./useCountdown";

export default ({ remainingTime = 0, onComplete, className }) => {
  const { day, hour, minute, second } = useCountdown(remainingTime, onComplete);
  return (
    <span className={`time-countdown${className ? ` ${className}` : ""}`}>
      {day > 0 ? `${day}天` : ""}
      {hour > 0 ? `${hour}时` : ""}
      {minute > 0 ? `${minute}分` : ""}
      {second}秒
    </span>
  );
};
