import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ZenMode: React.FC<Props> = ({ isOpen, onClose }) => {
  const [text, setText] = useState('שאיפה');
  
  useEffect(() => {
    if (!isOpen) return;
    
    const cycle = [
      { t: 'שאיפה', d: 3000 },
      { t: 'החזקה', d: 2000 },
      { t: 'נשיפה', d: 3000 },
    ];
    
    let step = 0;
    // Fix: Changed type from NodeJS.Timeout to any to avoid namespace error in browser environment
    let timeout: any;

    const runCycle = () => {
      setText(cycle[step].t);
      timeout = setTimeout(() => {
        step = (step + 1) % 3;
        runCycle();
      }, cycle[step].d);
    };

    runCycle();
    return () => clearTimeout(timeout);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-teal-900/95 backdrop-blur-md flex flex-col items-center justify-center text-white animate-fade-in">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
      >
        <X className="w-6 h-6" />
      </button>

      <h2 className="text-2xl font-light tracking-widest mb-12 opacity-80">זמן לנשום</h2>

      <div className="relative flex items-center justify-center w-64 h-64">
        <div className="absolute inset-0 bg-teal-400/20 rounded-full animate-breathe blur-xl"></div>
        <div className="absolute inset-0 bg-teal-300/10 rounded-full animate-breathe" style={{ animationDelay: '0.5s' }}></div>
        <div className="relative z-10 text-4xl font-bold text-white tracking-wider">
          {text}
        </div>
      </div>

      <p className="mt-12 text-sm text-teal-200/70 max-w-xs text-center leading-relaxed">
        היי כאן ועכשיו.<br/>
        הכל בסדר. את במקום הנכון.
      </p>
    </div>
  );
};