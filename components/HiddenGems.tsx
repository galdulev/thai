
import React, { useState } from 'react';
import { Map, Star, Sparkles, Leaf, Eye, Flame, Droplets, Mountain, Wind, Car, Heart, MapPin } from 'lucide-react';

type Region = 'chiangmai' | 'pai' | 'way';

interface Gem {
  id: number;
  title: string;
  thaiName: string;
  type: string;
  location: string;
  region: Region;
  description: string;
  special: string;
  energyValue: string;
  rating: number;
  icon: any;
  mapTerm: string;
}

const GEMS: Gem[] = [
  {
    id: 1,
    title: 'Wat Umong',
    thaiName: 'วัดอุโมงค์',
    type: 'מקדש יער עתיק',
    location: 'מערב צ\'יאנג מאי',
    region: 'chiangmai',
    description: 'מקדש בן 700 שנה ביער עצי טיק. מנהרות אבן קרירות, בריכת דגים ופסלים מכוסי טחב המעניקים תחושת "טראנס-זמן".',
    special: 'מרחב עמוק למדיטציה בשקט מוחלט. אנרגיה של יער ראשון ובית ספר עתיק לחוכמה.',
    energyValue: 'יציבות, הארקה, ריפוי רגשי שקט',
    rating: 5,
    icon: Leaf,
    mapTerm: 'Wat Umong Suan Phutthatham'
  },
  {
    id: 2,
    title: 'Wat Pha Lat',
    thaiName: 'วัดผาลาด',
    type: 'מקדש נסתר',
    location: 'דוי סוטפ',
    region: 'chiangmai',
    description: 'מקדש קטן ו"שאנטי" בתוך היער לצד מפל. גשרים, פסלי נאגה ובקתות נזירים. תחושת "רשות שקטה".',
    special: 'כמעט ללא תיירים. מקום שבו נזירים ממש חיים. מושלם למדיטציית הליכה לצד מים זורמים.',
    energyValue: 'התבוננות, טיהור, השראה',
    rating: 5,
    icon: Droplets,
    mapTerm: 'Wat Pha Lat'
  },
  {
    id: 3,
    title: 'Wat Nam Hu',
    thaiName: 'วัดน้ำฮู',
    type: 'מקדש מסורתי',
    location: 'פאי',
    region: 'pai',
    description: 'פסל בודהה עתיק בעל "ראש פתוח" שממנו יוצאים מים קדושים שנאגרים בחלל סודי.',
    special: 'אתר עלייה לרגל מקומי. טקס מים עתיק לסגולה, ריפוי ומזל.',
    energyValue: 'טיהור פנימי, ריפוי רגשי',
    rating: 4,
    icon: Sparkles,
    mapTerm: 'Wat Nam Hu Pai'
  },
  {
    id: 4,
    title: 'עיסוי ב-Wat Sri Koed',
    thaiName: 'วัดศรีเกิด',
    type: 'עיסוי עתיק',
    location: 'העיר העתיקה',
    region: 'chiangmai',
    description: 'עיסוי תאילנדי עתיק בתוך שטח מקדש. חלל גדול ופשוט עם מזרנים, ריח קטורת וקולות תפילה.',
    special: 'אותנטיות טהורה ללא אלמנטים "מפונפנים". מרחב של ריפוי אנרגטי אמיתי.',
    energyValue: 'שחרור חסימות, הארקה בגוף',
    rating: 4,
    icon: Heart,
    mapTerm: 'Wat Si Koet Chiang Mai'
  },
  {
    id: 5,
    title: 'Cheeva Spa',
    thaiName: 'ชีวา สปา',
    type: 'ספא לאנה',
    location: 'צ\'יאנג מאי',
    region: 'chiangmai',
    description: 'ספא יוקרתי בסגנון לאנה, מעוצב עץ טיק ונרות. מדורג גבוה ע"י המקומיים.',
    special: 'טיפול הדגל: סאונת צמחים עתיקה + עיסוי שמנים מקומיים. למביני עניין.',
    energyValue: 'טיהור, ריפוי וגובה-אנרגיה',
    rating: 5,
    icon: Sparkles,
    mapTerm: 'Cheeva Spa Chiang Mai'
  },
  {
    id: 6,
    title: 'Sukjai by Pa Ta',
    thaiName: 'สุขใจ โดย ป้าตา',
    type: 'מטבח צמחוני',
    location: 'San Pakoy',
    region: 'chiangmai',
    description: 'השפית פא-טה מכינה הכל במקום: מנות לאנה מסורתיות בגרסה צמחונית, טופו ביתי וירקות אורגניים.',
    special: 'אוכל אותנטי ללא סוכר לבן או חומרים תעשייתיים. אווירה של בית תאילנדי עתיק.',
    energyValue: 'הזנה עמוקה, רכות, חמלה לגוף',
    rating: 5,
    icon: Leaf,
    mapTerm: 'Sukjai by Pa Ta'
  },
  {
    id: 7,
    title: 'Pai Resonance',
    thaiName: 'ปาย เรโซแนนซ์',
    type: 'יוגה וצ\'י קונג',
    location: 'פאי',
    region: 'pai',
    description: 'סטודיו קטן בין שדות ירוקים. יוגה רכה, יוגה נידרה ומדיטציה עם המקומיים.',
    special: 'דגש על עבודה אנרגטית ושקטה, לא על פוזות. מתאים לוויסות מערכת העצבים.',
    energyValue: 'רוגע, חיבור פנימי, פינוי עומס נפשי',
    rating: 4,
    icon: Wind,
    mapTerm: 'Pai Resonance'
  },
  {
    id: 8,
    title: 'Blue Stone Pai Yoga',
    thaiName: 'บลูสโตน',
    type: 'יוגה אינטימית',
    location: 'פאי',
    region: 'pai',
    description: 'סטודיו במבנה עץ רומנטי עם גינה. שיעורים איטיים עם מורה תאילנדית, דגש על נשימה.',
    special: 'נחשב לסטודיו היוגה הכי "לבבי" בפאי. הרבה חיבוק אנרגטי ונוכחות נעימה.',
    energyValue: 'איזון, נינוחות, רכות פנימית',
    rating: 4,
    icon: Heart,
    mapTerm: 'Blue Stone Pai Yoga'
  },
  {
    id: 9,
    title: 'Sai Ngam Hot Springs',
    thaiName: 'โป่งน้ำร้อนไทรงาม',
    type: 'מעיין חם',
    location: 'צפון פאי',
    region: 'pai',
    description: 'בריכות טבעיות בתוך יער עבות. מים קרירים-חמימים נעימים מאוד.',
    special: 'תחושה של מקדש טבעי. אהוב על המקומיים וריק בבקרים. אווירת יער בתולית.',
    energyValue: 'ניקוי אנרגטי, מים מרפאים, קרקוע',
    rating: 5,
    icon: Droplets,
    mapTerm: 'Sai Ngam Hot Spring'
  },
  {
    id: 10,
    title: 'Mo Paeng Waterfall',
    thaiName: 'น้ำตกหมอแปง',
    type: 'מפל ומגלשה',
    location: 'מערב פאי',
    region: 'pai',
    description: 'מפל מקסים עם בריכות טבעיות ו"מגלשת סלע" (תופעת טבע). קריר ונעים בצהריים.',
    special: 'מקום קייצי-רגוע שתאילנדים מגיעים אליו לשמחה ומשחקיות.',
    energyValue: 'שמחה, משחקיות, שחרור',
    rating: 4,
    icon: Droplets,
    mapTerm: 'Mo Paeng Waterfall'
  },
  {
    id: 11,
    title: 'Santichon Village',
    thaiName: 'หมู่บ้านสันติชน',
    type: 'כפר יונאן',
    location: 'פאי',
    region: 'pai',
    description: 'כפר אותנטי של צאצאי שבט יונאן. נשים מבשלות אוכל עתיק, בתי בוץ וטקסי תה.',
    special: 'משמר מסורות לאנה ויונאן. טקסי תה מלאי סמליות.',
    energyValue: 'קרקוע, מסורת, חיבור לשורשים',
    rating: 4,
    icon: Mountain,
    mapTerm: 'Santichon Village'
  },
  {
    id: 12,
    title: 'Yun Lai Viewpoint',
    thaiName: 'จุดชมวิวยุนไหล',
    type: 'תצפית זריחה',
    location: 'פאי',
    region: 'pai',
    description: 'תצפית חזקה לזריחה מעל ים עננים ושכבות הרים. תרמוס תה ומדיטציה.',
    special: 'אווירה אמיתית של "בוקר תאילנדי". שילוב של נוף, שקט ותנועה רוחנית.',
    energyValue: 'הרחבה אנרגטית, פרספקטיבה, התחלה חדשה',
    rating: 5,
    icon: Eye,
    mapTerm: 'Yun Lai Viewpoint'
  },
  {
    id: 13,
    title: 'טקס Puja ערב',
    thaiName: 'Puja',
    type: 'תפילה',
    location: 'מקדשים',
    region: 'chiangmai',
    description: 'מדי ערב נזירים ותושבים מתכנסים להדלקת נרות, שירת מנטרות ומדיטציה.',
    special: 'קבלת מסורת כמו שהיא. חיבור למקצב הרוחני של תאילנד.',
    energyValue: 'ניקוי עומסים, פתיחת הלב, שקט עמוק',
    rating: 5,
    icon: Flame,
    mapTerm: 'Wat Chedi Luang'
  },
  {
    id: 14,
    title: 'טקסי תודה Sadu',
    thaiName: 'สาธุ',
    type: 'טקס סיום',
    location: 'כל מקדש',
    region: 'chiangmai',
    description: 'לפני עזיבה: הדלקת קטורת ונר במקדש קטן, ואמירת "Sadu" (קבלה/תודה/שחרור).',
    special: 'סגירת מעגל רוחנית לטיול וברכה למסע הבא.',
    energyValue: 'סגירת מעגל, חיזוק כוונה',
    rating: 5,
    icon: Sparkles,
    mapTerm: 'Wat Phra Singh'
  },
  {
    id: 15,
    title: '1,864 הפיתולים',
    thaiName: 'דרך 1095',
    type: 'ידע מקודש',
    location: 'הדרך לפאי',
    region: 'way',
    description: 'הדרך עצמה היא חלק מהחוויה. 762 פיתולים ועוד רבים. מסע בין הרים ירוקים.',
    special: 'תאילנדים מתייחסים לדרך כאל "מסע טיהור" פיזי ואנרגטי.',
    energyValue: 'טיהור, סבלנות, מעבר',
    rating: 4,
    icon: Car,
    mapTerm: 'Route 1095'
  }
];

