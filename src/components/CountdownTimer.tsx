import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
  targetTime?: string;
  compact?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, targetTime, compact = false }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const targetDateTime = new Date(`${targetDate}${targetTime ? `T${targetTime}` : 'T00:00'}`).getTime();
      const difference = targetDateTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, targetTime]);

  if (isExpired) {
    return (
      <div className={`flex items-center space-x-1 ${compact ? 'text-xs' : 'text-sm'} text-red-300`}>
        <Clock className={`${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
        <span>Expired</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center space-x-1 text-xs">
        <Clock className="w-3 h-3" />
        <span>
          {timeLeft.days > 0 && `${timeLeft.days}d `}
          {timeLeft.hours > 0 && `${timeLeft.hours}h `}
          {timeLeft.minutes}m
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Clock className="w-4 h-4" />
      <div className="flex space-x-1 text-sm">
        {timeLeft.days > 0 && (
          <div className="bg-white/20 rounded px-2 py-1">
            <span className="font-bold">{timeLeft.days}</span>
            <span className="text-xs ml-1">d</span>
          </div>
        )}
        {(timeLeft.hours > 0 || timeLeft.days > 0) && (
          <div className="bg-white/20 rounded px-2 py-1">
            <span className="font-bold">{timeLeft.hours}</span>
            <span className="text-xs ml-1">h</span>
          </div>
        )}
        <div className="bg-white/20 rounded px-2 py-1">
          <span className="font-bold">{timeLeft.minutes}</span>
          <span className="text-xs ml-1">m</span>
        </div>
        <div className="bg-white/20 rounded px-2 py-1 animate-pulse">
          <span className="font-bold">{timeLeft.seconds}</span>
          <span className="text-xs ml-1">s</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;