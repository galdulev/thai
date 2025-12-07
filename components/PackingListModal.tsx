
import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles, Sun, Pill, LayoutGrid, Shirt, Footprints, Briefcase, Lightbulb, Utensils } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  {
    id: 'clothes',
    title: 'בגדים',
    icon: Shirt,
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    items: [
      'שמלה קלילה ליום (לבנה/בהירה לצילומים)',
      'שמלה אסתטית לערב (נשית, לא כבדה)',
      '2 חולצות יפות (משי/כותנה דקה)',
      '2 טופים קצרים',
      'ג’קט דק / קרדיגן (לערבים בפאי)',
      'מכנס ארוך דק ונושם',
      'מכנס יום קליל',
      'טייץ ליוגה',
      'קימונו (לערב ולחוף)',
      '2 סטים יפים של יוגה',
      'חולצה/שמלה לבנה (לטקסי ירח)',
      'צעיף/שאול טקסי דק',
      '3 בגדי ים (אחד שמרגיש וואו)',
      '2 שמלות חוף זורמות',
      'מכנס קצר',
      '2 גופיות קלות',
      'שמלת ערב יפה (לבנגקוק)',
      'אאוטפיט עירוני נוח',
      '10 זוגות תחתונים',
      'תחתוני וסת',
      '3-4 חזיות/טופים',
      'גרביים (2-3 זוגות)',
      'פיג’מה דקה'
    ]
  },
  {
    id: 'shoes',
    title: 'הנעלה',
    icon: Footprints,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    items: [
      'כפכפים איכותיים (חובה לאיים)',
      'סנדלי הליכה יפים',
      'נעל הליכה קלה/סגורה (לפאי)'
    ]
  },
  {
    id: 'care',
    title: 'טיפוח ופינוק',
    icon: Sparkles,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    items: [
      'קרם לחות לפנים (קל)',
      'קרם הגנה SPF50',
      'איפור (לערב/צילומים)',
      'סרום לשיער (ללחות)',
      'שמפו + מרכך (גודל בינוני)',
      'סבון נוזלי קטן',
      'שמן גוף / After Sun',
      'מסכת פנים מפנקת',
      'ג’ל אלוורה',
      'דאודורנט',
      'מסיר איפור + מגבונים',
      'פינצטה + סכין גילוח',
      'אביזרי שיער (גומיות/קליפסים)',
      'בושם קליל'
    ]
  },
  {
    id: 'health',
    title: 'בריאות והגנה',
    icon: Pill,
    color: 'text-red-500',
    bg: 'bg-red-50',
    items: [
      'לוריוון (לטיסה/שינה)',
      'דוחה יתושים (DEET)',
      'משחה להרגעת עקיצות',
      'כובע יפה לטיולים',
      'משקפי שמש',
      'מאוורר קטן נייד',
      'כדורים נגד בחילה (לנסיעה לפאי)',
      'אקמול / אדוויל',
      'פלסטרים (רגילים + למים)',
      'משחה אנטיספטית',
      'פרוביוטיקה / כדורי פחם',
      'תרופות קבועות'
    ]
  },
  {
    id: 'food',
    title: 'אוכל וצידה',
    icon: Utensils,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    items: [
      'סרדינים',
      'סלמון (שימורים/ואקום)',
      'פירות (לדרך)',
      'ירקות (נשנוש)'
    ]
  },
  {
    id: 'docs',
    title: 'מסמכים וטק',
    icon: Briefcase,
    color: 'text-slate-600',
    bg: 'bg-slate-100',
    items: [
      'דרכון (בתוקף!)',
      'כרטיסי טיסה (דיגיטלי + מודפס)',
      'ביטוח נסיעות',
      'כתובות מלונות',
      'כרטיס אשראי + גיבוי',
      'מזומן (דולרים)',
      'רישיון נהיגה בינלאומי',
      'לפטופ + מטען',
      'מטען לטלפון + כבל ספייר',
      'סוללה ניידת (Power Bank)',
      'AirTag למזוודה',
      'אוזניות',
      'מתאם שקע אוניברסלי'
    ]
  },
  {
    id: 'spirit',
    title: 'רוח וים',
    icon: Sun,
    color: 'text-teal-500',
    bg: 'bg-teal-50',
    items: [
      'מחברת מסע + עט אהוב',
      'קריסטל / קלף מחזק',
      'שמן אתרי (לבנדר/אחר)',
      'פריט קטן מהבית (לחדר במלון)',
      'תיק חוף נוח',
      'מגבת מיקרופייבר',
      'סרונג',
      'תיק רטוב לבגד ים',
      'בקבוק מים רב פעמי'
    ]
  },
  {
    id: 'extras',
    title: 'תוספות חכמות',
    icon: Lightbulb,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
    items: [
      'כרית לטיסה/שינה',
      'אטמי אוזניים',
      'מסכת שינה לטיסה',
      'מנעול קטן למזוודה',
      'שקית כביסה',
      'מטרייה דקה / פונצ’ו גשם'
    ]
  }
];

