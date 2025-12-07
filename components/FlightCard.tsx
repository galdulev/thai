
import React from 'react';
import { Plane, Calendar, Clock, MapPin, ArrowLeft, Luggage, Globe } from 'lucide-react';

interface FlightLegProps {
  depTime: string;
  depCode: string;
  depCity: string;
  arrTime: string;
  arrCode: string;
  arrCity: string;
  duration: string;
  flightNum: string;
  isNextDay?: boolean;
  timeZoneDiff: number; // The hours difference (+2, +3, -3, etc.)
}

const FlightLeg: React.FC<FlightLegProps> = ({
  depTime, depCode, depCity,
  arrTime, arrCode, arrCity,
  duration, flightNum, isNextDay,
  timeZoneDiff
}) => (
  <div className="flex items-center justify-between py-4 px-2 relative group">
    {/* Origin (Right in RTL) */}
    <div className="text-center w-1/4">
      <div className="text-2xl font-bold text-slate-800">{depTime}</div>
      <div className="text-sm font-black text-indigo-600">{depCode}</div>
      <div className="text-[11px] text-slate-400 truncate max-w-[80px] mx-auto">{depCity}</div>
    </div>

    {/* Path Visual */}
    <div className="flex-1 flex flex-col items-center px-2 z-10">
      <div className="text-[10px] text-slate-400 mb-1 font-mono font-bold">{flightNum}</div>
      
      <div className="w-full flex items-center gap-2">
        <div className="h-[2px] flex-1 bg-indigo-100 relative">
          <div className="absolute right-0 top-[-3px] w-2 h-2 rounded-full bg-indigo-200" />
        </div>
        
        {/* Plane Icon with Duration Tooltip */}
        <div className="relative">
            <div className="bg-white p-1 rounded-full border border-indigo-100 shadow-sm">
                 <Plane className="w-3.5 h-3.5 text-indigo-500 rotate-180" />
            </div>
        </div>

        <div className="h-[2px] flex-1 bg-indigo-100 relative">
           <div className="absolute left-0 top-[-3px] w-2 h-2 rounded-full bg-indigo-400" />
        </div>
      </div>
      
      <div className="text-[10px] text-slate-500 mt-1 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
        משך טיסה: {duration}
      </div>
    </div>

    {/* Destination (Left in RTL) */}
    <div className="text-center w-1/4 relative">
      <div className="text-2xl font-bold text-slate-800 relative inline-block">
        {arrTime}
        {isNextDay && <span className="absolute -top-1 -left-3 text-[9px] text-rose-500 font-bold">+1</span>}
      </div>
      <div className="text-sm font-black text-indigo-600">{arrCode}</div>
      <div className="text-[11px] text-slate-400 truncate max-w-[80px] mx-auto">{arrCity}</div>
      
      {/* Timezone Indicator */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-max">
        <div className={`text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1 ${timeZoneDiff > 0 ? 'bg-orange-50 text-orange-700' : 'bg-blue-50 text-blue-700'}`}>
            <Globe className="w-2 h-2" />
            <span dir="ltr">
                {timeZoneDiff > 0 ? `+${timeZoneDiff}` : timeZoneDiff}h
            </span>
            <span>בשעון</span>
        </div>
      </div>
    </div>
  </div>
);

interface FlightProps {
  type: 'outbound' | 'inbound';
}

export const FlightCard: React.FC<FlightProps> = ({ type }) => {
  const isOutbound = type === 'outbound';

  const headerData = isOutbound 
    ? { title: 'תל אביב -> צ’יאנג מאי', date: '8 בדצמבר 2025', icon: Plane }
    : { title: 'בנגקוק -> תל אביב', date: '7 בינואר 2026', icon: Plane };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8 relative">
      {/* Top Decoration */}
      <div className={`h-2 w-full ${isOutbound ? 'bg-teal-500' : 'bg-indigo-500'}`} />
      
      {/* Header */}
      <div className="p-5 pb-2 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <headerData.icon className={`w-5 h-5 ${isOutbound ? 'text-teal-600' : 'text-indigo-600 rotate-180'}`} />
            {headerData.title}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {headerData.date}</span>
            <span className="flex items-center gap-1"><Luggage className="w-3 h-3" /> Etihad Airways</span>
          </div>
        </div>
        <div className="text-left">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Booking Ref</div>
          <div className="text-base font-mono font-bold text-slate-700">9MB6W8</div>
        </div>
      </div>

      {/* Flight Segments Container */}
      <div className="p-2">
        <div className="bg-slate-50 rounded-2xl p-2 border border-slate-100">
          
          {isOutbound ? (
            <>
              {/* TLV -> AUH: 3h Flight, +2h Timezone Shift (14:00 -> 19:00 is 5h diff clock) */}
              <FlightLeg 
                depTime="14:10" depCode="TLV" depCity="תל אביב"
                arrTime="19:10" arrCode="AUH" arrCity="אבו דאבי"
                duration="3ש 00ד" flightNum="EY594"
                timeZoneDiff={2}
              />
              
              {/* Connection Banner */}
              <div className="my-1 mx-4 bg-white border border-dashed border-slate-300 rounded-lg py-1.5 flex justify-center items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>המתנה באבו דאבי: 2 שעות, 10 דקות</span>
              </div>

              {/* AUH -> CNX: 5h45 Flight, +3h Timezone Shift (21:20 -> 06:05 is 8h45 clock diff) */}
              <FlightLeg 
                depTime="21:20" depCode="AUH" depCity="אבו דאבי"
                arrTime="06:05" arrCode="CNX" arrCity="צ’יאנג מאי"
                duration="5ש 45ד" flightNum="EY426" isNextDay={true}
                timeZoneDiff={3}
              />
            </>
          ) : (
            <>
              {/* BKK -> AUH: 6h50 Flight, -3h Timezone Shift (02:55 -> 06:45 is only 3h50 clock diff) */}
              <FlightLeg 
                depTime="02:55" depCode="BKK" depCity="בנגקוק"
                arrTime="06:45" arrCode="AUH" arrCity="אבו דאבי"
                duration="6ש 50ד" flightNum="EY401"
                timeZoneDiff={-3}
              />

              {/* Connection Banner */}
              <div className="my-1 mx-4 bg-white border border-dashed border-slate-300 rounded-lg py-1.5 flex justify-center items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>המתנה באבו דאבי: 2 שעות, 10 דקות</span>
              </div>

              {/* AUH -> TLV: 3h50 Flight, -2h Timezone Shift (08:55 -> 10:45 is only 1h50 clock diff) */}
              <FlightLeg 
                depTime="08:55" depCode="AUH" depCity="אבו דאבי"
                arrTime="10:45" arrCode="TLV" arrCity="תל אביב"
                duration="3ש 50ד" flightNum="EY593"
                timeZoneDiff={-2}
              />
            </>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-slate-50 p-3 text-center border-t border-slate-100 flex justify-between items-center px-6">
         <div className="text-xs text-slate-500">נוסעת: <span className="font-bold text-slate-700">גל דולב</span></div>
         <div className="text-xs text-slate-500 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            מאושר
         </div>
      </div>
    </div>
  );
};