export const HiddenGems: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<Region>('chiangmai');

  const openMap = (term: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(term)}`, '_blank');
  };

  const visibleGems = GEMS.filter(gem => gem.region === activeTab);

  const tabs: { id: Region; label: string }[] = [
    { id: 'chiangmai', label: 'צ’יאנג מאי' },
    { id: 'way', label: 'בדרך' },
    { id: 'pai', label: 'פאי' },
  ];

  return (
    <div className="my-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center gap-2 mb-4 px-2">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <h2 className="text-lg font-bold text-slate-800">סודות הצפון: מקומות של אנרגיה</h2>
      </div>

      {/* Tabs */}
      <div className="flex p-1 gap-1 bg-white rounded-xl border border-slate-100 mb-4 mx-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-amber-100 text-amber-800 shadow-sm'
                : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 px-2">
        {visibleGems.map((gem) => (
          <div 
            key={gem.id}
            onClick={() => setActiveId(activeId === gem.id ? null : gem.id)}
            className={`bg-white rounded-2xl border transition-all cursor-pointer overflow-hidden ${
              activeId === gem.id 
                ? 'border-amber-300 shadow-md ring-1 ring-amber-100' 
                : 'border-slate-100 hover:border-amber-100 shadow-sm'
            }`}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${activeId === gem.id ? 'bg-amber-100' : 'bg-slate-50'}`}>
                    <gem.icon className={`w-5 h-5 ${activeId === gem.id ? 'text-amber-600' : 'text-slate-400'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 leading-none">{gem.title}</h3>
                    <span className="text-xs text-slate-400 font-serif">{gem.thaiName}</span>
                  </div>
                </div>
                {activeId === gem.id && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); openMap(gem.mapTerm); }}
                    className="p-1.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Map className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="pl-2 pr-12">
                 <p className="text-sm text-slate-600 leading-relaxed mb-2">
                   {activeId === gem.id ? gem.description : gem.special}
                 </p>
                 
                 <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100">
                      {gem.energyValue}
                    </span>
                    <div className="flex text-amber-400">
                      {[...Array(gem.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