export const PackingListModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Load state from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('zen-packing-list-v2');
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  // Save state to local storage on change
  const toggleItem = (item: string) => {
    const newState = { ...checkedItems, [item]: !checkedItems[item] };
    setCheckedItems(newState);
    localStorage.setItem('zen-packing-list-v2', JSON.stringify(newState));
  };

  const calculateProgress = () => {
    const totalItems = CATEGORIES.flatMap(c => c.items).length;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((checkedCount / totalItems) * 100);
  };

  if (!isOpen) return null;

  const visibleCategories = activeTab === 'all' 
    ? CATEGORIES 
    : CATEGORIES.filter(c => c.id === activeTab);

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <div className="bg-teal-900 text-white p-6 pb-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-2xl font-bold mb-1">רשימת אריזה</h2>
          <p className="text-teal-200 text-sm opacity-90">לארוז את הגוף, להכין את הנפש.</p>
          
          {/* Global Progress Bar */}
          <div className="mt-4 flex items-center gap-3">
             <div className="flex-1 h-2 bg-teal-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-400 transition-all duration-500 ease-out"
                  style={{ width: `${calculateProgress()}%` }}
                />
             </div>
             <span className="text-xs font-mono text-teal-300">{calculateProgress()}% מוכן</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto p-2 gap-2 bg-slate-50 border-b border-slate-100 no-scrollbar items-center">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
              activeTab === 'all' 
                ? 'bg-teal-600 text-white shadow-md scale-105' 
                : 'text-slate-500 hover:bg-slate-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            הכל
          </button>

          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                activeTab === cat.id 
                  ? 'bg-white text-teal-800 shadow-sm border border-slate-100 scale-105' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <cat.icon className={`w-4 h-4 ${activeTab === cat.id ? cat.color : 'text-slate-400'}`} />
              {cat.title}
            </button>
          ))}
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-white pb-12">
          {visibleCategories.map(cat => (
            <div key={cat.id} className="animate-slide-up mb-6">
               <div className={`sticky top-0 z-10 flex items-center gap-2 py-2 mb-2 bg-white/95 backdrop-blur-sm border-b border-slate-50`}>
                 <div className={`p-1.5 rounded-lg ${cat.bg}`}>
                   <cat.icon className={`w-4 h-4 ${cat.color}`} />
                 </div>
                 <h3 className={`font-bold text-sm ${cat.color}`}>{cat.title}</h3>
               </div>
              
              <div className="space-y-2">
                {cat.items.map((item, idx) => (
                  <label 
                    key={idx} 
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      checkedItems[item] 
                        ? 'bg-teal-50 border-teal-200 opacity-60' 
                        : 'bg-white border-slate-100 hover:border-teal-200'
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                       checkedItems[item] ? 'bg-teal-500 border-teal-500' : 'bg-white border-slate-300'
                    }`}>
                      {checkedItems[item] && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={!!checkedItems[item]} 
                      onChange={() => toggleItem(item)}
                    />
                    
                    <span className={`text-sm select-none ${checkedItems[item] ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
