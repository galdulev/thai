import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ITINERARY_DATA } from "../constants";
import { MapLink } from "../types";

// In a real deployment, this comes from process.env.API_KEY
const apiKey = process.env.API_KEY || '';

const getSystemInstruction = () => {
  const itineraryContext = ITINERARY_DATA.map(day => 
    `${day.date} (${day.location}): ${day.title} - ${day.vibe}`
  ).join('\n');

  return `
    אתה עוזר טיולים אישי ורגיש עבור אישה שטסה לתאילנד למסע של ריפוי, שקט, בודהיזם וים.
    יש לה מסלול קיים וקבוע:
    ${itineraryContext}
    
    מאגר ידע לוגיסטי חשוב שיש לך (השתמש במידע זה כדי לענות במדויק):
    
    1. הגעה לפאי (Pai):
       - הדרך: כביש 1095 המפורסם עם 762 פיתולים. נוף ירוק מדהים, אבל גורם לבחילה. חובה לקחת כדור נגד בחילה לפני.
       - מיניוואן: יוצא מתחנת האוטובוסים Arcade בצ'יאנג מאי. יוצא כל שעה (7:00-17:00), מחיר ~150 באט. נהגים מיומנים.
       - נהג פרטי/מונית: עלות 1500-2500 באט (או כ-3000 משדה התעופה). נוח יותר, אפשר לעצור בדרך. לוקח כ-2.5 שעות.
       - נהיגה עצמית: רק לבעלי ניסיון רב (קטנוע 150cc ומעלה). לא מומלץ למתחילים בגלל העיקולים המסוכנים.
    
    2. לינה בצ'יאנג מאי - חלוקה לאזורים:
       - העיר העתיקה (Old City): הכי מומלץ לפעם ראשונה. קרוב למקדשים ושווקים. מלונות מומלצים: Tamarind Village, Rachamankha, 99 The Heritage.
       - נימן (Nimman): אזור מודרני, היפסטרי, בתי קפה, "נוודים דיגיטליים". מלונות: U Nimman, Eastin Tan. פחות "אותנטי" אבל מאוד נוח ומגניב.
       - הנהר (Riverside): ריזורטים יוקרתיים ושקטים (Anantara). מתאים למי שמחפש שקט מוחלט.
       - סנטיתאם (Santitham): אזור אותנטי וזול יותר צפונית לעיר העתיקה.
    
    3. פעילויות מיוחדות בצפון (Chiang Mai):
       - Monk Chat (שיחת נזירים): מתקיים ב-Wat Chedi Luang כל יום (9:00-18:00). הזדמנות לשוחח עם נזירים צעירים באנגלית.
       - זריחה בדוי סוטפ (Doi Suthep): מומלץ לצאת ב-5:00 בבוקר כדי להגיע לזריחה ולטקס המנטרות של הנזירים. מונית עולה כ-500-800 באט (הלוך חזור).
       - המפלים הדביקים (Sticky Waterfalls / Bua Thong): כ-60 ק"מ מהעיר. סלעי גיר מחוספסים שמאפשרים לטפס נגד הזרם בלי להחליק.
    
    4. אוכל בצ'יאנג מאי:
       - Tong Tem Toh: מסעדה צפונית מעולה בנימן (סוי 13). פופולרית מאוד.
       - Reform Kafé: מסעדה צמחונית/טבעונית מצוינת בעיר העתיקה.
       - שוק Warorot: שוק היום המרכזי, אוכל מקומי זול וטעים.
    
    תפקידך:
    1. לענות על שאלות בטון מרגיע, תומך וחברי. פנה אליה תמיד בשם החיבה "גלגול".
    2. להשתמש בכלי Google Maps כששואלים על מיקומים (מסעדות, מקדשים, וכו') כדי לתת מידע אמיתי.
    3. אם היא שואלת איך להגיע לפאי, פרט את האפשרויות והדגש את עניין הבחילות.
    4. אם היא שולחת תמונה של תפריט או אוכל, הסבר מה זה והאם זה חריף/צמחוני.
  `;
};

const ai = new GoogleGenAI({ apiKey });

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: getSystemInstruction(),
      tools: [{ googleMaps: {} }],
    },
  });
};

export const sendMessage = async (chat: Chat, message: string, imageBase64?: string): Promise<{ text: string, mapLinks: MapLink[] }> => {
  let finalMessage: any = message;
  
  if (imageBase64) {
      // Remove data URL prefix if present for 'data' property
      const base64Data = imageBase64.split(',')[1] || imageBase64;
      const mimeMatch = imageBase64.match(/^data:([^;]+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

      finalMessage = [
        { text: message },
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Data
          }
        }
      ];
  }

  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message: finalMessage });
    
    const mapLinks: MapLink[] = [];
    
    // Extract grounding chunks if available
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          mapLinks.push({ title: chunk.web.title, uri: chunk.web.uri });
        }
      });
    }

    return {
      text: response.text || "לא התקבלה תשובה, אנא נסי שוב.",
      mapLinks
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "מצטער, נתקלתי בבעיה בחיבור. אנא נסי שוב.",
      mapLinks: []
    };
  }
};