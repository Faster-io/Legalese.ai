'use client';
import { useEffect, useState } from 'react';

interface CountdownTimerProps {
    targetDate: string; // ISO String
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number } | null>(null);
    const [isLow, setIsLow] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);

                setTimeLeft({ days, hours, minutes });
                setIsLow(difference < 24 * 60 * 60 * 1000); // Less than 24 hours
            } else {
                setTimeLeft(null); // Expired
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return null;

    return (
        <div className={`
            inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
            ${isLow ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)] animate-pulse' : 'bg-blue-900/40 text-blue-300 border border-blue-700/50'}
        `}>
            <span>🕒 Pro Access Ends:</span>
            <span className="font-mono text-sm">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
            </span>
        </div>
    );
}
