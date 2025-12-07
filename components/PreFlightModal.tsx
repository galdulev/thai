import React, { useState } from 'react';
import { X, CheckCircle2, Plane, FileText, Syringe, ShieldCheck, CreditCard, Car } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CHECKLIST_ITEMS = [
  {
    id: 'visa',
    title: 'ויזה (פטור)',
    desc: 'ישראלים מקבלים 60 יום אוטומטית בכניסה. רק לוודא שהדרכון בתוקף לחצי שנה!',
    icon: FileText,
    deadline: 'חודש לפני'
  },
  {
    id: 'health',
    title: 'חיסונים ותרופות',
    desc: 'ביקור במרפאת מטיילים (טיפוס הבטן, צהבת). הצטיידות במרשמים ופרוביוטיקה.',
    icon: Syringe,
    deadline: 'חודש לפני'
  },
  {
    id: 'insurance',
    title: 'ביטוח נסיעות',
    desc: 'חובה להוסיף הרחבת ספורט אתגרי (קטנועים, צלילה, אומגות).',
    icon: ShieldCheck,
    deadline: 'שבועיים לפני'
  },
  {
    id: 'license',
    title: 'רישיון בינלאומי',
    desc: 'להוציא בממסי/אופטיקה הלפרין (טופס נייר). חובה להשכרת קטנוע בצפון.',
    icon: Car,
    deadline: 'שבועיים לפני'
  },
  {
    id: 'money',
    title: 'כסף ואשראי',
    desc: 'להזמין דולרים/באט מהבנק. לבדוק עמלות המרה בכרטיס האשראי.',
    icon: CreditCard,
    deadline: 'שבוע לפני'
  }
];

export const PreFlightModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-indigo-600 p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-1 text-white">
             <Plane className="w-6 h-6" />
             <h2 className="text-xl font-bold">הכנות לטיסה</h2>
          </div>
          <p className="text-indigo-100 text-sm opacity-90">צ’ק-ליסט חובה לראש שקט.</p>
        </div>

        {/* Content */}
        <div className="p-4 bg-slate-50 flex-1 overflow-y-auto">
           {CHECKLIST_ITEMS.map((item) => (
             <div 
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`mb-3 p-4 rounded-xl border transition-all cursor-pointer flex gap-4 items-start ${
                checked[item.id] 
                  ? 'bg-indigo-50 border-indigo-200 opacity-70' 
                  : 'bg-white border-slate-100 hover:border-indigo-300 shadow-sm'
              }`}
             >
               <div className={`mt-1 p-2 rounded-full flex-shrink-0 ${checked[item.id] ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                 {checked[item.id] ? <CheckCircle2 className="w-5 h-5" /> : <item.icon className="w-5 h-5" />}
               </div>
               
               <div>
                 <div className="flex justify-between items-center mb-1">
                   <h3 className={`font-bold ${checked[item.id] ? 'text-indigo-900 line-through' : 'text-slate-800'}`}>
                     {item.title}
                   </h3>
                   <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-medium">
                     {item.deadline}
                   </span>
                 </div>
                 <p className="text-sm text-slate-500 leading-relaxed">
                   {item.desc}
                 </p>
               </div>
             </div>
           ))}
        </div>
        
        <div className="p-4 bg-white border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">ישראלים בתאילנד? הכי חשוב ביטוח ורישיון! 🇹🇭</p>
        </div>
      </div>
    </div>
  );
};