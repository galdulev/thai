import React, { useState, useEffect } from 'react';
import { CloudSun, Coins, Clock, ArrowRightLeft, RefreshCw } from 'lucide-react';

export const QuickInfo: React.FC = () => {
  // Currency State
  const [thbAmount, setThbAmount] = useState<string>('100');
  
  // Rough conversion rate 10 THB = 1 ILS (approx for mental math, actually ~0.11)
  const ilsAmount = (parseInt(thbAmount || '0') * 0.11).toFixed(1);

  // Clock State
  const [time, setTime] = useState(new Date());
  const [isThailand, setIsThailand] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: isThailand ? 'Asia/Bangkok' : 'Asia/Jerusalem',
  }).format(time);

  return (
    <div className="grid grid-cols-3 gap-3 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      {/* Interactive Currency Converter */}
      <div className="bg-white p-3 rounded-2xl border border-amber-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
        <div className="flex items-center gap-1 mb-1 text-amber-500">
          <Coins className="w-3.5 h-3.5" />
          <ArrowRightLeft className="w-3 h-3 opacity-50" />
        </div>
        <span className="text-[10px] text-slate-400 mb-1">מחשבון באט</span>
        <div className="flex items-center justify-center gap-1 w-full">
           <input 
            type="number" 
            value={thbAmount}
            onChange={(e) => setThbAmount(e.target.value)}
            className="w-10 text-center font-bold text-slate-700 border-b border-amber-200 focus:border-amber-500 outline-none bg-transparent text-xs p-0"
           />
           <span className="text-[10px] text-slate-400">฿</span>
        </div>
        <div className="mt-1 text-xs font-black text-amber-600">
           ≈ {ilsAmount}₪
        </div>
      </div>

      {/* Weather */}
      <div className="bg-white p-3 rounded-2xl border border-teal-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-teal-400"></div>
        <CloudSun className="w-4 h-4 text-teal-500 mb-1 animate-pulse" />
        <span className="text-[10px] text-slate-400">מזג אוויר</span>
        <span className="text-xs font-bold text-slate-700 mt-1">~28°C</span>
        <span className="text-[9px] text-teal-600">חם ולח</span>
      </div>

      {/* Real Time Clock */}
      <button 
        onClick={() => setIsThailand(!isThailand)}
        className="bg-white p-3 rounded-2xl border border-indigo-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden hover:bg-indigo-50 transition-colors active:scale-95"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-400"></div>
        <div className="flex items-center gap-1 mb-1 text-indigo-500">
          <Clock className="w-3.5 h-3.5" />
          <RefreshCw className="w-3 h-3 opacity-60" />
        </div>
        <span className="text-[10px] text-slate-400 mb-0.5">
          {isThailand ? 'שעון תאילנד' : 'שעון ישראל'}
        </span>
        <span className="text-lg font-black text-slate-700 font-mono tracking-wider leading-none mt-1">
          {formattedTime}
        </span>
      </button>
    </div>
  );
};