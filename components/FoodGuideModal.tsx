import React, { useState } from 'react';
import { X, MapPin, Utensils, Coffee, Leaf, Soup, Store, Map } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FoodSpot {
  name: string;
  description: string;
  type: 'Restaurant' | 'Cafe' | 'Street' | 'Healthy';
  locationSearch: string; // For Google Maps query
}

interface RegionData {
  id: string;
  title: string;
  color: string;
  spots: FoodSpot[];
}

const FOOD_DATA: RegionData[] = [
  {
    id: 'islands',
    title: 'האיים (סאמוי ופנגן)',
    color: 'text-blue-600 bg-blue-50 border-blue-100',
    spots: [
      {
        name: 'Eat.Co (סריתנו)',
        description: 'חובה! קפה טבעוני מפורסם. נסי את ה"צ’יזקייק" קשיו ואת ה-Buddha Bowls העשירות.',
        type: 'Healthy',
        locationSearch: 'Eat.Co Sri Thanu Phangan'
      },
      {
        name: 'Green Gallery',
        description: 'חצר קסומה בסריתנו. מיצים בכבישה קרה וקערות אורגניות.',
        type: 'Healthy',
        locationSearch: 'Green Gallery Koh Phangan'
      },
      {
        name: 'Heaven on Earth',
        description: 'ידועים בסלטים הענקיים שלהם ובאווירה הקהילתית.',
        type: 'Healthy',
        locationSearch: 'Heaven on Earth Phangan'
      },
      {
        name: 'Pure Vegan Heaven',
        description: 'קפוצ’ינו חלב קוקוס "קסום" ושייקים טרופיים מול נוף לים.',
        type: 'Healthy',
        locationSearch: 'Pure Vegan Heaven Phangan'
      },
      {
        name: 'Mama Pooh’s Kitchen',
        description: 'משפחתי וצנוע. קארי ומנות תאילנדיות אותנטיות עם טוויסט בריא.',
        type: 'Restaurant',
        locationSearch: 'Mama Pooh’s Kitchen Phangan'
      },
      {
        name: 'Karma Kafé',
        description: 'פיוז’ן תאילנדי-הודי באווירה ביתית ונעימה בסריתנו.',
        type: 'Restaurant',
        locationSearch: 'Karma Kafe Phangan'
      },
      {
        name: 'Deli Devi',
        description: 'סלטים אורגניים, שייקים וקערות סמודי מרעננות.',
        type: 'Healthy',
        locationSearch: 'Deli Devi Phangan'
      },
      {
        name: 'L’Alcove (Hin Kong)',
        description: 'צרפתי על החוף. נהדר לארוחת ערב רומנטית/שקטה מול השקיעה, עם יין טוב.',
        type: 'Restaurant',
        locationSearch: 'L’Alcove Koh Phangan'
      },
      {
        name: 'Bangrak Market (סאמוי)',
        description: 'שוק ערב מקומי ליד המזח. דגים טריים על האש וסום טאם בזול.',
        type: 'Street',
        locationSearch: 'Bangrak Market Koh Samui'
      }
    ]
  },
  {
    id: 'chiangmai',
    title: 'צ’יאנג מאי',
    color: 'text-rose-600 bg-rose-50 border-rose-100',
    spots: [
      {
        name: 'Tong Tem Toh',
        description: 'בנימן. אוכל צפוני אותנטי ומעולה (למשל סלט עלי תה, קאו סוי). פופולרי מאוד.',
        type: 'Restaurant',
        locationSearch: 'Tong Tem Toh Chiang Mai'
      },
      {
        name: 'Reform Kafé',
        description: 'מסעדה צמחונית/טבעונית מעולה בתוך העיר העתיקה (Green Tiger House).',
        type: 'Healthy',
        locationSearch: 'Reform Kafé Chiang Mai'
      },
      {
        name: 'Ginger Farm Kitchen',
        description: 'מטבח צפוני אורגני בניממן ("האנג-ליי"), אווירה כפרית ונעימה.',
        type: 'Restaurant',
        locationSearch: 'Ginger Farm Kitchen Chiang Mai'
      },
      {
        name: 'Warorot Market (Kad Luang)',
        description: 'השוק המרכזי. דוכני אוכל מכל הסוגים בקומה התחתונה. חוויה מקומית.',
        type: 'Street',
        locationSearch: 'Warorot Market Chiang Mai'
      },
      {
        name: 'Jok Sri Ping',
        description: 'דייסת אורז ("ג’וק") חמה ומנחמת עם קציצות. מושלם לבוקר.',
        type: 'Street',
        locationSearch: 'Jok Sompet Chiang Mai' 
      }
    ]
  },
  {
    id: 'pai',
    title: 'פאי',
    color: 'text-green-600 bg-green-50 border-green-100',
    spots: [
      {
        name: 'Earth Tone',
        description: 'מטבח בריאות טבעוני/צמחוני. שייקים, סלטים וקינוחים בריאים.',
        type: 'Healthy',
        locationSearch: 'Earth Tone Pai'
      },
      {
        name: 'Khao Soi Zister’s',
        description: 'קאו-סוי (מרק קארי עם נודלס) הטוב בפאי, מול נוף ירוק.',
        type: 'Street',
        locationSearch: 'Khao Soi Zister’s Pai'
      },
      {
        name: 'Cafecito',
        description: 'אוכל מקסיקני מעולה, קפה איכותי ואווירה טובה.',
        type: 'Cafe',
        locationSearch: 'Cafecito Pai'
      },
      {
        name: 'Baan Pai',
        description: 'אוכל תאילנדי ומערבי במדרחוב, מגוון גדול וטעים.',
        type: 'Restaurant',
        locationSearch: 'Baan Pai Restaurant'
      },
      {
        name: 'Two Huts',
        description: 'לא בדיוק אוכל, אבל המקום לשייק פירות מול השקיעה.',
        type: 'Cafe',
        locationSearch: 'Two Huts Pai'
      }
    ]
  },
  {
    id: 'bangkok',
    title: 'בנגקוק',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    spots: [
      {
        name: 'Pier 21 (Terminal 21)',
        description: 'מתחם האוכל (Food Court) הטוב והזול בעיר. נקי ומגוון.',
        type: 'Street',
        locationSearch: 'Terminal 21 Asok Bangkok'
      },
      {
        name: 'Chim by Siam Wisdom',
        description: 'מסעדת מישלן במחיר נגיש, אוכל תאילנדי מסורתי ומודרני.',
        type: 'Restaurant',
        locationSearch: 'Chim by Siam Wisdom Bangkok'
      },
      {
        name: 'Ratchada Night Market',
        description: 'שוק לילה (The One Ratchada) עם המון דוכני נשנושים.',
        type: 'Street',
        locationSearch: 'The One Ratchada Bangkok'
      }
    ]
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Healthy': return <Leaf className="w-4 h-4 text-green-500" />;
    case 'Cafe': return <Coffee className="w-4 h-4 text-amber-600" />;
    case 'Street': return <Soup className="w-4 h-4 text-orange-500" />;
    default: return <Utensils className="w-4 h-4 text-slate-500" />;
  }
};

