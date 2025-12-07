export enum LocationType {
  City = 'CITY',
  Nature = 'NATURE',
  Island = 'ISLAND',
  Temple = 'TEMPLE',
  Travel = 'TRAVEL'
}

export interface Activity {
  time: string; // e.g., "Morning", "Evening", or specific time
  description: string;
  mapTerm?: string; // Search query for Google Maps
}

export interface DayPlan {
  id: string;
  date: string;
  location: string;
  mapTerm?: string; // Search query for the general location
  title: string;
  vibe: string;
  type: LocationType;
  hotel?: string;
  bookingRef?: string;
  activities: Activity[];
  notes?: string[];
}

export interface RoutineItem {
  period: string; // e.g., Morning, Noon, Evening
  activities: string[];
  icon: any; // Lucide icon component type
}

export interface MapLink {
  title: string;
  uri: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string; // Base64 image string
  mapLinks?: MapLink[]; // Google Maps grounding links
  isError?: boolean;
}