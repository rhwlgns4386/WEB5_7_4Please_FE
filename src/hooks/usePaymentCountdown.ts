import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const calculateRemainingTime = (endTime: string): string => {
  const paymentDeadline = dayjs(endTime).add(24, 'hour');
  const now = dayjs();
  const diff = paymentDeadline.diff(now);

  if (diff <= 0) {
    return '결제 기한 만료';
  }

  const remainingDuration = dayjs.duration(diff);
  const hours = String(Math.floor(remainingDuration.asHours())).padStart(
    2,
    '0'
  );
  const minutes = String(remainingDuration.minutes()).padStart(2, '0');
  const seconds = String(remainingDuration.seconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

export const usePaymentCountdown = (endTime: string | undefined) => {
  const [timeLeft, setTimeLeft] = useState(() =>
    endTime ? calculateRemainingTime(endTime) : ''
  );

  useEffect(() => {
    if (!endTime || timeLeft === '결제 기한 만료') {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateRemainingTime(endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, timeLeft]);

  return timeLeft;
};