export const FoodGuideModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeRegion, setActiveRegion] = useState('islands');

  if (!isOpen) return null;

  const currentRegionData = FOOD_DATA.find(r => r.id === activeRegion) || FOOD_DATA[0];

  const openMap = (search: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(search)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <div className="bg-orange-50 p-6 pb-6 relative border-b border-orange-100">
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-white/50 hover:bg-white rounded-full transition"
          >
            <X className="w-5 h-5 text-orange-900" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
             <div className="bg-orange-100 p-2 rounded-full">
               <Utensils className="w-5 h-5 text-orange-600" />
             </div>
             <h2 className="text-xl font-bold text-orange-900">טעמים בתאילנד</h2>
          </div>
          <p className="text-orange-800/70 text-sm">המלצות לאוכל רחוב, מסעדות וקפה.</p>
        </div>

        {/* Region Tabs */}
        <div className="flex overflow-x-auto p-2 gap-2 bg-slate-50 border-b border-slate-100 no-scrollbar">
          {FOOD_DATA.map(region => (
            <button
              key={region.id}
              onClick={() => setActiveRegion(region.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                activeRegion === region.id
                  ? 'bg-orange-100 text-orange-700 shadow-sm ring-1 ring-orange-200' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              {region.title}
            </button>
          ))}
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-white pb-6 space-y-3">
          {currentRegionData.spots.map((spot, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-orange-200 transition group">
               <div className="flex justify-between items-start mb-1">
                 <div className="flex items-center gap-2">
                    {getTypeIcon(spot.type)}
                    <h3 className="font-bold text-slate-800">{spot.name}</h3>
                 </div>
                 <button 
                  onClick={() => openMap(spot.locationSearch)}
                  className="p-1.5 bg-slate-50 text-slate-400 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                  title="הצג במפה"
                 >
                   <Map className="w-4 h-4" />
                 </button>
               </div>
               <p className="text-sm text-slate-600 leading-relaxed mb-2 pl-6">
                 {spot.description}
               </p>
               <div className="flex gap-2 pl-6">
                  <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full border border-slate-200">
                    {spot.type === 'Healthy' ? 'בריאות / טבעוני' : spot.type === 'Street' ? 'אוכל רחוב' : spot.type === 'Cafe' ? 'קפה / בוקר' : 'מסעדה'}
                  </span>
               </div>
            </div>
          ))}
          
          <div className="text-center mt-6 p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50">
             <div className="flex justify-center mb-2">
               <Store className="w-5 h-5 text-orange-300" />
             </div>
             <p className="text-xs text-orange-800/60">
               טיפ: רוב דוכני הרחוב מקבלים מזומן בלבד. <br/>במסעדות אפשר לרוב לשלם באשראי או QR.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};