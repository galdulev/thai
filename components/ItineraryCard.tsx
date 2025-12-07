import React from 'react';
import { MapPin, Calendar, BedDouble, Hash, Map } from 'lucide-react';
import { DayPlan, LocationType } from '../types';

interface Props {
  day: DayPlan;
  index?: number; // For animation delay
}

const getTypeColor = (type: LocationType) => {
  switch (type) {
    case LocationType.Nature: return 'bg-green-100 text-green-800 border-green-200';
    case LocationType.Island: return 'bg-blue-100 text-blue-800 border-blue-200';
    case LocationType.Temple: return 'bg-amber-100 text-amber-800 border-amber-200';
    case LocationType.City: return 'bg-rose-50 text-rose-800 border-rose-200';
    case LocationType.Travel: return 'bg-slate-100 text-slate-800 border-slate-200';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const ItineraryCard: React.FC<Props> = ({ day, index = 0 }) => {
  const isPhanganBlock = day.id === 'phangan-stay';

  const openMap = (query: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };
  
  return (
    <div 
      className="relative pl-4 pb-8 border-r-2 border-slate-200 last:border-0 animate-slide-up"
      style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
    >
      {/* Timeline Dot */}
      <div className={`absolute -right-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${
        day.type === LocationType.Island ? 'bg-blue-400' : 
        day.type === LocationType.Nature ? 'bg-green-400' : 'bg-amber-400'
      }`} />

      <div className="mr-6 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-teal-100 transition-all hover:shadow-md cursor-default group">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium mb-1">
              <Calendar className="w-3 h-3 group-hover:text-teal-500 transition-colors" />
              <span>{day.date}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-teal-800 transition-colors">{day.title}</h3>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${getTypeColor(day.type)}`}>
            {day.vibe}
          </span>
        </div>

        {/* Location & Hotel */}
        <div className="mb-4 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-slate-500 text-sm">
                <MapPin className="w-3 h-3" />
                {day.location}
            </div>
            {day.mapTerm && (
                <button 
                  onClick={() => openMap(day.mapTerm!)}
                  className="p-1 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition"
                  title="הצג במפה"
                >
                    <Map className="w-3.5 h-3.5" />
                </button>
            )}
          </div>
          
          {day.hotel && (
            <div className="flex items-start justify-between gap-2 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div className="flex items-start gap-2">
                <BedDouble className="w-4 h-4 text-teal-600 mt-0.5" />
                <div>
                    <div className="text-sm font-bold text-slate-700">{day.hotel}</div>
                    {day.bookingRef && (
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Hash className="w-3 h-3" />
                        הזמנה: {day.bookingRef}
                    </div>
                    )}
                </div>
              </div>
              <button 
                onClick={() => openMap(day.hotel!)}
                className="p-1.5 bg-white text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition shadow-sm"
                title="נווט למלון"
              >
                  <Map className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Activities */}
        {!isPhanganBlock && (
          <div className="space-y-3">
            {day.activities.map((act, idx) => (
              <div key={idx} className="flex gap-3 items-start group/act">
                <span className="text-xs font-semibold text-teal-600 min-w-[40px] mt-0.5">
                  {act.time}
                </span>
                <span className="text-sm text-slate-600 leading-relaxed flex-1">
                  {act.description}
                </span>
                {act.mapTerm && (
                    <button 
                      onClick={() => openMap(act.mapTerm!)}
                      className="opacity-0 group-hover/act:opacity-100 p-1 text-slate-400 hover:text-blue-600 transition"
                      title="הצג במפה"
                    >
                        <Map className="w-3 h-3" />
                    </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Notes if any */}
        {day.notes && (
          <div className="mt-4 pt-3 border-t border-slate-50 text-xs text-slate-400 italic">
            {day.notes.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};