
import React, { useState, useEffect } from 'react';
import { Leaf, Timer, Wind, Luggage, Utensils, MessageCircle, Plane } from 'lucide-react';
import { ITINERARY_DATA } from './constants';
import { ItineraryCard } from './components/ItineraryCard';
import { PhanganRoutine } from './components/PhanganRoutine';
import { GeminiAssistant } from './components/GeminiAssistant';
import { FlightCard } from './components/FlightCard';
import { QuickInfo } from './components/QuickInfo';
import { ZenMode } from './components/ZenMode';
import { PackingListModal } from './components/PackingListModal';
import { FoodGuideModal } from './components/FoodGuideModal';
import { ThaiHelperModal } from './components/ThaiHelperModal';
import { PreFlightModal } from './components/PreFlightModal';
import { TravelWisdom } from './components/TravelWisdom';
import { HiddenGems } from './components/HiddenGems';

const App: React.FC = () => {
  const [isZenOpen, setIsZenOpen] = useState(false);
  const [isPackingOpen, setIsPackingOpen] = useState(false);
  const [isFoodOpen, setIsFoodOpen] = useState(false);
  const [isThaiOpen, setIsThaiOpen] = useState(false);
  const [isPreFlightOpen, setIsPreFlightOpen] = useState(false);

  // Countdown Logic
  const [daysLeft, setDaysLeft] = useState(0);
  useEffect(() => {
    // Target date set explicitly to Israel time (UTC+2)
    // 8th Dec 2025 at 14:10 Israel time
    const targetDate = new Date('2025-12-08T14:10:00+02:00');
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysLeft(diffDays > 0 ? diffDays : 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-slate-800 pb-24 selection:bg-teal-200 selection:text-teal-900">
      <ZenMode isOpen={isZenOpen} onClose={() => setIsZenOpen(false)} />
      <PackingListModal isOpen={isPackingOpen} onClose={() => setIsPackingOpen(false)} />
      <FoodGuideModal isOpen={isFoodOpen} onClose={() => setIsFoodOpen(false)} />
      <ThaiHelperModal isOpen={isThaiOpen} onClose={() => setIsThaiOpen(false)} />
      <PreFlightModal isOpen={isPreFlightOpen} onClose={() => setIsPreFlightOpen(false)} />
      
      {/* Hero Header */}
      <header className="relative bg-teal-900 text-white pt-10 pb-16 px-6 rounded-b-[40px] shadow-xl overflow-hidden mb-2">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" className="animate-pulse" />
           </svg>
        </div>
        
        <div className="max-w-md mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4 backdrop-blur-sm border border-white/10 shadow-inner animate-float">
            <Leaf className="w-6 h-6 text-teal-300" />
          </div>
          <h1 className="text-3xl font-bold mb-2 font-heebo tracking-wide text-teal-50">המסע לתאילנד</h1>
          <p className="text-teal-200 text-lg font-light opacity-90 tracking-widest">8 דצמבר – 7 ינואר</p>
          
          {/* Action Bar */}
          <div className="flex justify-center flex-wrap gap-3 mt-6">
             {/* Countdown Badge */}
            {daysLeft > 0 && (
              <div className="inline-flex items-center gap-2 bg-teal-800/50 px-4 py-1.5 rounded-full border border-teal-700/50 backdrop-blur-sm">
                <Timer className="w-3.5 h-3.5 text-teal-300" />
                <span className="text-xs font-medium text-teal-100">עוד {daysLeft} ימים</span>
              </div>
            )}
            
            {/* Buttons Row */}
            <div className="flex gap-2 flex-wrap justify-center">
              <button 
                onClick={() => setIsPreFlightOpen(true)}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm transition-all active:scale-95"
              >
                <Plane className="w-3.5 h-3.5 text-teal-200" />
                <span className="text-xs font-medium text-teal-100">טיסה</span>
              </button>

              <button 
                onClick={() => setIsPackingOpen(true)}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm transition-all active:scale-95"
              >
                <Luggage className="w-3.5 h-3.5 text-teal-200" />
                <span className="text-xs font-medium text-teal-100">ציוד</span>
              </button>

              <button 
                onClick={() => setIsFoodOpen(true)}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm transition-all active:scale-95"
              >
                <Utensils className="w-3.5 h-3.5 text-teal-200" />
                <span className="text-xs font-medium text-teal-100">אוכל</span>
              </button>
              
              <button 
                onClick={() => setIsThaiOpen(true)}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm transition-all active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 text-teal-200" />
                <span className="text-xs font-medium text-teal-100">תאית</span>
              </button>

              <button 
                onClick={() => setIsZenOpen(true)}
                className="inline-flex items-center gap-2 bg-teal-100/10 hover:bg-teal-100/20 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm transition-all active:scale-95"
              >
                <Wind className="w-3.5 h-3.5 text-teal-200" />
                <span className="text-xs font-medium text-teal-100">לנשום</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-8 relative z-20">
        
        <QuickInfo />

        {/* Quote / Intro */}
        <div className="mb-8 text-center px-4 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <p className="text-slate-500 italic text-sm leading-relaxed">
            "זה מסלול שבנוי סביב הגוף שלך, האנרגיה שלך, והקצב שלך."
          </p>
        </div>

        {/* Outbound Flight */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
           <FlightCard type="outbound" />
        </div>

        <div className="mb-2">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 animate-slide-up" style={{ animationDelay: '0.25s' }}>
             <span className="w-2 h-8 bg-teal-500 rounded-full"></span>
             המסע מתחיל: הצפון
          </h2>
          {/* Part 1: North & Arrival */}
          <div className="space-y-0 border-r-2 border-slate-100 relative">
             {ITINERARY_DATA.slice(0, 8).map((day, index) => (
               <ItineraryCard key={day.id} day={day} index={index} />
             ))}
          </div>
        </div>

        {/* Hidden Gems Section - Placed after North leg */}
        <HiddenGems />

        {/* UX Break: Wisdom Section before Islands */}
        <TravelWisdom />

        <div className="mb-6">
           <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 animate-slide-up">
             <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
             האיים והשקט
          </h2>
           <div className="space-y-0 border-r-2 border-slate-100 relative">
             {ITINERARY_DATA.slice(8, 10).map((day, index) => (
               <ItineraryCard key={day.id} day={day} index={index + 9} />
             ))}
           </div>
        </div>

        {/* Special Phangan Section */}
        <div className="py-2 animate-slide-up" style={{ animationDelay: '0.5s' }}>
             <PhanganRoutine />
        </div>

        <div className="mb-8 mt-6">
           <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 animate-slide-up">
             <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
             סיום בבנגקוק
          </h2>
          <div className="space-y-0 border-r-2 border-slate-100 relative">
             {/* Part 3: Bangkok End */}
             {ITINERARY_DATA.slice(11).map((day, index) => (
               <ItineraryCard key={day.id} day={day} index={index + 11} />
             ))}
           </div>
        </div>

        {/* Inbound Flight */}
        <div className="animate-slide-up">
          <FlightCard type="inbound" />
        </div>

        <div className="text-center mt-12 mb-8 opacity-60">
            <p className="text-teal-800 font-medium text-sm">נחיתה רכה בבית 🤍</p>
        </div>

      </main>

      <GeminiAssistant />
    </div>
  );
};

export default App;
