import React, { useState } from 'react';
import { X, MessageCircle, Heart, Utensils, AlertCircle, Maximize2, Car, Stethoscope } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Phrase {
  thai: string;
  phonetic: string;
  hebrew: string;
  icon?: any;
}

interface Category {
  id: string;
  title: string;
  color: string;
  phrases: Phrase[];
}

const PHRASE_DATA: Category[] = [
  {
    id: 'basics',
    title: 'נימוס ובסיס',
    color: 'bg-teal-50 text-teal-800 border-teal-200',
    phrases: [
      { hebrew: 'שלום', phonetic: 'סוואדי קה', thai: 'สวัสดีค่ะ' },
      { hebrew: 'תודה', phonetic: 'קופ קון קה', thai: 'ขอบคุณค่ะ' },
      { hebrew: 'כן / לא', phonetic: 'צ’אי / מאי צ’אי', thai: 'ใช่ / ไม่ใช่' },
      { hebrew: 'סליחה / תסלחו לי', phonetic: 'קור טוט קה', thai: 'ขอโทษค่ะ' },
      { hebrew: 'לא מבינה', phonetic: 'מאי קאו צ’אי', thai: 'ไม่เข้าใจ' },
    ]
  },
  {
    id: 'food',
    title: 'אוכל והזמנות (חשוב!)',
    color: 'bg-orange-50 text-orange-800 border-orange-200',
    phrases: [
      { hebrew: 'לא חריף בכלל!', phonetic: 'מאי פט לויי', thai: 'ไม่เผ็ดเลย', icon: AlertCircle },
      { hebrew: 'בלי סוכר', phonetic: 'מאי סאי נמטאן', thai: 'ไม่ใส่น้ำตาล', icon: Heart },
      { hebrew: 'אני צמחונית (אוכלת ג’יי)', phonetic: 'צ’אן גין ג’יי', thai: 'ฉันกินเจ', icon: Utensils },
      { hebrew: 'בלי מונוסודיום (MSG)', phonetic: 'מאי סאי פונג-צ’ו-רוט', thai: 'ไม่ใส่ผงชูรส' },
      { hebrew: 'מים / קוקוס', phonetic: 'נאם / מא-פראו', thai: 'น้ำ / มะพร้าว' },
      { hebrew: 'חשבון בבקשה', phonetic: 'צ’ק בין קה', thai: 'เช็คบิลค่ะ' },
    ]
  },
  {
    id: 'taxi',
    title: 'מוניות ודרך',
    color: 'bg-blue-50 text-blue-800 border-blue-200',
    phrases: [
      { hebrew: 'קח אותי ל...', phonetic: 'פאי...', thai: 'ไป...', icon: Car },
      { hebrew: 'תעצור כאן', phonetic: 'יוט טי ני', thai: 'จอดที่นี่' },
      { hebrew: 'כמה זה עולה?', phonetic: 'טאור אי קה?', thai: 'เท่าไหร่คะ?' },
      { hebrew: 'אפשר להוריד מחיר?', phonetic: 'לוט נוי דאי מאי?', thai: 'ลดหน่อยได้ไหม?' },
      { hebrew: 'לשדה התעופה', phonetic: 'פאי סנאם-בין', thai: 'ไปสนามบิน' },
    ]
  },
  {
    id: 'emergency',
    title: 'דחוף / בריאות',
    color: 'bg-rose-50 text-rose-800 border-rose-200',
    phrases: [
      { hebrew: 'איפה השירותים?', phonetic: 'הונג-נאם יו-טי-נאי?', thai: 'ห้องน้ำอยู่ที่ไหน?' },
      { hebrew: 'בית חולים', phonetic: 'רונג-פיה-באן', thai: 'โรงพยาบาล', icon: Stethoscope },
      { hebrew: 'אני אלרגית ל...', phonetic: 'צ’אן פאה...', thai: 'ฉันแพ้...' },
      { hebrew: 'בית מרקחת', phonetic: 'ראן-קאי-יה', thai: 'ร้านขายยา' },
    ]
  }
];

export const ThaiHelperModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [fullscreenPhrase, setFullscreenPhrase] = useState<Phrase | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      
      {/* Fullscreen Mode for showing locals */}
      {fullscreenPhrase && (
        <div className="absolute inset-0 z-[80] bg-white flex flex-col items-center justify-center p-8 text-center animate-scale-up" onClick={() => setFullscreenPhrase(null)}>
          <button className="absolute top-6 right-6 p-4 bg-slate-100 rounded-full">
            <X className="w-8 h-8 text-slate-500" />
          </button>
          <p className="text-2xl text-slate-500 mb-8 font-medium">{fullscreenPhrase.hebrew}</p>
          <p className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8 break-words w-full">{fullscreenPhrase.thai}</p>
          <p className="text-3xl text-teal-600 font-serif italic">{fullscreenPhrase.phonetic}</p>
          <div className="mt-16 flex items-center gap-2 text-slate-400 animate-pulse">
             <Maximize2 className="w-5 h-5" />
             <span className="text-sm">לחצי בכל מקום לסגירה</span>
          </div>
        </div>
      )}

      <div className="bg-white w-full max-w-md h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="bg-teal-600 p-6 relative shadow-md shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-1 text-white">
             <MessageCircle className="w-6 h-6" />
             <h2 className="text-xl font-bold">מדברות תאית</h2>
          </div>
          <p className="text-teal-100 text-sm opacity-90">כרטיסיות תקשורת למצבי חירום ורעב.</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-8 space-y-6 bg-slate-50">
          {PHRASE_DATA.map((category) => (
            <div key={category.id}>
              <h3 className="text-sm font-bold text-slate-400 mb-3 px-1 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${category.color.split(' ')[0]}`}></span>
                {category.title}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {category.phrases.map((phrase, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setFullscreenPhrase(phrase)}
                    className={`relative p-4 rounded-xl border text-right transition-all active:scale-95 flex justify-between items-center group bg-white border-slate-100 shadow-sm hover:border-teal-300 hover:shadow-md`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {phrase.icon && <phrase.icon className="w-4 h-4 text-teal-500" />}
                        <span className="font-bold text-slate-700 text-lg">{phrase.hebrew}</span>
                      </div>
                      <div className="text-sm text-slate-500 font-serif italic">{phrase.phonetic}</div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1 pl-2">
                       <span className="text-xl font-bold text-slate-800 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 font-sans tracking-wide">
                         {phrase.thai}
                       </span>
                       <div className="flex items-center gap-1 text-[10px] text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-3 h-3" />
                          <span>להגדלה</span>
                       </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          <div className="text-center p-4 mt-4 bg-teal-50 rounded-2xl border border-teal-100 text-teal-800 text-xs leading-relaxed">
            💡 <b>טיפ זהב:</b> בסוף כל משפט מוסיפים <b>"קה"</b> (Ka) בחיוך. <br/>זה מילת הקסם שהופכת הכל למנומס.
          </div>
        </div>
      </div>
    </div>
  );
};