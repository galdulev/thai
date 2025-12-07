

import { DayPlan, LocationType } from './types';

export const ITINERARY_DATA: DayPlan[] = [
  // --- Chiang Mai Start ---
  {
    id: 'day-1',
    date: '9.12',
    location: 'צ’יאנג מאי',
    mapTerm: 'Old City Chiang Mai',
    title: 'נחיתה והתאקלמות',
    vibe: 'רכות',
    type: LocationType.City,
    hotel: 'Lavana Hotel Chiangmai',
    bookingRef: '5783240430',
    activities: [
      { time: '06:05', description: 'נחיתה בצ’יאנג מאי (EY426). מונית למלון בעיר העתיקה.', mapTerm: 'Chiang Mai International Airport' },
      { time: 'בוקר', description: 'מנוחה במלון Lavana (Rachadamnoen Rd) ומקלחת חמה.', mapTerm: 'Lavana Hotel Chiangmai' },
      { time: '11:00', description: 'Women’s Massage Center - עיסוי תאילנדי ראשון.', mapTerm: 'Chiang Mai Women Correctional Institution Vocational Training Center' },
      { time: 'אחה"צ', description: 'Wat Chedi Luang - מקדש ושיחת נזירים (Monk Chat) ברחוב הסמוך.', mapTerm: 'Wat Chedi Luang' },
      { time: 'ערב', description: 'טקס Puja (תפילה ומדיטציה) בערב במקדש.', mapTerm: 'Wat Chedi Luang' },
    ]
  },
  // --- Pai Trip (Confirmed Dates 10-13 Dec) ---
  {
    id: 'day-2',
    date: '10.12',
    location: 'הדרך לפאי',
    mapTerm: 'Route 1095 Thailand',
    title: '1,864 הפיתולים',
    vibe: 'מסע',
    type: LocationType.Travel,
    hotel: 'Reverie Siam Resort',
    bookingRef: '604607003',
    activities: [
      { time: 'בוקר', description: 'צ’ק-אאוט ונסיעה לפאי. "מסע טיהור" פיזי ואנרגטי בדרך המפותלת.', mapTerm: 'Chiang Mai Arcade Bus Terminal 2' },
      { time: 'דרך', description: 'נסיעה של כ-3 שעות בנוף הררי ירוק.' },
      { time: 'אחה"צ', description: 'הגעה לריזורט החלומי Reverie Siam. התמקמות בחדר דלוקס.', mapTerm: 'Reverie Siam Resort' },
      { time: 'ערב', description: 'Wat Nam Hu - מקדש עם בודהה וראש פתוח (מים קדושים).', mapTerm: 'Wat Nam Hu Pai' },
    ]
  },
  {
    id: 'day-3',
    date: '11.12',
    location: 'פאי',
    mapTerm: 'Pai District',
    title: 'מים ויוגה',
    vibe: 'זרימה',
    type: LocationType.Nature,
    hotel: 'Reverie Siam Resort',
    bookingRef: '604607007',
    activities: [
      { time: 'בוקר', description: 'Sai Ngam Hot Springs (מעיינות חמים בתוליים ביער).', mapTerm: 'Sai Ngam Hot Spring' },
      { time: 'צהריים', description: 'Mo Paeng Waterfall - מפל עם מגלשת סלע טבעית.', mapTerm: 'Mo Paeng Waterfall' },
      { time: 'אחה"צ', description: 'כפר Santichon (יונאן) - תה מסורתי וחיבור לשורשים.', mapTerm: 'Santichon Village' },
      { time: 'ערב', description: 'שוק הלילה (Walking Street) - רוטי בננה ואווירה.', mapTerm: 'Pai Walking Street' },
    ]
  },
  {
    id: 'day-4',
    date: '12.12',
    location: 'פאי',
    mapTerm: 'Pai District',
    title: 'זריחה ושקט',
    vibe: 'שקט',
    type: LocationType.Nature,
    hotel: 'Reverie Siam Resort',
    bookingRef: '604607007',
    activities: [
      { time: 'זריחה', description: 'Yun Lai Viewpoint - זריחה מעל ים עננים (עם תה חם).', mapTerm: 'Yun Lai Viewpoint' },
      { time: 'בוקר', description: 'גשר הבמבוק (Bamboo Bridge) - הליכה מעל שדות אורז.', mapTerm: 'Kho Ku So Bamboo Bridge' },
      { time: 'צהריים', description: 'תרגול ב-Pai Resonance או ב-Blue Stone Yoga (אינטימי).', mapTerm: 'Blue Stone Pai Yoga' },
      { time: 'שקיעה', description: 'הבודהה הלבן (Wat Mae Yen) - טיפוס מדרגות לתצפית.', mapTerm: 'Wat Phra That Mae Yen' },
    ]
  },
  // --- Return to Chiang Mai ---
  {
    id: 'day-5',
    date: '13.12',
    location: 'פאי -> צ’יאנג מאי',
    mapTerm: 'Chiang Mai',
    title: 'חזרה לציוויליזציה',
    vibe: 'חזרה',
    type: LocationType.Travel,
    activities: [
      { time: 'בוקר', description: 'ארוחת בוקר אחרונה בריוורי ופרידה מפאי.', mapTerm: 'Reverie Siam Resort' },
      { time: 'צהריים', description: 'נסיעה חזרה לצ’יאנג מאי.', mapTerm: 'Chiang Mai' },
      { time: 'אחה"צ', description: 'צ’ק-אין במלון חדש בצ’יאנג מאי (נימן/נהר).' },
      { time: 'ערב', description: 'ארוחה במסעדת Sukjai by Pa Ta (צמחוני אותנטי, ללא סוכר).', mapTerm: 'Sukjai by Pa Ta' },
    ]
  },
  {
    id: 'day-6',
    date: '14.12',
    location: 'צ’יאנג מאי',
    mapTerm: 'Doi Suthep',
    title: 'טבע וקדושה',
    vibe: 'גובה',
    type: LocationType.Temple,
    activities: [
      { time: '05:00', description: 'זריחה בדוי סוטפ (Doi Suthep) - חוויה רוחנית.', mapTerm: 'Wat Phra That Doi Suthep' },
      { time: '09:00', description: 'Wat Pha Lat (מקדש הג’ונגל) - מדיטציית הליכה ליד המפל.', mapTerm: 'Wat Pha Lat' },
      { time: 'צהריים', description: 'Cheeva Spa - פינוק לאנה יוקרתי (סאונת צמחים).', mapTerm: 'Cheeva Spa' },
    ]
  },
  {
    id: 'day-7',
    date: '15.12',
    location: 'סביבת העיר',
    mapTerm: 'Bua Tong Waterfalls',
    title: 'המפלים הדביקים',
    vibe: 'כיף',
    type: LocationType.Nature,
    activities: [
      { time: 'בוקר', description: 'נסיעה למפלים הדביקים (Bua Thong).', mapTerm: 'Bua Tong Waterfalls (Sticky Waterfalls)' },
      { time: 'צהריים', description: 'פיקניק וטיפוס על המפלים.' },
      { time: 'ערב', description: 'שוק Warorot לקניות אחרונות של תבלינים.', mapTerm: 'Warorot Market (Kad Luang)' },
    ]
  },
  {
    id: 'day-8',
    date: '16.12 - 17.12',
    location: 'צ’יאנג מאי',
    mapTerm: 'Chiang Mai',
    title: 'ימים פתוחים (סודות הצפון)',
    vibe: 'חופש',
    type: LocationType.City,
    activities: [
      { time: 'בוקר', description: 'Wat Umong (מקדש המנהרות) - "טראנס-זמן" ומדיטציה ביער.', mapTerm: 'Wat Umong Suan Phutthatham' },
      { time: 'צהריים', description: 'עיסוי מסורתי עתיק ופשוט ב-Wat Sri Koed.', mapTerm: 'Wat Si Koet' },
      { time: 'ערב', description: 'טקס Sadu (תודה/שחרור) במקדש לפני העזיבה.', mapTerm: 'Wat Phra Singh' },
    ]
  },
  // --- Islands ---
  {
    id: 'day-9',
    date: '18.12',
    location: 'טיסה -> קופנגן',
    mapTerm: 'Thong Sala Pier',
    title: 'ישר למים',
    vibe: 'מלח',
    type: LocationType.Island,
    activities: [
      { time: 'הגעה', description: 'נחיתה בסאמוי ומעבר מיידי למעבורת לקופנגן.', mapTerm: 'Samui International Airport' },
      { time: '11:00', description: 'מעבורת (Lomprayah) לקופנגן. מונית (200฿) לסריתנו.', mapTerm: 'Thong Sala Pier' },
      { time: '13:00', description: 'צ’ק-אין בסריתנו. מנוחה ראשונה בערסל.', mapTerm: 'Sri Thanu' },
      { time: 'שקיעה', description: 'Zen Beach - שקיעה ראשונה באי.', mapTerm: 'Zen Beach' },
    ]
  },
  {
    id: 'day-10',
    date: '19.12',
    location: 'קופנגן',
    mapTerm: 'Sri Thanu',
    title: 'התעוררות בגן עדן',
    vibe: 'בית',
    type: LocationType.Island,
    activities: [
      { time: 'בוקר', description: 'יקיצה טבעית, יוגה וטבילה בים.', mapTerm: 'Secret Beach Koh Phangan' },
      { time: 'צהריים', description: 'אוכל בריא ומנוחה.', mapTerm: 'Eat.Co Sri Thanu' },
      { time: 'ערב', description: 'המשך השגרה הרגועה.', mapTerm: 'Sri Thanu' },
    ]
  },
  // --- Phangan Block ---
  {
    id: 'phangan-stay',
    date: '20.12 - 4.1',
    location: 'קופנגן (סריתנו)',
    mapTerm: 'Sri Thanu',
    title: 'שגרת הריפוי',
    vibe: 'בית',
    type: LocationType.Island,
    activities: [
      { time: 'בוקר', description: 'יוגה ב-Orion/Pyramid, טבילה בוקר ב-Secret Beach.', mapTerm: 'Orion Healing Centre' },
      { time: 'צהריים', description: 'סדנאות ריפוי, מסאז’ לומי-לומי, אוכל טבעוני ב-Eat.Co.', mapTerm: 'Eat.Co Sri Thanu' },
      { time: 'ערב', description: 'סאונה ב-The Dome (אדים וקרח), מדיטציות ירח, שקט.', mapTerm: 'The Dome Sauna' },
    ],
    notes: ['לפירוט מלא: סאונה, טקסי ירח ומפלים - ראי את המדריך למטה']
  },
  {
    id: 'day-return',
    date: '5.1',
    location: 'קופנגן -> סאמוי -> בנגקוק',
    mapTerm: 'Suvarnabhumi Airport',
    title: 'פרידה מהאי',
    vibe: 'מעבר',
    type: LocationType.Travel,
    activities: [
      { time: '07:00', description: 'מונית למזח Thong Sala ומעבורת בוקר (Lomprayah) לסאמוי.', mapTerm: 'Thong Sala Pier' },
      { time: 'צהריים', description: 'טיסה מסאמוי לבנגקוק. מבט אחרון על שמורת Ang Thong.', mapTerm: 'Samui Airport' },
      { time: 'ערב', description: 'צ’ק-אין בבנגקוק ויציאה רכה לעיר (טרמינל 21 לאוכל).', mapTerm: 'Terminal 21 Asok' },
    ]
  },
  // --- Bangkok ---
  {
    id: 'day-end-1',
    date: '6.1',
    location: 'בנגקוק',
    mapTerm: 'Bangkok',
    title: 'יום אורבני אחרון',
    vibe: 'פינוק',
    type: LocationType.City,
    activities: [
      { time: 'יום', description: 'שופינג ב-ICON Siam או Siam Paragon.', mapTerm: 'ICONSIAM' },
      { time: 'ערב', description: 'שוק לילה (The One Ratchada) וארוחת סיכום.', mapTerm: 'The One Ratchada' },
      { time: 'לילה', description: 'יציאה לשדה התעופה (המראה ב-02:55).', mapTerm: 'Suvarnabhumi Airport' },
    ]
  },
  {
    id: 'day-end-2',
    date: '7.1',
    location: 'טיסה',
    mapTerm: 'Ben Gurion Airport',
    title: 'חוזרים הביתה',
    vibe: 'הודיה',
    type: LocationType.Travel,
    activities: [
      { time: '02:55', description: 'המראה מבנגקוק (EY401).' },
      { time: '10:45', description: 'נחיתה בבית (תל אביב).' },
    ]
  }
];
