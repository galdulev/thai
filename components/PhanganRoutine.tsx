import React, { useState } from 'react';
import { Sun, Waves, Moon, TentTree, Utensils, Sparkles, Snowflake, Mountain, Anchor, Heart, Map, X } from 'lucide-react';
import { RoutineItem } from '../types';

const routineData: RoutineItem[] = [
  {
    period: 'בוקר (6:30-11:00)',
    icon: Sun,
    activities: [
      'יקיצה טבעית עם השמש',
      'יוגה ב-Orion / Pyramid Yoga',
      'קפה קוקוס ב-Pure Vegan Heaven',
      'שחייה ב-Zen Beach / Secret Beach'
    ]
  },
  {
    period: 'צהריים (12:00-16:00)',
    icon: Utensils,
    activities: [
      'ארוחת צהריים בריאה (Eat.Co)',
      'מנוחה מהשמש החזקה (ערסל/ספר)',
      'מסאז’ מפנק (שמנים / רפלקסולוגיה)'
    ]
  },
  {
    period: 'שקיעה (17:00-19:00)',
    icon: Waves,
    activities: [
      'הליכה על החוף ב-Hin Kong',
      'Zen Beach: מעגל מתופפים וריקודים',
      'צפייה בשמיים נצבעים בכתום-ורוד'
    ]
  },
  {
    period: 'ערב (19:30+)',
    icon: Moon,
    activities: [
      'ארוחת ערב שקטה (מרק/קארי)',
      'סאונה וטבילת קרח (The Dome)',
      'מדיטציה ושינה מוקדמת'
    ]
  }
];

interface Highlight {
  title: string;
  icon: any;
  description: string;
  detail: string;
  color: string;
  mapTerm: string;
}

const highlights: Highlight[] = [
  {
    title: 'The Dome Sauna',
    icon: Snowflake,
    description: 'סאונה, קרח ומדורת שבט',
    detail: 'פתוח כל ערב (18:00-חצות, סגור בשני). סאונת אדים עם צמחי מרפא, אמבט קרח לזרימת הדם, ומדורת שבט תחת הכוכבים. חוויה חברתית מדהימה, מומלץ אחרי יום טיול. כניסה: ~200 באט.',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    mapTerm: 'The Dome Gym Sauna Ice Bath'
  },
  {
    title: 'Lomi Lomi Massage',
    icon: Heart,
    description: 'עיסוי הוואי ב-Orion',
    detail: 'עיסוי טקסי המשתמש באמות הידיים בתנועות גליות ארוכות, בשילוב נשימה וכוונה. ידוע כמשחרר חסימות רגשיות ו"פותח את הלב". מומלץ להזמין ב-Orion Healing Centre.',
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    mapTerm: 'Orion Healing Centre'
  },
  {
    title: 'Ang Thong Marine Park',
    icon: Anchor,
    description: 'יום טיול ל-42 האיים',
    detail: 'שמורת טבע ימית מרהיבה. קייאקים בלגונות, טיפוס לתצפית על ה-Emerald Lagoon המפורסמת (מהסרט "החוף"). יום שלם (08:00-17:00), כולל ארוחת צהריים.',
    color: 'bg-teal-50 text-teal-700 border-teal-200',
    mapTerm: 'Mu Ko Ang Thong National Marine Park'
  },
  {
    title: 'מפלי Phaeng',
    icon: Mountain,
    description: 'ג’ונגל פראי במרכז האי',
    detail: 'המפל הגדול באי. הליכה בג’ונגל מובילה לבריכות טבילה ולנקודת התצפית Dom Sila. אופציה נוספת: מפלי Than Sadet ההיסטוריים (עם חריטות המלך ראמה ה-5).',
    color: 'bg-green-50 text-green-700 border-green-200',
    mapTerm: 'Phaeng Noi Waterfall'
  },
  {
    title: 'טקסי ירח',
    icon: Sparkles,
    description: 'פול-מון (3.1) ומעבר',
    detail: 'בעוד שהאד-רין רועשת, סריתנו מציעה אלטרנטיבה: מעגלי שירה (Kirtan), טקסי קקאו וריקוד אקסטטי לאור הירח המלא. זמן מושלם להתבוננות פנימית.',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    mapTerm: 'Pyramid Yoga Center'
  }
];

export const PhanganRoutine: React.FC = () => {
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);

  const openMap = (e: React.MouseEvent, query: string) => {
    e.stopPropagation();
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-teal-100 my-8 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-blue-400"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-teal-100 p-3 rounded-full">
          <TentTree className="w-6 h-6 text-teal-700" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-teal-900">הלב של סריתנו</h3>
          <p className="text-sm text-teal-600">שגרה יומית והמלצות עומק</p>
        </div>
      </div>

      {/* Daily Routine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {routineData.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 flex flex-col gap-2 hover:border-teal-100 transition-colors">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-50">
              <item.icon className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-slate-700 text-sm">{item.period}</span>
            </div>
            <ul className="space-y-1.5 mt-1">
              {item.activities.map((act, i) => (
                <li key={i} className="text-sm text-slate-500 flex items-start gap-2">
                  <span className="text-teal-400 mt-1.5">•</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Special Highlights Section */}
      <div>
        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          חוויות מיוחדות (לנשמה)
        </h4>
        
        <div className="space-y-3">
          {highlights.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveHighlight(activeHighlight === idx ? null : idx)}
              className={`bg-white rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                activeHighlight === idx ? `${item.color} shadow-md` : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${activeHighlight === idx ? 'bg-white/50' : 'bg-slate-50'}`}>
                    <item.icon className={`w-5 h-5 ${activeHighlight === idx ? 'text-current' : 'text-slate-400'}`} />
                  </div>
                  <div>
                     <h5 className={`font-bold ${activeHighlight === idx ? 'text-current' : 'text-slate-700'}`}>{item.title}</h5>
                     <p className={`text-xs ${activeHighlight === idx ? 'opacity-80' : 'text-slate-400'}`}>{item.description}</p>
                  </div>
                </div>
              </div>
              
              {activeHighlight === idx && (
                <div className="px-4 pb-4 pt-0 animate-fade-in">
                  <p className="text-sm opacity-90 leading-relaxed mb-3 pl-11">
                    {item.detail}
                  </p>
                  <div className="pl-11">
                    <button 
                      onClick={(e) => openMap(e, item.mapTerm)}
                      className="flex items-center gap-2 bg-white/40 hover:bg-white/60 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    >
                      <Map className="w-3 h-3" />
                      הצג מיקום במפה
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};