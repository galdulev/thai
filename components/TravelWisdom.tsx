import React from 'react';
import { Smile, HandHeart, ShoppingBag, Bug, Coffee, Anchor, Bike, CreditCard } from 'lucide-react';

const TIPS = [
  {
    icon: Anchor,
    title: 'לוגיסטיקת מעבורות',
    text: 'בדצמבר יש עומס. כרטיס עולה 280-700฿ (תלוי בחברה). מומלץ להזמין מראש ב-12GoAsia או להגיע מוקדם לרציף.',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    icon: Bike,
    title: 'קטנועים ומוניות',
    text: 'הכבישים תלולים. אם אין לך ניסיון, קחי Songthaew (מונית טנדר). נסיעה מהמזח לסריתנו עולה כ-150-200฿ לאדם.',
    color: 'bg-orange-100 text-orange-700'
  },
  {
    icon: Bug,
    title: 'יתושים בערב',
    text: 'בשעות השקיעה היתושים יוצאים. הצטיידי בתרסיס (Soffell מהסופר מצוין) ולבשי בגדים קלילים וארוכים בערב.',
    color: 'bg-indigo-100 text-indigo-700'
  },
  {
    icon: HandHeart,
    title: 'הגוף המקודש',
    text: 'בתרבות המקומית הראש הוא החלק הכי קדוש והרגליים הכי נמוכות. לא מצביעים עם הרגליים על אנשים או פסלי בודהה.',
    color: 'bg-rose-100 text-rose-700'
  },
  {
    icon: ShoppingBag,
    title: 'קסם ה-7-Eleven',
    text: 'זה לא סתם סופר, זה הצלה. טוסטים חמים באמצע הלילה, וכמובן - בקבוקי אלקטרוליטים (חפשי Royal D) להתאוששות מהחום.',
    color: 'bg-green-100 text-green-700'
  },
  {
    icon: Smile,
    title: 'Mai Pen Rai',
    text: 'הפילוסופיה התאילנדית של "הכל בסדר, לא נורא". האוטובוס מאחר? מאי פן ריי. יורד גשם? מאי פן ריי. לשחרר שליטה.',
    color: 'bg-amber-100 text-amber-700'
  }
];

export const TravelWisdom: React.FC = () => {
  return (
    <div className="my-10 animate-slide-up" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center gap-2 mb-4 px-2">
        <Coffee className="w-5 h-5 text-slate-400" />
        <h2 className="text-lg font-bold text-slate-700">Thai Whispers</h2>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-6 px-2 -mx-2 snap-x snap-mandatory no-scrollbar">
        {TIPS.map((tip, idx) => (
          <div 
            key={idx}
            className="snap-center shrink-0 w-[260px] bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-3 hover:border-teal-100 transition-colors"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tip.color}`}>
              <tip.icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">{tip.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {tip.text}
            </p>
          </div>
        ))}
        {/* Spacer for end of list scrolling */}
        <div className="w-2 shrink-0" />
      </div>
    </div>
  );
};