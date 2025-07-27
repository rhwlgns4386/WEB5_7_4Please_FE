import { useState, useEffect } from 'react';

const calculateRemainingTime = (endTime: string): string => {
  const difference = new Date(endTime).getTime() - new Date().getTime();

  if (difference <= 0) {
    return '경매 종료';
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);

  const parts: string[] = [];
  if (days > 0) {
    parts.push(`${days}일`);
  }
  if (hours > 0) {
    parts.push(`${hours}시간`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}분`);
  }

  if (parts.length > 0) {
    return `${parts.join(' ')} 남음`;
  }

  const seconds = Math.floor((difference / 1000) % 60);
  return `${seconds}초 남음`;
};

export const useCountdown = (endTime: string) => {
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateRemainingTime(endTime)
  );

  useEffect(() => {
    if (timeLeft === '경매 종료') {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateRemainingTime(endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, timeLeft]);

  return timeLeft;
};
