"use client";

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Target: 2 December 2026 09:00 AM
    const target = new Date("2026-12-02T09:00:00").getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-3 justify-center">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="w-20 h-20 bg-white/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds }
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="text-xs uppercase font-mono tracking-wider text-indigo-300 mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        {timeLeft.isExpired ? "Event is LIVE!" : "Countdown to El Niño Awareness Program (2 Dec)"}
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg w-full">
        {units.map((unit, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-inner"
          >
            <span className="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-400 tracking-wider mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
