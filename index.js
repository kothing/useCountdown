import { useRef, useState, useEffect } from "react";

// 格式化毫秒为：天：小时：分钟：秒
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

/**
 * Hook函数: useCountdown
 * @param {时间戳} milliseconds  // 毫秒值（或两个时间戳的差值），注意：非截止时间！
 * @param {函数} onComplete // 倒计时结束回调
 * @returns {day, hour, minute, second}
 */
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
